import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';
import type { ForecastResult } from './types';

export const forecastCommand = new Command()
	.name('forecast')
	.description('Generate financial forecasts')
	.requiredOption('--time-period <period>', 'Forecast time period')
	.requiredOption(
		'--variables <items>',
		'Forecast variables (key:value pairs, comma-separated)',
	)
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const apiKey = await store.getValue('api-key');

			if (!apiKey) {
				throw new Error(
					'API key not configured. Run: solomonai-cli config set api-key <your-key>',
				);
			}

			const variables = options.variables
				.split(',')
				.reduce((acc: Record<string, number>, item: string) => {
					const [key, value] = item.split(':');
					return { ...acc, [key.trim()]: parseFloat(value.trim()) };
				}, {});

			// TODO: Implement actual API call
			const forecast: ForecastResult = {
				timePeriod: options.timePeriod,
				revenue: {
					projected: 500000,
					bestCase: 600000,
					worstCase: 400000,
				},
				expenses: {
					projected: 300000,
					bestCase: 280000,
					worstCase: 350000,
				},
				profitMargin: {
					projected: 40,
					bestCase: 53.3,
					worstCase: 12.5,
				},
				variables,
			};

			logger.info('\nForecast Results:');
			logger.info('================');
			logger.info(`Time Period: ${forecast.timePeriod}`);

			logger.info('\nRevenue:');
			logger.info(`Projected: $${forecast.revenue.projected.toLocaleString()}`);
			logger.info(`Best Case: $${forecast.revenue.bestCase.toLocaleString()}`);
			logger.info(
				`Worst Case: $${forecast.revenue.worstCase.toLocaleString()}`,
			);

			logger.info('\nExpenses:');
			logger.info(
				`Projected: $${forecast.expenses.projected.toLocaleString()}`,
			);
			logger.info(`Best Case: $${forecast.expenses.bestCase.toLocaleString()}`);
			logger.info(
				`Worst Case: $${forecast.expenses.worstCase.toLocaleString()}`,
			);

			logger.info('\nProfit Margin:');
			logger.info(`Projected: ${forecast.profitMargin.projected}%`);
			logger.info(`Best Case: ${forecast.profitMargin.bestCase}%`);
			logger.info(`Worst Case: ${forecast.profitMargin.worstCase}%`);

			logger.info('\nVariables Used:');
			Object.entries(forecast.variables).forEach(([key, value]) => {
				logger.info(`${key}: ${value}%`);
			});
		} catch (error) {
			logger.error(`Failed to generate forecast: ${error}`);
			process.exit(1);
		}
	});
