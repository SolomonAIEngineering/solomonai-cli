import { Command } from 'commander';
import { logger } from '../../utils/logger';

const previewCommand = new Command()
	.name('preview')
	.description('Preview matches before applying')
	.requiredOption('--file-id <id>', 'File ID to preview matches')
	.action(async (options) => {
		try {
			logger.info(`Previewing matches for file ${options.fileId}...`);
			// TODO: Implement preview logic
		} catch (error) {
			logger.error(`Failed to preview matches: ${error}`);
			process.exit(1);
		}
	});

const applyCommand = new Command()
	.name('apply')
	.description('Apply and finalize matches')
	.requiredOption('--file-id <id>', 'File ID to apply matches')
	.action(async (options) => {
		try {
			logger.info(`Applying matches for file ${options.fileId}...`);
			// TODO: Implement apply logic
		} catch (error) {
			logger.error(`Failed to apply matches: ${error}`);
			process.exit(1);
		}
	});

export const matchCommand = new Command()
	.name('match')
	.description('Perform reconciliation matching')
	.requiredOption('--file-id <id>', 'File ID to match')
	.option('--rule-file <path>', 'Path to external rule file')
	.option('--auto-resolve', 'Automatically resolve discrepancies')
	.option('--threshold <value>', 'Tolerance threshold')
	.option('--vendor-override <id>', 'Vendor-specific overrides')
	.option('--no-confirm', 'Skip confirmation prompts')
	.option('--log-level <level>', 'Log verbosity (info/debug/verbose)', 'info')
	.addCommand(previewCommand)
	.addCommand(applyCommand)
	.action(async (options) => {
		try {
			logger.info('Starting reconciliation match...');
			logger.info('Options:', options);

			// TODO: Implement matching logic
			logger.succeed('Matching completed successfully');
		} catch (error) {
			logger.error(`Failed to perform matching: ${error}`);
			process.exit(1);
		}
	});
