import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';
import type { StorageDocument } from './types';

export const infoCommand = new Command()
	.name('info')
	.description('View detailed document information')
	.requiredOption('--document-id <id>', 'Document ID to inspect')
	.option('--show-versions', 'Include version history')
	.option('--show-shares', 'Include share settings')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const apiKey = await store.getValue('api-key');

			if (!apiKey) {
				throw new Error(
					'API key not configured. Run: solomonai-cli config set api-key <your-key>',
				);
			}

			// TODO: Implement actual API call to get document info
			const doc: StorageDocument = {
				id: options.documentId,
				name: 'example.pdf',
				path: '/documents/example.pdf',
				size: 1024,
				version: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
				isEncrypted: false,
			};

			logger.info('\nDocument Information:');
			logger.info('====================');
			logger.info(`ID: ${doc.id}`);
			logger.info(`Name: ${doc.name}`);
			logger.info(`Path: ${doc.path}`);
			logger.info(`Size: ${doc.size} bytes`);
			logger.info(`Version: ${doc.version}`);
			logger.info(`Created: ${doc.createdAt.toLocaleString()}`);
			logger.info(`Updated: ${doc.updatedAt.toLocaleString()}`);
			logger.info(`Encrypted: ${doc.isEncrypted ? 'Yes' : 'No'}`);

			if (doc.category) logger.info(`Category: ${doc.category}`);
			if (doc.tags?.length) logger.info(`Tags: ${doc.tags.join(', ')}`);
			if (doc.metadata) {
				logger.info('\nMetadata:');
				Object.entries(doc.metadata).forEach(([key, value]) => {
					logger.info(`  ${key}: ${value}`);
				});
			}
		} catch (error) {
			logger.error(`Failed to get document info: ${error}`);
			process.exit(1);
		}
	});
