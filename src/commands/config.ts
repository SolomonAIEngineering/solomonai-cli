import { Command } from 'commander';
import { exportCommand } from './config/export.ts';
import { getCommand } from './config/get.ts';
import { importCommand } from './config/import.ts';
import { listCommand } from './config/list.ts';
import { profileCommand } from './config/profile.ts';
import { removeCommand } from './config/remove.ts';
import { resetCommand } from './config/reset.ts';
import { setCommand } from './config/set.ts';
import { showCommand } from './config/show.ts';
import { CONFIG_DESCRIPTIONS, CONFIG_KEYS } from './config/types.ts';

export const configCommand = new Command()
	.name('config')
	.description('Manage CLI configuration and settings')
	.addCommand(setCommand)
	.addCommand(getCommand)
	.addCommand(removeCommand)
	.addCommand(resetCommand)
	.addCommand(profileCommand)
	.addCommand(listCommand)
	.addCommand(showCommand)
	.addCommand(exportCommand)
	.addCommand(importCommand)
	.addHelpText(
		'after',
		`
Configuration Options:
${CONFIG_KEYS.map(
	(key) => `  ${key.padEnd(20)} ${CONFIG_DESCRIPTIONS[key]}`,
).join('\n')}

Examples:
  # Set configuration values
  $ solomonai-cli config set --api-key your-api-key
  $ solomonai-cli config set --org-id your-org-id
  $ solomonai-cli config set --tenant-id your-tenant-id

  # Manage profiles
  $ solomonai-cli config profile create staging
  $ solomonai-cli config profile use staging
  $ solomonai-cli config profile list

  # View and manage configuration
  $ solomonai-cli config list
  $ solomonai-cli config show
  $ solomonai-cli config get --api-key
  $ solomonai-cli config remove --tenant-id

  # Import/Export configuration
  $ solomonai-cli config export --file config-backup.json
  $ solomonai-cli config import --file config-backup.json

For more information about a specific command:
  $ solomonai-cli config <command> --help
`,
	);
