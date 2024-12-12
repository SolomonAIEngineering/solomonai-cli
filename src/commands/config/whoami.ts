import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store';

export const whoamiCommand = new Command()
	.name('whoami')
	.description('Display current user context')
	.option('--verbose', 'Show detailed information')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const profile = await store.getActiveProfile();

			logger.info('\nCurrent Context:');
			logger.info('===============');
			logger.info(`Profile: ${profile.name}`);
			logger.info(`Environment: ${profile.environment || 'default'}`);

			if (options.verbose) {
				logger.info('\nConfiguration:');
				Object.entries(profile.config).forEach(([key, value]) => {
					if (!key.includes('key') && !key.includes('secret')) {
						logger.info(`${key}: ${value}`);
					}
				});
			}
		} catch (error) {
			logger.error(`Failed to get context: ${error}`);
			process.exit(1);
		}
	});
