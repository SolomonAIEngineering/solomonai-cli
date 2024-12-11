import chalk from 'chalk';
import { Command } from 'commander';
import { checkMacPrerequisites } from '../utils/checkPrerequisites';
import { logger } from '../utils/logger';

const TEMPLATES = {
	app: {
		description:
			'Generate a new Next.js application in the apps directory of your monorepo.',
		longDescription: `
			📱 Creates a new Next.js application with:
			• TypeScript configuration
			• ESLint and Prettier setup
			• Jest testing environment
			• Proper monorepo integration
			• CI/CD workflow templates
			• Component structure
		`,
		command: (name: string) => `./scripts/generate-app.sh ${name}`,
	},
	package: {
		description: 'Generate a new TypeScript package in the packages directory.',
		longDescription: `
			📦 Creates a new TypeScript package with:
			• Modern TypeScript configuration
			• Build setup with tsup
			• Unit testing with Vitest
			• Documentation template
			• Package.json with proper monorepo settings
			• Type definitions generation
		`,
		command: (name: string) => `./scripts/generate-package.sh ${name}`,
	},
	'react-package': {
		description:
			'Generate a new React component package in the packages directory.',
		longDescription: `
			⚛️ Creates a new React component library with:
			• TypeScript + React configuration
			• Storybook setup
			• Component testing with Testing Library
			• Modern bundling with tsup
			• CSS-in-JS setup
			• Component documentation template
			• Example components
		`,
		command: (name: string) => `./scripts/generate-react-package.sh ${name}`,
	},
};

const displayHelp = () => {
	logger.info('\n📚 Available Generator Templates:\n');
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
		chalk.green('  solomonai-cli generate app my-app              ') +
			chalk.gray('# Generates new Next.js app'),
	);
	logger.info(
		chalk.green('  solomonai-cli generate package utils           ') +
			chalk.gray('# Generates new package'),
	);
	logger.info(
		chalk.green('  solomonai-cli generate react-package ui        ') +
			chalk.gray('# Generates new React package'),
	);

	logger.info(chalk.bold('\n⚡️ Quick Tips:\n'));
	logger.info(chalk.gray('• Use -o flag to specify custom output directory'));
	logger.info(chalk.gray('• All generators include TypeScript by default'));
	logger.info(
		chalk.gray(
			'• Generated packages are automatically integrated with the monorepo',
		),
	);
	logger.info(
		chalk.gray(
			'• Each template includes proper testing and documentation setup',
		),
	);

	logger.info(chalk.bold('\n📖 Documentation:\n'));
	logger.info(chalk.gray('For more detailed information, visit:'));
	logger.info(
		chalk.blue(
			'https://github.com/your-repo/solomonai-cli/blob/main/docs/generators.md',
		),
	);
};

export const generateCommand = new Command()
	.command('generate')
	.argument(
		'<type>',
		'Type of package to generate (app, package, react-package)',
	)
	.argument(
		'<name>',
		'Name of your package. This will determine the directory name.',
	)
	.option(
		'-o, --output <path>',
		'Custom output path (default: apps/ for apps, packages/ for packages)',
	)
	.option('-v, --verbose', 'Show detailed output during generation')
	.option(
		'-d, --dry-run',
		'Show what would be generated without actually creating files',
	)
	.description('Generate a new package in your monorepo')
	.allowExcessArguments(false)
	.helpOption('-h, --help', 'Display help information')
	.addHelpCommand(false)
	.action(async (type, name, options) => {
		try {
			await checkMacPrerequisites();

			const template = TEMPLATES[type as keyof typeof TEMPLATES];
			if (!template) {
				logger.error(`❌ Invalid generator type: ${type}`);
				logger.info('\nAvailable types:');
				Object.keys(TEMPLATES).forEach((t) => {
					logger.info(chalk.blue(`• ${t}`));
				});
				process.exit(1);
			}

			logger.info(
				chalk.bold(`\n🚀 Generating ${type} with name "${name}"...\n`),
			);

			if (options.verbose) {
				logger.info(chalk.gray('Template details:'));
				logger.info(template.longDescription);
				logger.info(chalk.gray('\nGeneration steps:'));
				logger.info(chalk.gray('1. Creating directory structure'));
				logger.info(chalk.gray('2. Copying template files'));
				logger.info(chalk.gray('3. Updating package configurations'));
				logger.info(chalk.gray('4. Installing dependencies'));
				logger.info('');
			}

			if (options.dryRun) {
				logger.info(chalk.yellow('🔍 Dry run - no files will be created\n'));
				logger.info(
					chalk.gray('Would create files in:'),
					chalk.blue(options.output || `${type}s/${name}`),
				);
				logger.info(
					chalk.gray('Would run command:'),
					chalk.blue(template.command(name)),
				);
				return;
			}

			const { execSync } = await import('child_process');
			execSync(template.command(name), {
				stdio: options.verbose ? 'inherit' : 'pipe',
			});

			logger.succeed(chalk.bold.green('\n✨ Generation complete!\n'));
			logger.info('Next steps:');
			logger.info(chalk.gray('1. cd into your new package:'));
			logger.info(chalk.blue(`   cd ${options.output || `${type}s/${name}`}`));
			logger.info(chalk.gray('2. Install dependencies:'));
			logger.info(chalk.blue('   pnpm install'));
			logger.info(chalk.gray('3. Start development:'));
			logger.info(chalk.blue('   pnpm dev'));
		} catch (error) {
			logger.error('\n❌ Failed to generate package:');
			if (options.verbose && error instanceof Error) {
				logger.error(chalk.red(error.stack));
			} else {
				logger.error(chalk.red(String(error)));
			}
			process.exit(1);
		}
	});
