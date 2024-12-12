import { Command } from 'commander';
import { adjustCommand } from './budget/adjust';
import { createCommand } from './budget/create';
import { forecastCommand } from './budget/forecast';

export const budgetCommand = new Command()
	.name('budget')
	.description('Budget management and financial forecasting')
	.addCommand(createCommand)
	.addCommand(adjustCommand)
	.addCommand(forecastCommand)
	.addHelpText(
		'after',
		`
Examples:
  # Create a new budget
  $ solomonai-cli budget create --amount 5000 --category marketing --time-period Q2-2024

  # Adjust existing budget
  $ solomonai-cli budget adjust --budget-id 12345 --new-amount 6000

  # Run financial forecast
  $ solomonai-cli budget forecast run --time-period 12-months --variables growth:5,inflation:3

Available Categories:
  - marketing
  - development
  - operations
  - sales
  - hr
  - infrastructure
  - other

Time Periods:
  - monthly
  - quarterly
  - yearly
  - custom (YYYY-MM-DD:YYYY-MM-DD)

Forecast Variables:
  - growth
  - inflation
  - churn
  - conversion
  - expenses
`,
	);
