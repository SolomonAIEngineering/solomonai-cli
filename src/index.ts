#! /usr/bin/env node
import { Command } from 'commander';
import { packageJSON } from 'utils/packageJson.ts';
import { renderTitle } from 'utils/renderTitle.ts';
import { configCommand, skaffoldCommand } from './commands';

(async () => {
	renderTitle();

	const program = new Command();

	program
		.name('Solomon CLI')
		.description(
			'⚡️ Scaffold a nextjs project, react packages, component library, and more.',
		)
		.version(
			packageJSON.version,
			'-v, --version',
			'display the version number',
		);

	program.addCommand(skaffoldCommand);
	program.addCommand(configCommand);

	program.parse(process.argv);
})();
