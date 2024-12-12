import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';
import type { Budget } from './types';

export const createCommand = new Command()
	.name('create')
	.description('Create a new budget')
	.requiredOption('--amount <number>', 'Budget amount')
	.requiredOption('--category <category>', 'Budget category')
	.requiredOption('--time-period <period>', 'Budget time period')
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
				id: Math.random().toString(36).substring(7),
				amount: parseFloat(options.amount),
				category: options.category,
				timePeriod: options.timePeriod,
				spent: 0,
				remaining: parseFloat(options.amount),
				status: 'active',
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			logger.info('\nBudget Created:');
			logger.info('==============');
			logger.info(`ID: ${budget.id}`);
			logger.info(`Amount: $${budget.amount.toLocaleString()}`);
			logger.info(`Category: ${budget.category}`);
			logger.info(`Time Period: ${budget.timePeriod}`);
			logger.info(`Status: ${budget.status}`);

			logger.succeed('Budget created successfully');
		} catch (error) {
			logger.error(`Failed to create budget: ${error}`);
			process.exit(1);
		}
	});
