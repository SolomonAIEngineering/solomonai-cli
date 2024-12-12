import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';
import type { Budget } from './types';

export const adjustCommand = new Command()
	.name('adjust')
	.description('Adjust an existing budget')
	.requiredOption('--budget-id <id>', 'Budget ID to adjust')
	.requiredOption('--new-amount <number>', 'New budget amount')
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
			const budget: Budget = {
				id: options.budgetId,
				amount: parseFloat(options.newAmount),
				category: 'marketing',
				timePeriod: 'Q2-2024',
				spent: 2000,
				remaining: parseFloat(options.newAmount) - 2000,
				status: 'active',
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			logger.info('\nBudget Adjusted:');
			logger.info('===============');
			logger.info(`ID: ${budget.id}`);
			logger.info(`New Amount: $${budget.amount.toLocaleString()}`);
			logger.info(`Spent: $${budget.spent.toLocaleString()}`);
			logger.info(`Remaining: $${budget.remaining.toLocaleString()}`);
			logger.info(`Status: ${budget.status}`);

			logger.succeed('Budget adjusted successfully');
		} catch (error) {
			logger.error(`Failed to adjust budget: ${error}`);
			process.exit(1);
		}
	});
