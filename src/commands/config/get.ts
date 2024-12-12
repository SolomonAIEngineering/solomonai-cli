import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { CONFIG_DESCRIPTIONS, CONFIG_KEYS, type ConfigKey } from './types';

export const getCommand = new Command()
	.name('get')
	.description('Get a configuration value')
	.argument(
		'<key>',
		`Configuration key to retrieve (${CONFIG_KEYS.join(', ')})`,
	)
	.usage('<key>')
	.addHelpText(
		'after',
		`
Examples:
  $ solomonai-cli config get api-key
  $ solomonai-cli config get org-id

Available Configuration Keys:
${CONFIG_KEYS.map(
	(key) => `  ${key.padEnd(20)} ${CONFIG_DESCRIPTIONS[key]}`,
).join('\n')}
`,
	)
	.action(async (key: string) => {
		try {
			if (!CONFIG_KEYS.includes(key as ConfigKey)) {
				logger.error(
					`Invalid configuration key: ${key}\nValid keys are: ${CONFIG_KEYS.join(
						', ',
					)}`,
				);
				process.exit(1);
			}

			// TODO: Implement configuration retrieval logic
			logger.info(`Getting value for ${key}`);
		} catch (error) {
			logger.error(`Failed to get configuration: ${error}`);
			process.exit(1);
		}
	});
