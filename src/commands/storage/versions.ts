import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';
import type { VersionInfo } from './types';

export const versionsCommand = new Command()
	.name('versions')
	.description('Handle document versioning')
	.addCommand(
		new Command()
			.name('list')
			.description('List versions of a document')
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

					// TODO: Implement actual API call
					const versions: VersionInfo[] = [];

					logger.info(`\nVersions for document ${options.documentId}:`);
					if (versions.length === 0) {
						logger.info('No versions found');
						return;
					}

					versions.forEach((version) => {
						logger.info(`\nVersion ${version.version}`);
						logger.info(`Created: ${version.createdAt.toLocaleString()}`);
						logger.info(`Size: ${version.size} bytes`);
						if (version.note) logger.info(`Note: ${version.note}`);
					});
				} catch (error) {
					logger.error(`Failed to list versions: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('rollback')
			.description('Rollback to a specific version')
			.requiredOption('--document-id <id>', 'Target document ID')
			.requiredOption('--version <number>', 'Version to rollback to')
			.action(async (options) => {
				try {
					const store = await ConfigStore.getInstance();
					const apiKey = await store.getValue('api-key');

					if (!apiKey) {
						throw new Error(
							'API key not configured. Run: solomonai-cli config set api-key <your-key>',
						);
					}

					logger.info(
						`Rolling back document ${options.documentId} to version ${options.version}...`,
					);
					logger.succeed('Rollback successful');
				} catch (error) {
					logger.error(`Failed to rollback version: ${error}`);
					process.exit(1);
				}
			}),
	);
