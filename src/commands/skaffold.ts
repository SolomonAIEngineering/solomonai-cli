import { Command } from 'commander';
import { generateCommand } from './skaffold/generate.ts';
import { initCommand } from './skaffold/init.ts';
import { libraryCommand } from './skaffold/library.ts';
import { monorepoCommand } from './skaffold/monorepo.ts';
import { nextCommand } from './skaffold/next.ts';

export const skaffoldCommand = new Command()
	.name('skaffold')
	.description('Scaffold various project types and components')
	.addCommand(monorepoCommand)
	.addCommand(initCommand)
	.addCommand(nextCommand)
	.addCommand(libraryCommand)
	.addCommand(generateCommand);
