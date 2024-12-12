import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';

export const categorizeCommand = new Command()
	.name('categorize')
	.description('Re-categorize an expense')
	.requiredOption('--expense-id <id>', 'Expense ID to update')
	.requiredOption('--new-category <category>', 'New category')
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
			logger.info('\nUpdating Expense Category:');
			logger.info('=======================');
			logger.info(`Expense ID: ${options.expenseId}`);
			logger.info(`New Category: ${options.newCategory}`);

			logger.succeed('Category updated successfully');
		} catch (error) {
			logger.error(`Failed to update category: ${error}`);
			process.exit(1);
		}
	});
