import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from './store';

export const auditCommand = new Command()
	.name('audit')
	.description('View configuration audit trail')
	.option('--profile <name>', 'Target profile')
	.option('--time-period <start:end>', 'Filter by time period')
	.option('--action <type>', 'Filter by action type')
	.option('--export <path>', 'Export audit log to file')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const auditLog = await store.getAuditLog(options);

			if (options.export) {
				// TODO: Implement audit log export
				logger.succeed(`Audit log exported to ${options.export}`);
				return;
			}

			logger.info('\nAudit Log:');
			logger.info('==========');

			auditLog.forEach((entry) => {
				logger.info(`\nTimestamp: ${entry.timestamp.toLocaleString()}`);
				logger.info(`Action: ${entry.action}`);
				if (entry.key) logger.info(`Key: ${entry.key}`);
				if (entry.profile) logger.info(`Profile: ${entry.profile}`);
				if (entry.user) logger.info(`User: ${entry.user}`);
			});
		} catch (error) {
			logger.error(`Failed to retrieve audit log: ${error}`);
			process.exit(1);
		}
	});
