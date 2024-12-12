import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';
import type { Expense } from './types';

export const listCommand = new Command()
	.name('list')
	.description('List expenses with filters')
	.option('--category <category>', 'Filter by category')
	.option('--time-period <period>', 'Time period to analyze', 'this-month')
	.option('--amount-range <range>', 'Amount range (min:max)')
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
			const expenses: Expense[] = [];

			logger.info('\nExpense List:');
			logger.info('============');
			logger.info(`Time Period: ${options.timePeriod}`);
			if (options.category) logger.info(`Category: ${options.category}`);
			if (options.amountRange)
				logger.info(`Amount Range: ${options.amountRange}`);

			if (expenses.length === 0) {
				logger.info('\nNo expenses found');
				return;
			}

			let total = 0;
			expenses.forEach((expense) => {
				logger.info('\n---');
				logger.info(`ID: ${expense.id}`);
				logger.info(
					`Amount: ${expense.currency} ${expense.amount.toLocaleString()}`,
				);
				logger.info(`Category: ${expense.category}`);
				logger.info(`Description: ${expense.description}`);
				logger.info(`Date: ${expense.createdAt.toLocaleString()}`);
				total += expense.amount;
			});

			logger.info('\nSummary:');
			logger.info(
				`Total Expenses: ${
					expenses[0]?.currency || 'USD'
				} ${total.toLocaleString()}`,
			);
			logger.info(`Number of Expenses: ${expenses.length}`);
		} catch (error) {
			logger.error(`Failed to list expenses: ${error}`);
			process.exit(1);
		}
	});
