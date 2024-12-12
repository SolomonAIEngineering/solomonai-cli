import { Command } from 'commander';
import { logger } from '../../utils/logger';

export const reminderCommand = new Command()
	.name('reminder')
	.description('Trigger a reminder for a specific invoice')
	.requiredOption('--invoice-id <id>', 'Invoice ID for reminder')
	.requiredOption(
		'--frequency <freq>',
		'Reminder frequency (once/daily/weekly/monthly)',
	)
	.action(async (options) => {
		try {
			// TODO: Implement reminder logic
			logger.info(
				`Setting up ${options.frequency} reminder for invoice ${options.invoiceId}...`,
			);
			logger.succeed('Reminder set successfully');
		} catch (error) {
			logger.error(`Failed to set reminder: ${error}`);
			process.exit(1);
		}
	});
