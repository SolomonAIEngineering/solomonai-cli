import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { CONFIG_DESCRIPTIONS, CONFIG_KEYS, type ConfigKey } from './types';

export const setCommand = new Command()
	.name('set')
	.description('Set a configuration value')
	.argument('<key>', `Configuration key to set (${CONFIG_KEYS.join(', ')})`)
	.argument('<value>', 'Value to set for the configuration key')
	.usage('<key> <value>')
	.addHelpText(
		'after',
		`
Examples:
  $ solomonai-cli config set api-key your-api-key
  $ solomonai-cli config set org-id your-org-id

Available Configuration Keys:
${CONFIG_KEYS.map(
	(key) => `  ${key.padEnd(20)} ${CONFIG_DESCRIPTIONS[key]}`,
).join('\n')}
`,
	)
	.action(async (key: string, value: string) => {
		try {
			if (!CONFIG_KEYS.includes(key as ConfigKey)) {
				logger.error(
					`Invalid configuration key: ${key}\nValid keys are: ${CONFIG_KEYS.join(
						', ',
					)}`,
				);
				process.exit(1);
			}

			// TODO: Implement configuration storage logic
			logger.info(`Setting ${key}=${value}`);
		} catch (error) {
			logger.error(`Failed to set configuration: ${error}`);
			process.exit(1);
		}
	});
