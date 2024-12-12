import { mkdir, readFile, writeFile } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';
import {
	ConfigOptions,
	DEFAULT_CONFIG,
	DEFAULT_PROFILE,
	Profile,
} from './types';

export class ConfigStore {
	private static instance: ConfigStore;
	private configPath: string;
	private profiles: Profile[] = [];

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

	private async init() {
		try {
			await mkdir(join(homedir(), '.solomon'), { recursive: true });
			await this.load();
		} catch (error) {
			// If file doesn't exist, create default profile
			this.profiles = [
				{
					name: DEFAULT_PROFILE,
					isActive: true,
					config: { ...DEFAULT_CONFIG },
				},
			];
			await this.save();
		}
	}

	private async load() {
		const data = await readFile(this.configPath, 'utf-8');
		this.profiles = JSON.parse(data);
	}

	private async save() {
		await writeFile(this.configPath, JSON.stringify(this.profiles, null, 2));
	}

	async getActiveProfile(): Promise<Profile> {
		const active = this.profiles.find((p) => p.isActive);
		if (!active) {
			throw new Error('No active profile found');
		}
		return active;
	}

	async getValue(key: string): Promise<string> {
		const active = await this.getActiveProfile();
		return active.config[key] || '';
	}

	async setValue(key: string, value: string): Promise<void> {
		const active = await this.getActiveProfile();
		active.config[key] = value;
		await this.save();
	}

	async createProfile(name: string): Promise<void> {
		if (this.profiles.some((p) => p.name === name)) {
			throw new Error(`Profile ${name} already exists`);
		}
		this.profiles.push({
			name,
			isActive: false,
			config: { ...DEFAULT_CONFIG },
		});
		await this.save();
	}

	async setActiveProfile(name: string): Promise<void> {
		const profile = this.profiles.find((p) => p.name === name);
		if (!profile) {
			throw new Error(`Profile ${name} not found`);
		}
		this.profiles.forEach((p) => (p.isActive = false));
		profile.isActive = true;
		await this.save();
	}

	async listProfiles(): Promise<Profile[]> {
		return this.profiles;
	}

	async deleteProfile(name: string): Promise<void> {
		const index = this.profiles.findIndex((p) => p.name === name);
		if (index === -1) {
			throw new Error(`Profile ${name} not found`);
		}
		if (this.profiles[index].isActive) {
			await this.setActiveProfile(DEFAULT_PROFILE);
		}
		this.profiles.splice(index, 1);
		await this.save();
	}

	async reset(): Promise<void> {
		const active = await this.getActiveProfile();
		active.config = { ...DEFAULT_CONFIG };
		await this.save();
	}

	async importProfiles(profiles: Profile[]): Promise<void> {
		this.profiles = profiles;
		await this.save();
	}
}
