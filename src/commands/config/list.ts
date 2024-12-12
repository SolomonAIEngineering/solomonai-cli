import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store.ts';

export const listCommand = new Command()
	.name('list')
	.description('List all configuration values for the active profile')
	.action(async () => {
		try {
			const store = await ConfigStore.getInstance();
			const profile = await store.getActiveProfile();

			logger.info(`\nConfiguration for profile: ${profile.name}`);
			Object.entries(profile.config).forEach(([key, value]) => {
				const maskedValue = key.includes('key') ? '****' : value;
				logger.info(`${key}: ${maskedValue}`);
			});
		} catch (error) {
			logger.error(`Failed to list configuration: ${error}`);
			process.exit(1);
		}
	});
