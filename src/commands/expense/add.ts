import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';
import type { Expense } from './types';

export const addCommand = new Command()
	.name('add')
	.description('Add a new expense')
	.requiredOption('--amount <number>', 'Expense amount')
	.requiredOption('--category <category>', 'Expense category')
	.requiredOption('--description <text>', 'Expense description')
	.option('--currency <code>', 'Currency code', 'USD')
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
			const expense: Expense = {
				id: Math.random().toString(36).substring(7),
				amount: parseFloat(options.amount),
				currency: options.currency,
				category: options.category,
				description: options.description,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			logger.info('\nExpense Added:');
			logger.info('=============');
			logger.info(`ID: ${expense.id}`);
			logger.info(
				`Amount: ${expense.currency} ${expense.amount.toLocaleString()}`,
			);
			logger.info(`Category: ${expense.category}`);
			logger.info(`Description: ${expense.description}`);
			logger.info(`Date: ${expense.createdAt.toLocaleString()}`);

			logger.succeed('Expense recorded successfully');
		} catch (error) {
			logger.error(`Failed to add expense: ${error}`);
			process.exit(1);
		}
	});
