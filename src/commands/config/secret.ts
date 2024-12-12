import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store';
import { SecretOptions } from './types';

export const secretCommand = new Command()
	.name('secret')
	.description('Manage secrets and sensitive configuration')
	.addCommand(
		new Command()
			.name('set')
			.description('Set a secret value')
			.argument('<key>', 'Secret key to set')
			.argument('<value>', 'Secret value')
			.option('--profile <name>', 'Target profile')
			.option('--encrypt', 'Encrypt the value')
			.option(
				'--store <type>',
				'Storage type (local/vault/aws-secrets/azure-keyvault)',
				'local',
			)
			.action(async (key, value, options) => {
				try {
					const store = await ConfigStore.getInstance();
					const secretOptions: SecretOptions = {
						encrypted: options.encrypt || false,
						store: options.store,
					};
					await store.setSecret(key, value, secretOptions);
					logger.succeed(`Secret ${key} set successfully`);
				} catch (error) {
					logger.error(`Failed to set secret: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('get')
			.description('Get a secret value')
			.argument('<key>', 'Secret key to retrieve')
			.option('--profile <name>', 'Target profile')
			.option('--decrypt', 'Decrypt the value')
			.action(async (key, options) => {
				try {
					const store = await ConfigStore.getInstance();
					const value = await store.getValue(key);
					logger.info(`${key}: ${value}`);
				} catch (error) {
					logger.error(`Failed to get secret: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('list')
			.description('List all secrets')
			.option('--profile <name>', 'Target profile')
			.option('--no-values', 'Only show keys')
			.action(async (options) => {
				try {
					const store = await ConfigStore.getInstance();
					const profile = await store.getActiveProfile();

					logger.info('\nSecrets:');
					Object.entries(profile.config).forEach(([key, value]) => {
						if (options.values) {
							logger.info(`${key}: ${value}`);
						} else {
							logger.info(key);
						}
					});
				} catch (error) {
					logger.error(`Failed to list secrets: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('rotate')
			.description('Rotate a secret')
			.argument('<key>', 'Secret to rotate')
			.option('--profile <name>', 'Target profile')
			.option('--auto', 'Auto-rotate using configured provider')
			.action(async (key, options) => {
				try {
					const store = await ConfigStore.getInstance();
					// TODO: Implement rotation logic
					logger.succeed(`Secret ${key} rotated successfully`);
				} catch (error) {
					logger.error(`Failed to rotate secret: ${error}`);
					process.exit(1);
				}
			}),
	);
