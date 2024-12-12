import { Command } from 'commander';
import { readFile } from 'fs/promises';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store.ts';
import type { Profile } from './types.ts';

export const importCommand = new Command()
	.name('import')
	.description('Import configuration from a file')
	.requiredOption('-f, --file <filepath>', 'Path to import file')
	.action(async (options) => {
		try {
			const data = await readFile(options.file, 'utf-8');
			const profiles = JSON.parse(data) as Profile[];

			const store = await ConfigStore.getInstance();
			await store.importProfiles(profiles);

			logger.succeed(`Configuration imported from ${options.file}`);
		} catch (error) {
			logger.error(`Failed to import configuration: ${error}`);
			process.exit(1);
		}
	});
