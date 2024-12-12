import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store.ts';
import { CONFIG_KEYS, type ConfigKey } from './types.ts';

export const removeCommand = new Command()
	.name('remove')
	.description('Remove a configuration value')
	.option('--api-key', 'Remove API key')
	.option('--org-id', 'Remove organization ID')
	.option('--tenant-id', 'Remove tenant ID')
	.argument('[key]', 'Configuration key to remove')
	.action(async (key, options) => {
		try {
			const store = await ConfigStore.getInstance();

			if (options.apiKey) key = 'api-key';
			if (options.orgId) key = 'org-id';
			if (options.tenantId) key = 'tenant-id';

			if (!key) {
				logger.error('Please specify a key to remove');
				process.exit(1);
			}

			if (!CONFIG_KEYS.includes(key as ConfigKey)) {
				logger.error(
					`Invalid configuration key: ${key}\nValid keys are: ${CONFIG_KEYS.join(
						', ',
					)}`,
				);
				process.exit(1);
			}

			await store.setValue(key, '');
			logger.succeed(`Removed value for ${key}`);
		} catch (error) {
			logger.error(`Failed to remove configuration: ${error}`);
			process.exit(1);
		}
	});
