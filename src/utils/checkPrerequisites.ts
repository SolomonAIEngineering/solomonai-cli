import { execSync } from 'child_process';
import { logger } from './logger';

const checkCommand = (command: string): boolean => {
	try {
		execSync(`which ${command}`, { stdio: 'ignore' });
		return true;
	} catch {
		return false;
	}
};

export const checkMacPrerequisites = async () => {
	if (process.platform !== 'darwin') return; // Only run on macOS

	if (!checkCommand('brew')) {
		logger.info('Installing Homebrew...');
		execSync(
			'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
			{ stdio: 'inherit' },
		);
	}

	if (!checkCommand('git')) {
		logger.info('Installing Git...');
		execSync('brew install git', { stdio: 'inherit' });
	}

	if (!checkCommand('bun')) {
		logger.info('Installing Bun...');
		execSync('brew install oven-sh/bun/bun', { stdio: 'inherit' });
	}

	if (!checkCommand('nvm')) {
		logger.info('Installing NVM...');
		execSync('brew install nvm', { stdio: 'inherit' });
	}

	if (!checkCommand('wasp')) {
		logger.info('Installing Wasp...');
		execSync('curl -sSL https://get.wasp-lang.dev/installer.sh | sh', {
			stdio: 'inherit',
		});
	}
};
