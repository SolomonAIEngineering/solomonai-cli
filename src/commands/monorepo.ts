import { Command } from 'commander';
import { checkMacPrerequisites } from '../utils/checkPrerequisites';
import { logger } from '../utils/logger';

const TEMPLATES = {
	nextForge: {
		description:
			'Production-grade Turborepo template for Next.js apps. Designed to be a comprehensive starting point with a solid, opinionated foundation and minimal configuration.',
		command: (name: string) => `npx next-forge@latest init ${name}`,
	},
	saasfly: {
		description:
			'All-in-One solution for building SaaS services. Build awesome apps and ship fast with Saasfly.',
		command: (name: string) => `bun create saasfly ${name}`,
	},
	saasBoilerplate: {
		description:
			'Complete SaaS foundation with frontend, backend API, admin panel, and workers. Features AWS-based architecture and continuous deployment for multiple environments.',
		command: (name: string) => `pnpm create saas-boilerplate ${name}`,
	},
	openSaas: {
		description:
			'Full-stack SaaS template built with Wasp. Includes authentication, payments, teams, and admin panel out of the box.',
		command: (name: string) => `wasp new ${name} -t saas`,
	},
	midday: {
		description:
			'Everything you need to build a production ready SaaS. An opinionated stack based on learnings from building Midday using the latest Next.js framework. Monorepo with focus on code reuse and best practices that will grow with your business.',
		command: (name: string) => `bunx degit midday-ai/v1 ${name}`,
	},
};

const displayHelp = () => {
	logger.info('\nAvailable Templates:\n');
	Object.entries(TEMPLATES).forEach(([name, { description }]) => {
		logger.info(`${name}:`);
		logger.info(`  ${description}`);
		logger.info('');
	});
	logger.info('\nUsage Examples:\n');
	logger.info(
		'  solomonai-cli monorepo my-app                    # Uses nextForge template',
	);
	logger.info(
		'  solomonai-cli monorepo my-app -t saasfly        # Uses Saasfly template',
	);
	logger.info(
		'  solomonai-cli monorepo my-app -t saasBoilerplate # Uses SaaS Boilerplate',
	);
	logger.info(
		'  solomonai-cli monorepo my-app -t openSaas       # Uses Open SaaS template\n',
	);
};

export const monorepoCommand = new Command()
	.command('monorepo')
	.argument(
		'[name]',
		'Name of your monorepo project. This will be used as the directory name and package name.',
	)
	.option(
		'-t, --template <template>',
		`Template to use (${Object.keys(TEMPLATES).join(
			'/',
		)}). Each template provides different features and tech stacks:
		- nextForge: Production-ready Next.js monorepo with minimal config
		- saasfly: Complete SaaS starter with auth, payments, and more
		- saasBoilerplate: AWS-based SaaS with frontend, API, and admin panel
		- openSaas: Wasp-powered SaaS with built-in business features
		- midday: Battle-tested Next.js monorepo used in production`,
		'nextForge',
	)
	.option(
		'-h, --help',
		'Display detailed help information including template descriptions and usage examples',
	)
	.option(
		'-l, --list',
		'List all available templates with their full descriptions and key features',
	)
	.option(
		'-o, --options',
		'Show all available command options and configuration flags',
	)
	.description('Scaffold a new monorepo project')
	.action(async (name, options) => {
		if (options.help) {
			displayHelp();
			return;
		}

		if (options.list) {
			logger.info('\n🔍 Available Templates:\n');
			Object.entries(TEMPLATES).forEach(([name, { description }]) => {
				logger.info(`📦 ${name}`);
				logger.info(`   ${description}`);
				logger.info('');
			});
			return;
		}

		if (options.options) {
			logger.info('\n⚙️  Command Options:\n');
			logger.info('  -t, --template <template>  Choose a template to use');
			logger.info('  -l, --list                List all available templates');
			logger.info('  -h, --help                Display help information');
			logger.info('  -o, --options             Show these command options\n');
			logger.info('\n📋 Template Options:\n');
			Object.keys(TEMPLATES).forEach((name) => {
				logger.info(`  ${name}`);
			});
			logger.info('');
			return;
		}

		const projectName = name || 'my-monorepo';
		try {
			await checkMacPrerequisites();

			const template = TEMPLATES[options.template as keyof typeof TEMPLATES];
			if (!template) {
				logger.error(`Invalid template: ${options.template}`);
				displayHelp();
				process.exit(1);
			}

			logger.info(`Creating monorepo with ${options.template}...`);
			logger.info(`\n${template.description}\n`);

			const { execSync } = await import('child_process');
			execSync(template.command(projectName), {
				stdio: 'inherit',
			});
		} catch (error) {
			console.error('Failed to create monorepo:', error);
			process.exit(1);
		}
	});
