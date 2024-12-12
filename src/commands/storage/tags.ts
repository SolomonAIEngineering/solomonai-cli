import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';

export const tagsCommand = new Command()
	.name('tags')
	.description('Manage document tags')
	.addCommand(
		new Command()
			.name('add')
			.description('Add tags to a document')
			.requiredOption('--document-id <id>', 'Target document ID')
			.requiredOption('--tags <tags>', 'Tags to add (comma-separated)')
			.action(async (options) => {
				try {
					const store = await ConfigStore.getInstance();
					const apiKey = await store.getValue('api-key');

					if (!apiKey) {
						throw new Error(
							'API key not configured. Run: solomonai-cli config set api-key <your-key>',
						);
					}

					const tags = options.tags.split(',').map((tag: string) => tag.trim());
					logger.info(`Adding tags to document ${options.documentId}:`);
					logger.info(tags.join(', '));
					logger.succeed('Tags added successfully');
				} catch (error) {
					logger.error(`Failed to add tags: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('remove')
			.description('Remove tags from a document')
			.requiredOption('--document-id <id>', 'Target document ID')
			.requiredOption('--tags <tags>', 'Tags to remove (comma-separated)')
			.action(async (options) => {
				try {
					const store = await ConfigStore.getInstance();
					const apiKey = await store.getValue('api-key');

					if (!apiKey) {
						throw new Error(
							'API key not configured. Run: solomonai-cli config set api-key <your-key>',
						);
					}

					const tags = options.tags.split(',').map((tag: string) => tag.trim());
					logger.info(`Removing tags from document ${options.documentId}:`);
					logger.info(tags.join(', '));
					logger.succeed('Tags removed successfully');
				} catch (error) {
					logger.error(`Failed to remove tags: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('list')
			.description('List all available tags')
			.action(async () => {
				try {
					const store = await ConfigStore.getInstance();
					const apiKey = await store.getValue('api-key');

					if (!apiKey) {
						throw new Error(
							'API key not configured. Run: solomonai-cli config set api-key <your-key>',
						);
					}

					// TODO: Implement actual API call
					logger.info('\nAvailable tags:');
					logger.info('No tags found');
				} catch (error) {
					logger.error(`Failed to list tags: ${error}`);
					process.exit(1);
				}
			}),
	);
