import chalk from 'chalk';
import { Command } from 'commander';
import { checkMacPrerequisites } from '../../utils/checkPrerequisites';
import { logger } from '../../utils/logger';

const TEMPLATES = {
	app: {
		description: 'Modern Next.js 14 project using App Router.',
		longDescription: `
			🚀 Modern Next.js setup featuring:
			• App Router architecture
			• TypeScript configuration
			• Tailwind CSS styling
			• ESLint and Prettier
			• Optimized routing
			• Server Components
			• API routes setup
		`,
		command: (name: string) =>
			`npx create-next-app@latest ${name} --ts --tailwind --app --src-dir --import-alias "@/*"`,
	},
	pages: {
		description: 'Traditional Next.js project using Pages Router.',
		longDescription: `
			📄 Classic Next.js setup with:
			• Pages Router architecture
			• TypeScript support
			• Tailwind CSS integration
			• Route handlers
			• API routes
			• SEO optimization
			• Performance best practices
		`,
		command: (name: string) =>
			`npx create-next-app@latest ${name} --ts --tailwind --src-dir --import-alias "@/*"`,
	},
	fullstack: {
		description: 'Full-stack Next.js setup with T3 Stack.',
		longDescription: `
			⚡️ Complete full-stack setup including:
			• Next.js 14 with App Router
			• Prisma for type-safe ORM
			• tRPC for end-to-end typesafe APIs
			• NextAuth.js authentication
			• Tailwind CSS styling
			• TypeScript configuration
			• Database setup
		`,
		command: (name: string) => `npx create-t3-app@latest ${name}`,
	},
	enterprise: {
		description: 'Production-grade Next.js template.',
		longDescription: `
			🏢 Enterprise-ready setup featuring:
			• Authentication system
			• Database integration
			• Testing setup (Jest, Cypress)
			• CI/CD workflows
			• Security best practices
			• Monitoring setup
			• Performance optimizations
		`,
		command: (name: string) => `npx create-next-enterprise@latest ${name}`,
	},
	horizonUI: {
		description: 'Professional Admin Dashboard with Chakra UI.',
		longDescription: `
			🎨 Complete dashboard solution with:
			• Chakra UI components
			• Multiple layout options
			• Authentication flows
			• Dark/light mode
			• Data visualization
			• Admin panels
			• User management
		`,
		command: (name: string) =>
			`git clone https://github.com/horizon-ui/horizon-ui-chakra-nextjs.git ${name} && cd ${name} && npm install`,
	},
};

const displayHelp = () => {
	logger.info('\n📚 Available Next.js Templates:\n');
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
		chalk.green('  solomonai-cli next my-app                 ') +
			chalk.gray('# Uses App Router'),
	);
	logger.info(
		chalk.green('  solomonai-cli next my-app -t pages        ') +
			chalk.gray('# Uses Pages Router'),
	);
	logger.info(
		chalk.green('  solomonai-cli next my-app -t fullstack    ') +
			chalk.gray('# Uses T3 Stack'),
	);

	logger.info(chalk.bold('\n⚡️ Quick Tips:\n'));
	logger.info(
		chalk.gray('• All templates include TypeScript and Tailwind CSS'),
	);
	logger.info(chalk.gray('• Use -v flag for verbose output during creation'));
	logger.info(chalk.gray('• App Router is recommended for new projects'));
	logger.info(
		chalk.gray('• Each template includes SEO and performance optimizations'),
	);

	logger.info(chalk.bold('\n📖 Documentation:\n'));
	logger.info(chalk.gray('For more detailed information, visit:'));
	logger.info(
		chalk.blue(
			'https://github.com/your-repo/solomonai-cli/blob/main/docs/nextjs.md',
		),
	);
};

export const nextCommand = new Command()
	.command('next')
	.argument(
		'[name]',
		'Name of your Next.js project. This will be used as the directory name.',
	)
	.option(
		'-t, --template <template>',
		`Template to use (${Object.keys(TEMPLATES).join(
			'/',
		)}). Each template provides different features:
			- app: Modern Next.js with App Router
			- pages: Traditional Pages Router setup
			- fullstack: T3 Stack with Prisma and tRPC
			- enterprise: Production-ready setup
			- boilerplate: Production-ready Next.js boilerplate
			- dashboard: Modern admin dashboard with Shadcn UI
			- horizonUI: Professional Admin Dashboard template built with Next.js, Chakra UI, and TypeScript`,
		'app',
	)
	.option(
		'-h, --help',
		'Display help information including template descriptions',
	)
	.option('-l, --list', 'List all available templates with their descriptions')
	.description('Scaffold a new Next.js project')
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

		const projectName = name || 'my-next-app';
		try {
			await checkMacPrerequisites();

			const template = TEMPLATES[options.template as keyof typeof TEMPLATES];
			if (!template) {
				logger.error(`Invalid template: ${options.template}`);
				displayHelp();
				process.exit(1);
			}

			logger.info(
				`Creating Next.js project with ${options.template} template...`,
			);
			logger.info(`\n${template.description}\n`);

			const { execSync } = await import('child_process');
			execSync(template.command(projectName), {
				stdio: 'inherit',
			});
		} catch (error) {
			console.error('Failed to create Next.js project:', error);
			process.exit(1);
		}
	});
