import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const KEY =
	process.env.ENCRYPTION_KEY || 'default-encryption-key-change-in-production';

export async function encrypt(text: string): Promise<string> {
	try {
		const iv = randomBytes(IV_LENGTH);
		const key = Buffer.from(KEY, 'utf-8');

		const cipher = createCipheriv(ALGORITHM, key, iv);
		let encrypted = cipher.update(text, 'utf8', 'hex');
		encrypted += cipher.final('hex');

		const authTag = cipher.getAuthTag();

		// Return IV:AuthTag:EncryptedData format
		return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
	} catch (error) {
		throw new Error(`Encryption failed: ${error}`);
	}
}

export async function decrypt(encryptedText: string): Promise<string> {
	try {
		const [ivHex, authTagHex, encryptedData] = encryptedText.split(':');

		const iv = Buffer.from(ivHex, 'hex');
		const authTag = Buffer.from(authTagHex, 'hex');
		const key = Buffer.from(KEY, 'utf-8');

		const decipher = createDecipheriv(ALGORITHM, key, iv);
		decipher.setAuthTag(authTag);

		let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
		decrypted += decipher.final('utf8');

		return decrypted;
	} catch (error) {
		throw new Error(`Decryption failed: ${error}`);
	}
}
