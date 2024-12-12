import { Command } from 'commander';
import { logger } from '../../utils/logger';

export const listCommand = new Command()
	.name('list')
	.description('List all invoices with filters')
	.option('--status <status>', 'Filter by status (paid/unpaid/overdue)')
	.option('--client <name>', 'Filter by client name or ID')
	.option(
		'--date-range <range>',
		'Date range (e.g., "last-30-days", "2023-01..2023-12")',
	)
	.action(async (options) => {
		try {
			// TODO: Implement invoice listing logic
			logger.info('Fetching invoices...');
			logger.info('Filters:', {
				status: options.status,
				client: options.client,
				dateRange: options.dateRange,
			});
		} catch (error) {
			logger.error(`Failed to list invoices: ${error}`);
			process.exit(1);
		}
	});
