import { Command } from 'commander';
import { addCommand } from './expense/add';
import { categorizeCommand } from './expense/categorize';
import { listCommand } from './expense/list';

export const expenseCommand = new Command()
	.name('expense')
	.description('Track and manage expenses')
	.addCommand(addCommand)
	.addCommand(listCommand)
	.addCommand(categorizeCommand)
	.addHelpText(
		'after',
		`
Examples:
  # Add a new expense
  $ solomonai-cli expense add --amount 150.50 --category "office-supplies" --description "Printer ink"

  # List expenses for a category
  $ solomonai-cli expense list --category travel --time-period this-month

  # Re-categorize an expense
  $ solomonai-cli expense categorize --expense-id 12345 --new-category "marketing"

Available Categories:
  - office-supplies
  - travel
  - marketing
  - software
  - utilities
  - payroll
  - rent
  - other

Time Periods:
  - today
  - this-week
  - this-month
  - this-quarter
  - this-year
  - custom (YYYY-MM-DD:YYYY-MM-DD)
`,
	);
