import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';
import type { StorageDocument } from './types';

export const listCommand = new Command()
	.name('list')
	.description('List documents and directories')
	.option('--directory <dir>', 'Target directory')
	.option('--category <category>', 'Filter by category')
	.option('--tags <tags>', 'Filter by tags (comma-separated)')
	.option('--date-range <range>', 'Filter by date (YYYY-MM-DD..YYYY-MM-DD)')
	.option('--recursive', 'Include subdirectories')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const apiKey = await store.getValue('api-key');

			if (!apiKey) {
				throw new Error(
					'API key not configured. Run: solomonai-cli config set api-key <your-key>',
				);
			}

			// TODO: Implement actual API call to list documents
			const documents: StorageDocument[] = []; // Fetch from API

			logger.info('\nDocuments:');
			logger.info('==========');

			if (documents.length === 0) {
				logger.info('No documents found');
				return;
			}

			documents.forEach((doc) => {
				logger.info(`\n${doc.name}`);
				logger.info(`ID: ${doc.id}`);
				logger.info(`Path: ${doc.path}`);
				logger.info(`Size: ${doc.size} bytes`);
				if (doc.category) logger.info(`Category: ${doc.category}`);
				if (doc.tags?.length) logger.info(`Tags: ${doc.tags.join(', ')}`);
				logger.info(`Last modified: ${doc.updatedAt.toLocaleString()}`);
			});
		} catch (error) {
			logger.error(`Failed to list documents: ${error}`);
			process.exit(1);
		}
	});
