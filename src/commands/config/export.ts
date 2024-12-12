import { Command } from 'commander';
import { writeFile } from 'fs/promises';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store.ts';

export const exportCommand = new Command()
	.name('export')
	.description('Export configuration to a file')
	.requiredOption('-f, --file <filepath>', 'Path to export file')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const profiles = await store.listProfiles();

			await writeFile(options.file, JSON.stringify(profiles, null, 2));
			logger.succeed(`Configuration exported to ${options.file}`);
		} catch (error) {
			logger.error(`Failed to export configuration: ${error}`);
			process.exit(1);
		}
	});
