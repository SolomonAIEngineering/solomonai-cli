import { Command } from 'commander';
import { logger } from '../../utils/logger';
import { ConfigStore } from '../config/store';

interface ReconcileStatus {
	fileId: string;
	status: 'pending' | 'in_progress' | 'completed' | 'failed';
	progress: number;
	totalRecords: number;
	matchedRecords: number;
	unmatchedRecords: number;
	exceptions: number;
	startedAt: Date;
	completedAt?: Date;
	error?: string;
}

export const statusCommand = new Command()
	.name('status')
	.description('Check reconciliation status')
	.requiredOption('--file-id <id>', 'File ID to check status')
	.option('--watch', 'Watch status in real-time')
	.option('--interval <seconds>', 'Refresh interval in seconds', '5')
	.option('--verbose', 'Show detailed status information')
	.action(async (options) => {
		try {
			const store = await ConfigStore.getInstance();
			const apiKey = await store.getValue('api-key');

			if (!apiKey) {
				throw new Error(
					'API key not configured. Run: solomonai-cli config set api-key <your-key>',
				);
			}

			const checkStatus = async () => {
				// TODO: Implement actual API call
				const status: ReconcileStatus = {
					fileId: options.fileId,
					status: 'in_progress',
					progress: 65,
					totalRecords: 1000,
					matchedRecords: 650,
					unmatchedRecords: 50,
					exceptions: 30,
					startedAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
				};

				logger.info('\nReconciliation Status:');
				logger.info('=====================');
				logger.info(`File ID: ${status.fileId}`);
				logger.info(`Status: ${status.status}`);
				logger.info(`Progress: ${status.progress}%`);
				logger.info(`Started: ${status.startedAt.toLocaleString()}`);

				if (options.verbose) {
					logger.info('\nDetailed Information:');
					logger.info(`Total Records: ${status.totalRecords}`);
					logger.info(`Matched: ${status.matchedRecords}`);
					logger.info(`Unmatched: ${status.unmatchedRecords}`);
					logger.info(`Exceptions: ${status.exceptions}`);

					if (status.completedAt) {
						logger.info(`Completed: ${status.completedAt.toLocaleString()}`);
					}
					if (status.error) {
						logger.error(`Error: ${status.error}`);
					}
				}

				return status.status !== 'completed' && status.status !== 'failed';
			};

			if (options.watch) {
				const interval = parseInt(options.interval, 10) * 1000;
				logger.info(`Watching status (refresh every ${options.interval}s)...`);

				while (await checkStatus()) {
					await new Promise((resolve) => setTimeout(resolve, interval));
				}
			} else {
				await checkStatus();
			}
		} catch (error) {
			logger.error(`Failed to get status: ${error}`);
			process.exit(1);
		}
	});
