import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store';

const validateEnvironmentName = (name: string): void => {
	if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
		throw new Error(
			'Environment name can only contain letters, numbers, hyphens, and underscores',
		);
	}
	if (name.length < 2 || name.length > 32) {
		throw new Error('Environment name must be between 2 and 32 characters');
	}
};

export const environmentCommand = new Command()
	.name('environment')
	.description('Manage configuration environments')
	.addCommand(
		new Command()
			.name('create')
			.description('Create a new environment')
			.argument('<name>', 'Name of the environment to create')
			.option('--profile <name>', 'Associate with a profile')
			.action(async (name, options) => {
				try {
					validateEnvironmentName(name);
					const store = await ConfigStore.getInstance();
					await store.createEnvironment(name, options.profile);
					logger.succeed(`Created environment: ${name}`);

					if (options.profile) {
						logger.info(`Associated with profile: ${options.profile}`);
					}
				} catch (error) {
					logger.error(`Failed to create environment: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('use')
			.description('Switch to an environment')
			.argument('<name>', 'Environment to switch to')
			.action(async (name) => {
				try {
					const store = await ConfigStore.getInstance();
					await store.setEnvironment(name);
					const profile = await store.getActiveProfile();
					logger.succeed(`Switched to environment: ${name}`);
					logger.info(`Using profile: ${profile.name}`);
				} catch (error) {
					logger.error(`Failed to switch environment: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('list')
			.description('List all environments')
			.action(async () => {
				try {
					const store = await ConfigStore.getInstance();
					const environments = await store.listEnvironments();

					if (environments.length === 0) {
						logger.info('\nNo environments configured');
						return;
					}

					logger.info('\nEnvironments:');
					environments.forEach((env) => {
						const activeMarker = env.isActive ? '* ' : '  ';
						logger.info(`${activeMarker}${env.name}`);
						if (env.profiles.length > 0) {
							logger.info(`  Profiles: ${env.profiles.join(', ')}`);
						} else {
							logger.info('  No profiles linked');
						}
					});
					logger.info('\n* indicates active environment');
				} catch (error) {
					logger.error(`Failed to list environments: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('link')
			.description('Link a profile to an environment')
			.argument('<env-name>', 'Environment name')
			.argument('<profile-name>', 'Profile to link')
			.action(async (envName, profileName) => {
				try {
					const store = await ConfigStore.getInstance();
					await store.linkProfileToEnvironment(envName, profileName);
					logger.succeed(
						`Linked profile ${profileName} to environment ${envName}`,
					);
				} catch (error) {
					logger.error(`Failed to link profile: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('unlink')
			.description('Unlink a profile from an environment')
			.argument('<env-name>', 'Environment name')
			.argument('<profile-name>', 'Profile to unlink')
			.action(async (envName, profileName) => {
				try {
					const store = await ConfigStore.getInstance();
					await store.unlinkProfileFromEnvironment(envName, profileName);
					logger.succeed(
						`Unlinked profile ${profileName} from environment ${envName}`,
					);
				} catch (error) {
					logger.error(`Failed to unlink profile: ${error}`);
					process.exit(1);
				}
			}),
	);
