import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { CONFIG_KEYS } from './types';

export const resetCommand = new Command()
	.name('reset')
	.description('Reset all configurations to default values')
	.usage('')
	.addHelpText(
		'after',
		`
This command will reset all configuration values to their defaults.
The following configurations will be reset:
${CONFIG_KEYS.map((key) => `  - ${key}`).join('\n')}

Example:
  $ solomonai-cli config reset
`,
	)
	.action(async () => {
		try {
			// TODO: Implement configuration reset logic
			logger.info('Resetting all configurations to default values');
			logger.info(
				`The following keys will be reset: ${CONFIG_KEYS.join(', ')}`,
			);
		} catch (error) {
			logger.error(`Failed to reset configuration: ${error}`);
			process.exit(1);
		}
	});
