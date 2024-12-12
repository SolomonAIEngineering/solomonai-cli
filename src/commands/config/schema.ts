import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store';

export const schemaCommand = new Command()
	.name('schema')
	.description('Manage configuration schemas')
	.addCommand(
		new Command()
			.name('set')
			.description('Set a schema file')
			.requiredOption('--file <path>', 'Path to schema file')
			.action(async (options) => {
				try {
					const store = await ConfigStore.getInstance();
					await store.setValue('schema-path', options.file);
					await store.validateConfig(options.file);
					logger.succeed('Schema set and validated successfully');
				} catch (error) {
					logger.error(`Failed to set schema: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('validate')
			.description('Validate configuration against schema')
			.option('--profile <name>', 'Target profile')
			.option('--strict', 'Enable strict validation')
			.action(async (options) => {
				try {
					const store = await ConfigStore.getInstance();
					const isValid = await store.validateConfig();

					if (isValid) {
						logger.succeed('Configuration is valid');
					} else {
						logger.error('Configuration is invalid');
						process.exit(1);
					}
				} catch (error) {
					logger.error(`Validation failed: ${error}`);
					process.exit(1);
				}
			}),
	);
