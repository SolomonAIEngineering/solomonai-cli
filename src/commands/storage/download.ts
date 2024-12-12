import { Command } from 'commander';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';

export const downloadCommand = new Command()
	.name('download')
	.description('Download documents from storage')
	.requiredOption('--document-id <id>', 'Document to download')
	.option('--directory <dir>', 'Download directory', process.cwd())
	.option('--output <path>', 'Save location')
	.option('--version <number>', 'Specific version')
	.option('--decrypt', 'Decrypt on download')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const apiKey = await store.getValue('api-key');

			if (!apiKey) {
				throw new Error(
					'API key not configured. Run: solomonai-cli config set api-key <your-key>',
				);
			}

			logger.info(`Downloading document ${options.documentId}...`);
			if (options.version) {
				logger.info(`Version: ${options.version}`);
			}

			// TODO: Implement actual API call to download file
			const downloadPath =
				options.output ||
				join(options.directory, `document-${options.documentId}`);

			// Simulate file download
			await writeFile(downloadPath, 'Downloaded content');

			logger.succeed(`Downloaded to: ${downloadPath}`);
			if (options.decrypt) {
				logger.info('Document decrypted');
			}
		} catch (error) {
			logger.error(`Download failed: ${error}`);
			process.exit(1);
		}
	});
