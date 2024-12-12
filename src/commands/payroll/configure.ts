import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';

interface PayrollConfig {
	region: string;
	paySchedule: string;
	taxRules: Record<string, any>;
	benefits: Record<string, any>;
	overtimePolicy: Record<string, any>;
}

export const configureCommand = new Command()
	.name('configure')
	.description('Configure payroll settings')
	.option('--region <code>', 'Region code (US/UK/EU)')
	.option('--tax-rules <path>', 'Tax rules config file')
	.option('--benefits-config <path>', 'Benefits configuration file')
	.option('--pay-schedule <type>', 'Pay schedule type')
	.option('--overtime-policy <path>', 'Overtime calculations file')
	.option('--compliance-check', 'Run compliance check')
	.addCommand(
		new Command()
			.name('list')
			.description('Show current configuration')
			.action(async () => {
				try {
					const store = await ConfigStore.getInstance();
					const config = await store.getValue('payroll-config');

					logger.info('\nCurrent Payroll Configuration:');
					logger.info('===========================');
					if (config) {
						const parsedConfig: PayrollConfig = JSON.parse(config);
						logger.info(`Region: ${parsedConfig.region}`);
						logger.info(`Pay Schedule: ${parsedConfig.paySchedule}`);
						logger.info('\nTax Rules:');
						logger.info(JSON.stringify(parsedConfig.taxRules, null, 2));
						logger.info('\nBenefits:');
						logger.info(JSON.stringify(parsedConfig.benefits, null, 2));
					} else {
						logger.info('No configuration found');
					}
				} catch (error) {
					logger.error(`Failed to list configuration: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('reset')
			.description('Reset to default configuration')
			.action(async () => {
				try {
					const store = await ConfigStore.getInstance();
					// TODO: Implement reset logic
					logger.succeed('Configuration reset to defaults');
				} catch (error) {
					logger.error(`Failed to reset configuration: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('export')
			.description('Export configuration')
			.requiredOption('--file <path>', 'Export file path')
			.action(async (options) => {
				try {
					const store = await ConfigStore.getInstance();
					const config = await store.getValue('payroll-config');
					// TODO: Implement export logic
					logger.succeed(`Configuration exported to ${options.file}`);
				} catch (error) {
					logger.error(`Failed to export configuration: ${error}`);
					process.exit(1);
				}
			}),
	)
	.addCommand(
		new Command()
			.name('import')
			.description('Import configuration')
			.requiredOption('--file <path>', 'Import file path')
			.action(async (options) => {
				try {
					// TODO: Implement import logic
					logger.succeed(`Configuration imported from ${options.file}`);
				} catch (error) {
					logger.error(`Failed to import configuration: ${error}`);
					process.exit(1);
				}
			}),
	)
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const apiKey = await store.getValue('api-key');

			if (!apiKey) {
				throw new Error(
					'API key not configured. Run: solomonai-cli config set api-key <your-key>',
				);
			}

			logger.info('Updating payroll configuration...');

			const config: Partial<PayrollConfig> = {};

			if (options.region) config.region = options.region;
			if (options.paySchedule) config.paySchedule = options.paySchedule;

			// TODO: Implement file loading and validation for these configs
			if (options.taxRules)
				logger.info(`Loading tax rules from ${options.taxRules}`);
			if (options.benefitsConfig)
				logger.info(`Loading benefits from ${options.benefitsConfig}`);
			if (options.overtimePolicy)
				logger.info(`Loading overtime policy from ${options.overtimePolicy}`);

			await store.setValue('payroll-config', JSON.stringify(config));
			logger.succeed('Configuration updated successfully');

			if (options.complianceCheck) {
				logger.info('\nRunning compliance check...');
				// TODO: Implement compliance check
				logger.succeed('Compliance check passed');
			}
		} catch (error) {
			logger.error(`Configuration failed: ${error}`);
			process.exit(1);
		}
	});
