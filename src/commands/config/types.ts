export interface Profile {
	name: string;
	isActive: boolean;
	config: ConfigOptions;
}

export interface ConfigOptions {
	'api-key': string;
	'org-id': string;
	'tenant-id': string;
	'default-template': string;
	[key: string]: string; // Allow arbitrary string keys
}

export const CONFIG_KEYS = [
	'api-key',
	'org-id',
	'tenant-id',
	'default-template',
] as const;
export type ConfigKey = (typeof CONFIG_KEYS)[number];

export const CONFIG_DESCRIPTIONS = {
	'api-key': 'Your Solomon AI API key for authentication',
	'org-id': 'Your organization ID for team features',
	'tenant-id': 'Your tenant ID for multi-tenant features',
	'default-template': 'Default template to use for new projects',
} as const;

export const DEFAULT_PROFILE = 'default';
export const DEFAULT_CONFIG: ConfigOptions = {
	'api-key': '',
	'org-id': '',
	'tenant-id': '',
	'default-template': 'app',
};
