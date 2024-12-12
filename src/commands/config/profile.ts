import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store.ts';
import { DEFAULT_PROFILE } from './types.ts';

export const profileCommand = new Command()
	.name('profile')
	.description('Manage configuration profiles')
	.addCommand(
		new Command()
			.name('create')
			.description('Create a new profile')
			.argument('<name>', 'Name of the profile to create')
			.action(async (name) => {
				try {
					const store = await ConfigStore.getInstance();
					await store.createProfile(name);
					logger.succeed(`Created profile: ${name}`);
				} catch (error) {
					logger.error(`Failed to create profile: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('use')
			.description('Switch to a different profile')
			.argument('<name>', 'Name of the profile to switch to')
			.action(async (name) => {
				try {
					const store = await ConfigStore.getInstance();
					await store.setActiveProfile(name);
					logger.succeed(`Switched to profile: ${name}`);
				} catch (error) {
					logger.error(`Failed to switch profile: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('list')
			.description('List all available profiles')
			.action(async () => {
				try {
					const store = await ConfigStore.getInstance();
					const profiles = await store.listProfiles();

					logger.info('\nAvailable profiles:');
					profiles.forEach((profile) => {
						const activeMarker = profile.isActive ? '* ' : '  ';
						logger.info(`${activeMarker}${profile.name}`);
					});
					logger.info('\n* indicates active profile');
				} catch (error) {
					logger.error(`Failed to list profiles: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('delete')
			.description('Delete a profile')
			.argument('<name>', 'Name of the profile to delete')
			.action(async (name) => {
				try {
					if (name === DEFAULT_PROFILE) {
						throw new Error('Cannot delete default profile');
					}
					const store = await ConfigStore.getInstance();
					await store.deleteProfile(name);
					logger.succeed(`Deleted profile: ${name}`);
				} catch (error) {
					logger.error(`Failed to delete profile: ${error}`);
					process.exit(1);
				}
			}),
	);
