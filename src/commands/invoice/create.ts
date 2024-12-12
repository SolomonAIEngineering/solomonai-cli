import { Command } from 'commander';
import { logger } from '../../utils/logger';

export const createCommand = new Command()
	.name('create')
	.description('Create a new invoice')
	.requiredOption('--client <name>', 'Client name or ID')
	.requiredOption('--amount <number>', 'Invoice amount')
	.option('--currency <code>', 'Currency code', 'USD')
	.option('--due-date <date>', 'Due date (YYYY-MM-DD)')
	.option('--template-id <id>', 'Invoice template ID')
	.option(
		'--recurring <interval>',
		'Recurring interval (weekly/monthly/yearly)',
	)
	.action(async (options) => {
		try {
			// TODO: Implement invoice creation logic
			logger.info('Creating invoice...');
			logger.succeed(
				`Created invoice for ${options.client} for ${options.currency} ${options.amount}`,
			);
		} catch (error) {
			logger.error(`Failed to create invoice: ${error}`);
			process.exit(1);
		}
	});
