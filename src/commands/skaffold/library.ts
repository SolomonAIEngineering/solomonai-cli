import chalk from 'chalk';
import { Command } from 'commander';
import { checkMacPrerequisites } from '../../utils/checkPrerequisites';
import { logger } from '../../utils/logger';

const TEMPLATES = {
	rollup: {
		description:
			'React Component Library boilerplate with TypeScript, Rollup, and Storybook.',
		longDescription: `
			📦 Production-ready React library setup with:
			• Rollup bundling with optimized configurations
			• TypeScript + React configuration
			• Storybook 7.0 with modern features
			• Jest and React Testing Library
			• ESLint + Prettier setup
			• Automated releases with Changesets
			• Component documentation templates
		`,
		command: (name: string) =>
			`git clone https://github.com/KaiHotz/react-rollup-boilerplate.git ${name} && cd ${name} && bun install`,
	},
	vite: {
		description: 'Modern React library starter with Vite and TypeScript.',
		longDescription: `
			⚡️ Modern development experience with:
			• Vite for lightning-fast development
			• TypeScript + React configuration
			• Storybook integration
			• Vitest for unit testing
			• Automatic API documentation
			• CSS-in-JS support
			• Hot Module Replacement (HMR)
		`,
		command: (name: string) =>
			`npx degit https://github.com/storybookjs/react-vite-starter ${name} && cd ${name} && bun install`,
	},
	tsup: {
		description: 'Minimalist React library setup using tsup.',
		longDescription: `
			🚀 Zero-config library setup featuring:
			• tsup for simple, fast bundling
			• TypeScript configuration
			• Tree-shaking optimizations
			• Multiple output formats (ESM, CJS)
			• Type definitions generation
			• Minimal dependencies
			• Quick start templates
		`,
		command: (name: string) =>
			`npx create-tsup-library ${name} --template react`,
	},
	typescript: {
		description: 'Production-ready TypeScript library starter.',
		longDescription: `
			🛠 Professional TypeScript setup with:
			• Modern TypeScript configuration
			• GitHub Actions CI/CD
			• Automated releases
			• Jest testing setup
			• Comprehensive documentation
			• Code quality tools
			• Performance optimizations
		`,
		command: (name: string) =>
			`npx degit gjuchault/typescript-library-starter ${name}`,
	},
};

const displayHelp = () => {
	logger.info('\n📚 Available Library Templates:\n');
	Object.entries(TEMPLATES).forEach(
		([name, { description, longDescription }]) => {
			logger.info(chalk.bold.blue(`${name}:`));
			logger.info(`  ${description}`);
			if (longDescription) {
				logger.info(chalk.gray(longDescription));
			}
			logger.info('');
		},
	);

	logger.info(chalk.bold('\n🚀 Usage Examples:\n'));
	logger.info(
		chalk.green('  solomonai-cli lib my-lib                  ') +
			chalk.gray('# Uses Rollup template'),
	);
	logger.info(
		chalk.green('  solomonai-cli lib my-components -t vite   ') +
			chalk.gray('# Uses Vite template'),
	);
	logger.info(
		chalk.green('  solomonai-cli lib utils -t typescript     ') +
			chalk.gray('# Uses TypeScript template'),
	);

	logger.info(chalk.bold('\n⚡️ Quick Tips:\n'));
	logger.info(chalk.gray('• All templates include TypeScript by default'));
	logger.info(chalk.gray('• Use -v flag for verbose output during creation'));
	logger.info(
		chalk.gray('• Each template includes testing and documentation setup'),
	);
	logger.info(chalk.gray('• Generated libraries are ready for npm publishing'));

	logger.info(chalk.bold('\n📖 Documentation:\n'));
	logger.info(chalk.gray('For more detailed information, visit:'));
	logger.info(
		chalk.blue(
			'https://github.com/your-repo/solomonai-cli/blob/main/docs/libraries.md',
		),
	);
};

export const libraryCommand = new Command()
	.command('lib')
	.argument(
		'[name]',
		'Name of your component library. This will be used as the directory name.',
	)
	.option(
		'-t, --template <template>',
		`Template to use (${Object.keys(TEMPLATES).join(
			'/',
		)}). Each template provides different features:
			- rollup: Traditional Rollup setup with full testing
			- vite: Modern Vite-based development
			- tsup: Minimal zero-config setup`,
		'rollup',
	)
	.option(
		'-h, --help',
		'Display help information including template descriptions',
	)
	.option('-l, --list', 'List all available templates with their descriptions')
	.description('Scaffold a new React component library')
	.action(async (name, options) => {
		if (options.help) {
			displayHelp();
			return;
		}

		if (options.list) {
			logger.info('\n🔍 Available Library Templates:\n');
			Object.entries(TEMPLATES).forEach(([name, { description }]) => {
				logger.info(`📦 ${name}`);
				logger.info(`   ${description}`);
				logger.info('');
			});
			return;
		}

		const projectName = name || 'my-react-library';
		try {
			await checkMacPrerequisites();

			const template = TEMPLATES[options.template as keyof typeof TEMPLATES];
			if (!template) {
				logger.error(`Invalid template: ${options.template}`);
				displayHelp();
				process.exit(1);
			}

			logger.info(
				`Creating React component library with ${options.template} template...`,
			);
			logger.info(`\n${template.description}\n`);

			const { execSync } = await import('child_process');
			execSync(template.command(projectName), {
				stdio: 'inherit',
			});
		} catch (error) {
			console.error('Failed to create component library:', error);
			process.exit(1);
		}
	});
