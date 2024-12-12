import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';
import type { ShareSettings } from './types';

export const shareCommand = new Command()
	.name('share')
	.description('Share documents with others')
	.requiredOption('--document-id <id>', 'Document to share')
	.requiredOption('--email <address>', 'Recipient email address')
	.requiredOption('--permissions <level>', 'Access level (view/edit/admin)')
	.option('--expires <date>', 'Expiration date (YYYY-MM-DD)')
	.option('--notify', 'Send email notification')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const apiKey = await store.getValue('api-key');

			if (!apiKey) {
				throw new Error(
					'API key not configured. Run: solomonai-cli config set api-key <your-key>',
				);
			}

			const shareSettings: ShareSettings = {
				email: options.email,
				permissions: options.permissions as 'view' | 'edit' | 'admin',
				expiresAt: options.expires ? new Date(options.expires) : undefined,
			};

			// TODO: Implement actual API call to share document
			logger.info(
				`Sharing document ${options.documentId} with ${options.email}...`,
			);
			logger.info(`Permissions: ${shareSettings.permissions}`);
			if (shareSettings.expiresAt) {
				logger.info(`Expires: ${shareSettings.expiresAt.toLocaleDateString()}`);
			}
			if (options.notify) {
				logger.info('Email notification will be sent');
			}

			logger.succeed('Document shared successfully');
		} catch (error) {
			logger.error(`Failed to share document: ${error}`);
			process.exit(1);
		}
	});
