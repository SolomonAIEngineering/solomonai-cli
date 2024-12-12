export interface Profile {
	name: string;
	isActive: boolean;
	config: ConfigOptions;
	environment?: string;
	locked?: boolean;
	lastModified?: Date;
}

export interface ConfigOptions {
	'api-key': string;
	'org-id': string;
	'tenant-id': string;
	'default-template': string;
	environment: string;
	'vault-type'?: 'aws-secrets' | 'azure-keyvault' | 'hashicorp';
	'vault-url'?: string;
	'schema-path'?: string;
	[key: string]: string | undefined;
}

export interface Environment {
	name: string;
	profiles: string[];
	isActive?: boolean;
}

export const CONFIG_KEYS = [
	'api-key',
	'org-id',
	'tenant-id',
	'default-template',
	'environment',
	'vault-type',
	'vault-url',
	'schema-path',
] as const;
export type ConfigKey = (typeof CONFIG_KEYS)[number];

export const CONFIG_DESCRIPTIONS = {
	'api-key': 'Your Solomon AI API key for authentication',
	'org-id': 'Your organization ID for team features',
	'tenant-id': 'Your tenant ID for multi-tenant features',
	'default-template': 'Default template to use for new projects',
	environment: 'Current environment (dev/staging/prod)',
	'vault-type': 'Type of secrets vault to use',
	'vault-url': 'URL of the secrets vault',
	'schema-path': 'Path to JSON schema file for validation',
} as const;

export const DEFAULT_PROFILE = 'default';
export const DEFAULT_CONFIG: ConfigOptions = {
	'api-key': '',
	'org-id': '',
	'tenant-id': '',
	'default-template': 'app',
	environment: '',
};

export interface SecretOptions {
	encrypted: boolean;
	store: 'local' | 'vault' | 'aws-secrets' | 'azure-keyvault';
}

export interface AuditEntry {
	timestamp: Date;
	action: string;
	key?: string;
	value?: string;
	profile?: string;
	user?: string;
}
