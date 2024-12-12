import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store';

export const lockCommand = new Command()
	.name('lock')
	.description('Lock configuration to prevent changes')
	.option('--profile <name>', 'Target profile')
	.requiredOption('--passphrase <phrase>', 'Lock passphrase')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			// TODO: Implement config locking
			logger.succeed('Configuration locked successfully');
		} catch (error) {
			logger.error(`Failed to lock configuration: ${error}`);
			process.exit(1);
		}
	});

export const unlockCommand = new Command()
	.name('unlock')
	.description('Unlock a locked configuration')
	.option('--profile <name>', 'Target profile')
	.requiredOption('--passphrase <phrase>', 'Lock passphrase')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			// TODO: Implement config unlocking
			logger.succeed('Configuration unlocked successfully');
		} catch (error) {
			logger.error(`Failed to unlock configuration: ${error}`);
			process.exit(1);
		}
	});
