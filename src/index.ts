#! /usr/bin/env node
import { Command } from 'commander';
import { packageJSON } from 'utils/packageJson.ts';
import { renderTitle } from 'utils/renderTitle.ts';
import {
	generateCommand,
	initCommand,
	libraryCommand,
	monorepoCommand,
	nextCommand,
} from './commands';

(async () => {
	renderTitle();

	const program = new Command();

	program
		.name('Bishop CLI')
		.description(
			'⚡️ Scaffold a nextjs project, react packages, component library, and more.',
		)
		.version(
			packageJSON.version,
			'-v, --version',
			'display the version number',
		);

	program.addCommand(monorepoCommand);
	program.addCommand(initCommand);
	program.addCommand(nextCommand);
	program.addCommand(libraryCommand);
	program.addCommand(generateCommand);

	program.parse(process.argv);
})();
