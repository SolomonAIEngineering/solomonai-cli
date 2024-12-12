import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';

interface Alert {
	id: string;
	metric: string;
	threshold: number;
	action: string;
	recipient: string;
	frequency: string;
	muteUntil?: Date;
}

export const alertCommand = new Command()
	.name('alert')
	.description('Configure cash flow alerts')
	.requiredOption('--threshold <value>', 'Numeric/percentage threshold')
	.requiredOption('--metric <type>', 'Monitored metric')
	.requiredOption('--action <type>', 'Alert action')
	.requiredOption('--recipient <address>', 'Alert destination')
	.option('--frequency <interval>', 'Check frequency', 'daily')
	.option('--mute-until <date>', 'Temporary mute period')
	.addCommand(
		new Command()
			.name('list')
			.description('List all alerts')
			.action(async () => {
				try {
					logger.info('Configured alerts:');
					// TODO: Implement alert listing
				} catch (error) {
					logger.error(`Failed to list alerts: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('remove')
			.description('Remove an alert')
			.requiredOption('--alert-id <id>', 'Alert ID to remove')
			.action(async (options) => {
				try {
					logger.info(`Removing alert ${options.alertId}`);
					// TODO: Implement alert removal
					logger.succeed('Alert removed successfully');
				} catch (error) {
					logger.error(`Failed to remove alert: ${error}`);
					process.exit(1);
				}
			}),
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

			logger.info('Creating alert...');
			logger.info(`Metric: ${options.metric}`);
			logger.info(`Threshold: ${options.threshold}`);
			logger.info(`Action: ${options.action}`);

			// TODO: Implement alert creation
			logger.succeed('Alert created successfully');
		} catch (error) {
			logger.error(`Failed to create alert: ${error}`);
			process.exit(1);
		}
	});
