export interface StorageDocument {
	id: string;
	name: string;
	path: string;
	size: number;
	category?: string;
	tags?: string[];
	metadata?: Record<string, string>;
	version: number;
	createdAt: Date;
	updatedAt: Date;
	isEncrypted: boolean;
}

export interface ShareSettings {
	email: string;
	permissions: 'view' | 'edit' | 'admin';
	expiresAt?: Date;
}

export interface VersionInfo {
	version: number;
	note?: string;
	createdAt: Date;
	size: number;
}
