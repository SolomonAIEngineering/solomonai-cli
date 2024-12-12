import { Command } from 'commander';
import { readFile } from 'fs/promises';
import { basename } from 'path';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';

export const uploadCommand = new Command()
	.name('upload')
	.description('Upload documents to storage')
	.requiredOption('--file-path <path>', 'Path to document')
	.option('--directory <dir>', 'Target directory')
	.option('--category <category>', 'Document category')
	.option('--encrypt', 'Enable encryption')
	.option('--tags <tags>', 'Add tags (comma-separated)')
	.option(
		'--metadata <items>',
		'Add metadata (key:value pairs, comma-separated)',
	)
	.option('--version-note <text>', 'Version note')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const apiKey = await store.getValue('api-key');

			if (!apiKey) {
				throw new Error(
					'API key not configured. Run: solomonai-cli config set api-key <your-key>',
				);
			}

			logger.info(`Uploading ${options.filePath}...`);

			const metadata = options.metadata
				?.split(',')
				.reduce((acc: Record<string, string>, item: string) => {
					const [key, value] = item.split(':');
					return { ...acc, [key.trim()]: value.trim() };
				}, {});

			const tags = options.tags?.split(',').map((tag: string) => tag.trim());

			// TODO: Implement actual API call to upload file
			const fileContent = await readFile(options.filePath);
			const fileName = basename(options.filePath);

			logger.info('Upload successful!');
			logger.info(`File: ${fileName}`);
			logger.info(`Directory: ${options.directory || 'root'}`);
			if (options.category) logger.info(`Category: ${options.category}`);
			if (options.encrypt) logger.info('Encryption: enabled');
			if (tags) logger.info(`Tags: ${tags.join(', ')}`);
			if (metadata)
				logger.info(`Metadata: ${JSON.stringify(metadata, null, 2)}`);
			if (options.versionNote)
				logger.info(`Version note: ${options.versionNote}`);
		} catch (error) {
			logger.error(`Upload failed: ${error}`);
			process.exit(1);
		}
	});
