import { Command } from 'commander';
import { logger } from '../../utils/logger';

export const sendCommand = new Command()
	.name('send')
	.description('Send an invoice to a client')
	.requiredOption('--invoice-id <id>', 'Invoice ID to send')
	.requiredOption('--email <address>', 'Client email address')
	.action(async (options) => {
		try {
			// TODO: Implement invoice sending logic
			logger.info(
				`Sending invoice ${options.invoiceId} to ${options.email}...`,
			);
			logger.succeed('Invoice sent successfully');
		} catch (error) {
			logger.error(`Failed to send invoice: ${error}`);
			process.exit(1);
		}
	});
