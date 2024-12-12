import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store.ts';

export const showCommand = new Command()
	.name('show')
	.description('Show detailed configuration information')
	.action(async () => {
		try {
			const store = await ConfigStore.getInstance();
			const profiles = await store.listProfiles();
			const activeProfile = await store.getActiveProfile();

			logger.info('\nConfiguration Details:');
			logger.info('====================');
			logger.info(`Active Profile: ${activeProfile.name}`);
			logger.info('\nProfiles:');
			profiles.forEach((profile) => {
				const activeMarker = profile.isActive ? '* ' : '  ';
				logger.info(`${activeMarker}${profile.name}`);
				Object.entries(profile.config).forEach(([key, value]) => {
					const maskedValue = key.includes('key') ? '****' : value;
					logger.info(`    ${key}: ${maskedValue}`);
				});
				logger.info('');
			});
		} catch (error) {
			logger.error(`Failed to show configuration: ${error}`);
			process.exit(1);
		}
	});
