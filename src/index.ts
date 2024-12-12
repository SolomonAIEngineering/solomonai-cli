#! /usr/bin/env node
import { Command } from 'commander';
import { packageJSON } from 'utils/packageJson.ts';
import { renderTitle } from 'utils/renderTitle.ts';
import {
	budgetCommand,
	cashflowCommand,
	configCommand,
	dashboardCommand,
	expenseCommand,
	invoiceCommand,
	payrollCommand,
	reconcileCommand,
	skaffoldCommand,
	storageCommand,
} from './commands';

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
	program.addCommand(expenseCommand);
	program.addCommand(invoiceCommand);
	program.addCommand(reconcileCommand);
	program.addCommand(storageCommand);
	program.addCommand(dashboardCommand);
	program.addCommand(budgetCommand);
	program.addCommand(cashflowCommand);
	program.addCommand(payrollCommand);
	program.parse(process.argv);
})();
