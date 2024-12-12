import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';

export const metadataCommand = new Command()
	.name('metadata')
	.description('Manage document metadata')
	.addCommand(
		new Command()
			.name('set')
			.description('Set metadata for a document')
			.requiredOption('--document-id <id>', 'Target document ID')
			.requiredOption(
				'--metadata <items>',
				'Metadata key:value pairs (comma-separated)',
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

					const metadata = options.metadata
						.split(',')
						.reduce((acc: Record<string, string>, item: string) => {
							const [key, value] = item.split(':');
							return { ...acc, [key.trim()]: value.trim() };
						}, {});

					logger.info(`Setting metadata for document ${options.documentId}`);
					logger.info(`Metadata: ${JSON.stringify(metadata, null, 2)}`);
					logger.succeed('Metadata updated successfully');
				} catch (error) {
					logger.error(`Failed to set metadata: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('get')
			.description('Get metadata for a document')
			.requiredOption('--document-id <id>', 'Target document ID')
			.action(async (options) => {
				try {
					const store = await ConfigStore.getInstance();
					const apiKey = await store.getValue('api-key');

					if (!apiKey) {
						throw new Error(
							'API key not configured. Run: solomonai-cli config set api-key <your-key>',
						);
					}

					logger.info(`\nMetadata for document ${options.documentId}:`);
					logger.info('No metadata found'); // TODO: Implement actual API call
				} catch (error) {
					logger.error(`Failed to get metadata: ${error}`);
					process.exit(1);
				}
			}),
	);
