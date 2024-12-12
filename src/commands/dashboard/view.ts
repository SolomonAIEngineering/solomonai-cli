import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';

type Metric = 'revenue' | 'expenses' | 'cash-flow' | 'all';

interface FinancialMetrics {
	revenue: {
		current: number;
		previous: number;
		trend: number;
	};
	expenses: {
		current: number;
		previous: number;
		trend: number;
	};
	cashFlow: {
		current: number;
		previous: number;
		trend: number;
	};
}

export const viewCommand = new Command()
	.name('view')
	.description('Display real-time financial dashboard')
	.option(
		'--metrics <type>',
		'Metrics to display (revenue/expenses/cash-flow/all)',
		'all',
	)
	.option('--time-period <period>', 'Time period to analyze', 'this-month')
	.option('--refresh <seconds>', 'Auto-refresh interval in seconds')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const apiKey = await store.getValue('api-key');

			if (!apiKey) {
				throw new Error(
					'API key not configured. Run: solomonai-cli config set api-key <your-key>',
				);
			}

			const displayMetrics = async () => {
				// TODO: Implement actual API call
				const metrics: FinancialMetrics = {
					revenue: {
						current: 150000,
						previous: 120000,
						trend: 25,
					},
					expenses: {
						current: 80000,
						previous: 75000,
						trend: 6.67,
					},
					cashFlow: {
						current: 70000,
						previous: 45000,
						trend: 55.56,
					},
				};

				logger.info('\nFinancial Dashboard');
				logger.info('==================');
				logger.info(`Time Period: ${options.timePeriod}`);

				if (options.metrics === 'all' || options.metrics === 'revenue') {
					logger.info('\nRevenue:');
					logger.info(`Current: $${metrics.revenue.current.toLocaleString()}`);
					logger.info(
						`Previous: $${metrics.revenue.previous.toLocaleString()}`,
					);
					logger.info(`Trend: ${metrics.revenue.trend}%`);
				}

				if (options.metrics === 'all' || options.metrics === 'expenses') {
					logger.info('\nExpenses:');
					logger.info(`Current: $${metrics.expenses.current.toLocaleString()}`);
					logger.info(
						`Previous: $${metrics.expenses.previous.toLocaleString()}`,
					);
					logger.info(`Trend: ${metrics.expenses.trend}%`);
				}

				if (options.metrics === 'all' || options.metrics === 'cash-flow') {
					logger.info('\nCash Flow:');
					logger.info(`Current: $${metrics.cashFlow.current.toLocaleString()}`);
					logger.info(
						`Previous: $${metrics.cashFlow.previous.toLocaleString()}`,
					);
					logger.info(`Trend: ${metrics.cashFlow.trend}%`);
				}
			};

			if (options.refresh) {
				const interval = parseInt(options.refresh, 10) * 1000;
				logger.info(`Auto-refreshing every ${options.refresh} seconds...`);
				const running = true;
				while (running) {
					await displayMetrics();
					await new Promise((resolve) => setTimeout(resolve, interval));
					console.clear();
				}
			} else {
				await displayMetrics();
			}
		} catch (error) {
			logger.error(`Failed to display dashboard: ${error}`);
			process.exit(1);
		}
	});
