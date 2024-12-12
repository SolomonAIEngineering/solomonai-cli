import { mkdir, readFile, writeFile } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';
import { encrypt } from 'utils/encryption.ts';
import { validateSchema } from 'utils/schema.ts';
import { logger } from '../../utils/logger';
import {
	AuditEntry,
	DEFAULT_CONFIG,
	DEFAULT_PROFILE,
	Environment,
	Profile,
	SecretOptions,
} from './types';

export class ConfigStore {
	private static instance: ConfigStore;
	private configPath: string;
	private profiles: Profile[] = [];
	private environments: Environment[] = [];
	private auditLog: AuditEntry[] = [];

	private constructor() {
		this.configPath = join(homedir(), '.solomon', 'config.json');
	}

	static async getInstance(): Promise<ConfigStore> {
		if (!ConfigStore.instance) {
			ConfigStore.instance = new ConfigStore();
			await ConfigStore.instance.init();
		}
		return ConfigStore.instance;
	}

	// Initialization and File Operations
	private async init() {
		try {
			await mkdir(join(homedir(), '.solomon'), { recursive: true });
			await this.load();
		} catch (error) {
			await this.initializeDefaults();
		}
	}

	private async initializeDefaults() {
		this.profiles = [
			{
				name: DEFAULT_PROFILE,
				isActive: true,
				config: { ...DEFAULT_CONFIG },
				lastModified: new Date(),
			},
		];
		this.environments = [
			{
				name: 'default',
				profiles: [DEFAULT_PROFILE],
				isActive: true,
			},
		];
		await this.save();
	}

	private async load() {
		try {
			const data = await readFile(this.configPath, 'utf-8');
			const parsed = JSON.parse(data);

			this.profiles = parsed.profiles || [];
			this.environments = parsed.environments || [];
			this.auditLog = (parsed.auditLog || []).map((entry: AuditEntry) => ({
				...entry,
				timestamp: new Date(entry.timestamp),
			}));

			await this.ensureDefaults();
		} catch (error) {
			throw new Error(`Failed to load configuration: ${error}`);
		}
	}

	private async ensureDefaults() {
		let needsSave = false;

		if (!this.profiles.some((p) => p.name === DEFAULT_PROFILE)) {
			this.profiles.push({
				name: DEFAULT_PROFILE,
				isActive: true,
				config: { ...DEFAULT_CONFIG },
				lastModified: new Date(),
			});
			needsSave = true;
		}

		if (!this.environments.some((e) => e.name === 'default')) {
			this.environments.push({
				name: 'default',
				profiles: [DEFAULT_PROFILE],
				isActive: true,
			});
			needsSave = true;
		}

		if (needsSave) {
			await this.save();
		}
	}

	private async save() {
		try {
			const data = {
				profiles: this.profiles,
				environments: this.environments,
				auditLog: this.auditLog,
			};
			await writeFile(this.configPath, JSON.stringify(data, null, 2));
		} catch (error) {
			throw new Error(`Failed to save configuration: ${error}`);
		}
	}

	// Profile Management
	async getActiveProfile(): Promise<Profile> {
		const active = this.profiles.find((p) => p.isActive);
		if (!active) {
			throw new Error('No active profile found');
		}
		return active;
	}

	async createProfile(name: string): Promise<void> {
		if (this.profiles.some((p) => p.name === name)) {
			throw new Error(`Profile ${name} already exists`);
		}

		const newProfile: Profile = {
			name,
			isActive: false,
			config: { ...DEFAULT_CONFIG },
			lastModified: new Date(),
		};

		this.profiles.push(newProfile);
		await this.save();
		await this.addAuditEntry('create_profile', name);
	}

	async setActiveProfile(name: string): Promise<void> {
		const profile = this.profiles.find((p) => p.name === name);
		if (!profile) {
			throw new Error(`Profile ${name} not found`);
		}

		this.profiles.forEach((p) => (p.isActive = false));
		profile.isActive = true;
		profile.lastModified = new Date();

		await this.save();
		await this.addAuditEntry('set_active_profile', name);
	}

	async listProfiles(): Promise<Profile[]> {
		return this.profiles;
	}

	async deleteProfile(name: string): Promise<void> {
		if (name === DEFAULT_PROFILE) {
			throw new Error('Cannot delete default profile');
		}

		const index = this.profiles.findIndex((p) => p.name === name);
		if (index === -1) {
			throw new Error(`Profile ${name} not found`);
		}

		if (this.profiles[index].isActive) {
			await this.setActiveProfile(DEFAULT_PROFILE);
		}

		// Remove profile from any environments
		this.environments.forEach((env) => {
			const profileIndex = env.profiles.indexOf(name);
			if (profileIndex !== -1) {
				env.profiles.splice(profileIndex, 1);
			}
		});

		this.profiles.splice(index, 1);
		await this.save();
		await this.addAuditEntry('delete_profile', name);
	}

	// Configuration Management
	async getValue(key: string): Promise<string> {
		const active = await this.getActiveProfile();
		const value = active.config[key];
		return value || '';
	}

