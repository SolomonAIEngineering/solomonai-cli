import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';
import type { StorageDocument } from './types';

export const searchCommand = new Command()
	.name('search')
	.description('Search for documents')
	.requiredOption('--query <text>', 'Search query')
	.option('--category <category>', 'Filter by category')
	.option('--tags <tags>', 'Filter by tags (comma-separated)')
	.option('--date-from <date>', 'Start date (YYYY-MM-DD)')
	.option('--date-to <date>', 'End date (YYYY-MM-DD)')
	.option('--limit <number>', 'Maximum results to return', '10')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const apiKey = await store.getValue('api-key');

			if (!apiKey) {
				throw new Error(
					'API key not configured. Run: solomonai-cli config set api-key <your-key>',
				);
			}

			// TODO: Implement actual API call
			const results: StorageDocument[] = [];

			logger.info('\nSearch Results:');
			logger.info('==============');
			logger.info(`Query: "${options.query}"`);
			if (options.category) logger.info(`Category: ${options.category}`);
			if (options.tags) logger.info(`Tags: ${options.tags}`);
			if (options.dateFrom || options.dateTo) {
				logger.info(
					`Date Range: ${options.dateFrom || 'any'} to ${
						options.dateTo || 'any'
					}`,
				);
			}

			if (results.length === 0) {
				logger.info('\nNo documents found');
				return;
			}

			results.forEach((doc) => {
				logger.info(`\n${doc.name}`);
				logger.info(`ID: ${doc.id}`);
				logger.info(`Path: ${doc.path}`);
				if (doc.category) logger.info(`Category: ${doc.category}`);
				if (doc.tags?.length) logger.info(`Tags: ${doc.tags.join(', ')}`);
				logger.info(`Last modified: ${doc.updatedAt.toLocaleString()}`);
			});
		} catch (error) {
			logger.error(`Search failed: ${error}`);
			process.exit(1);
		}
	});
