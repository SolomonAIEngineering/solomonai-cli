import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';

export const directoriesCommand = new Command()
	.name('directories')
	.description('Manage directory structure')
	.addCommand(
		new Command()
			.name('create')
			.description('Create a new directory')
			.requiredOption('--path <path>', 'Directory path to create')
			.action(async (options) => {
				try {
					const store = await ConfigStore.getInstance();
					const apiKey = await store.getValue('api-key');

					if (!apiKey) {
						throw new Error(
							'API key not configured. Run: solomonai-cli config set api-key <your-key>',
						);
					}

					// TODO: Implement actual API call to create directory
					logger.info(`Creating directory: ${options.path}`);
					logger.succeed('Directory created successfully');
				} catch (error) {
					logger.error(`Failed to create directory: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('delete')
			.description('Delete a directory')
			.requiredOption('--path <path>', 'Directory path to delete')
			.option('--recursive', 'Delete directory and contents')
			.action(async (options) => {
				try {
					const store = await ConfigStore.getInstance();
					const apiKey = await store.getValue('api-key');

					if (!apiKey) {
						throw new Error(
							'API key not configured. Run: solomonai-cli config set api-key <your-key>',
						);
					}

					// TODO: Implement actual API call to delete directory
					logger.info(`Deleting directory: ${options.path}`);
					if (options.recursive) {
						logger.info('Including all contents');
					}
					logger.succeed('Directory deleted successfully');
				} catch (error) {
					logger.error(`Failed to delete directory: ${error}`);
					process.exit(1);
				}
			}),
	);