	async setValue(key: string, value: string): Promise<void> {
		const active = await this.getActiveProfile();
		active.config[key] = value;
		active.lastModified = new Date();
		await this.save();
		await this.addAuditEntry('set_value', key, value);
	}

	async reset(): Promise<void> {
		const active = await this.getActiveProfile();
		active.config = { ...DEFAULT_CONFIG };
		active.lastModified = new Date();
		await this.save();
		await this.addAuditEntry('reset_config');
	}

	// Environment Management
	async listEnvironments(): Promise<Environment[]> {
		return this.environments;
	}

	async createEnvironment(name: string, profileName?: string): Promise<void> {
		if (this.environments.some((e) => e.name === name)) {
			throw new Error(`Environment ${name} already exists`);
		}

		if (profileName && !this.profiles.some((p) => p.name === profileName)) {
			throw new Error(`Profile ${profileName} not found`);
		}

		const env: Environment = {
			name,
			profiles: profileName ? [profileName] : [],
			isActive: false,
		};

		this.environments.push(env);
		await this.save();
		await this.addAuditEntry('create_environment', name);
	}

	async setEnvironment(name: string): Promise<void> {
		const env = this.environments.find((e) => e.name === name);
		if (!env) {
			throw new Error(`Environment ${name} not found`);
		}

		this.environments.forEach((e) => (e.isActive = false));
		env.isActive = true;

		if (env.profiles.length > 0) {
			await this.setActiveProfile(env.profiles[0]);
		}

		await this.save();
		await this.addAuditEntry('set_environment', name);
	}

	async linkProfileToEnvironment(
		envName: string,
		profileName: string,
	): Promise<void> {
		const env = this.environments.find((e) => e.name === envName);
		if (!env) {
			throw new Error(`Environment ${envName} not found`);
		}

		const profile = this.profiles.find((p) => p.name === profileName);
		if (!profile) {
			throw new Error(`Profile ${profileName} not found`);
		}

		if (!env.profiles.includes(profileName)) {
			env.profiles.push(profileName);
			profile.environment = envName;
			await this.save();
			await this.addAuditEntry('link_profile', profileName, envName);
		}
	}

	async unlinkProfileFromEnvironment(
		envName: string,
		profileName: string,
	): Promise<void> {
		const env = this.environments.find((e) => e.name === envName);
		if (!env) {
			throw new Error(`Environment ${envName} not found`);
		}

		const profileIndex = env.profiles.indexOf(profileName);
		if (profileIndex === -1) {
			throw new Error(
				`Profile ${profileName} not linked to environment ${envName}`,
			);
		}

		env.profiles.splice(profileIndex, 1);

		const profile = this.profiles.find((p) => p.name === profileName);
		if (profile && profile.environment === envName) {
			profile.environment = undefined;
		}

		await this.save();
		await this.addAuditEntry('unlink_profile', profileName, envName);
	}

	// Secret Management
	async setSecret(
		key: string,
		value: string,
		options: SecretOptions,
	): Promise<void> {
		const profile = await this.getActiveProfile();

		let storedValue = value;
		if (options.encrypted) {
			storedValue = await encrypt(value);
		}

		if (options.store !== 'local') {
			logger.info(`Storing secret in ${options.store}`);
			// TODO: Implement external secret storage integration
		}

		profile.config[key] = storedValue;
		profile.lastModified = new Date();
		await this.save();
		await this.addAuditEntry('set_secret', key);
	}

	// Audit Management
	private async addAuditEntry(
		action: string,
		key?: string,
		value?: string,
	): Promise<void> {
		const entry: AuditEntry = {
			timestamp: new Date(),
			action,
			key,
			value,
			profile: (await this.getActiveProfile()).name,
		};

		this.auditLog.push(entry);
		await this.save();
	}

	async getAuditLog(options?: {
		profile?: string;
		timePeriod?: string;
		action?: string;
	}): Promise<AuditEntry[]> {
		let filteredLog = [...this.auditLog];

		if (options?.profile) {
			filteredLog = filteredLog.filter(
				(entry) => entry.profile === options.profile,
			);
		}

		if (options?.action) {
			filteredLog = filteredLog.filter(
				(entry) => entry.action === options.action,
			);
		}

		if (options?.timePeriod) {
			const [start, end] = options.timePeriod
				.split(':')
				.map((d) => new Date(d));
			filteredLog = filteredLog.filter(
				(entry) => entry.timestamp >= start && entry.timestamp <= end,
			);
		}

		return filteredLog;
	}

	// Schema Validation
	async validateConfig(schemaPath?: string): Promise<boolean> {
		const profile = await this.getActiveProfile();
		return validateSchema(
			profile.config,
			schemaPath || profile.config['schema-path'],
		);
	}

	// Import/Export
	async importProfiles(profiles: Profile[]): Promise<void> {
		// Validate profiles before importing
		if (!Array.isArray(profiles)) {
			throw new Error('Invalid profiles data');
		}

		profiles.forEach((profile) => {
			if (!profile.name || typeof profile.config !== 'object') {
				throw new Error('Invalid profile structure');
			}
		});

		this.profiles = profiles;
		await this.save();
		await this.addAuditEntry('import_profiles');
	}
}
