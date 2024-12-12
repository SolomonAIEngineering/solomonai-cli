import { Command } from 'commander';
import { exportCommand } from './dashboard/export.ts';
import { stressTestCommand } from './dashboard/stress-test.ts';
import { viewCommand } from './dashboard/view.ts';

export const dashboardCommand = new Command()
	.name('dashboard')
	.description('Financial overview and analytics dashboard')
	.addCommand(viewCommand)
	.addCommand(exportCommand)
	.addCommand(stressTestCommand)
	.addHelpText(
		'after',
		`
Examples:
  # View real-time revenue metrics
  $ solomonai-cli dashboard view --metrics revenue --time-period this-month

  # Export cash flow report
  $ solomonai-cli dashboard export --format PDF --metrics cash-flow --time-period last-quarter

  # Run stress test scenario
  $ solomonai-cli dashboard stress-test --scenario revenue-drop --variable 20

Available Metrics:
  - revenue
  - expenses
  - cash-flow
  - profit-margins
  - burn-rate
  - runway

Time Periods:
  - today
  - this-week
  - this-month
  - this-quarter
  - this-year
  - last-week
  - last-month
  - last-quarter
  - last-year
  - custom (YYYY-MM-DD:YYYY-MM-DD)
`,
	);
