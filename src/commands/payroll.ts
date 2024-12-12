import { Command } from 'commander';
import { configureCommand } from './payroll/configure.ts';
import { reportCommand } from './payroll/report.ts';
import { runCommand } from './payroll/run.ts';

export const payrollCommand = new Command()
	.name('payroll')
	.description('Manage payroll processing and reporting')
	.addCommand(runCommand)
	.addCommand(reportCommand)
	.addCommand(configureCommand)
	.addHelpText(
		'after',
		`
Available Commands:
  run         Process payroll for a pay period
  report      Generate payroll reports
  configure   Configure payroll settings

Options by Command:
  run:
    --time-period <start:end>    Pay period (e.g., 2024-01-01:2024-01-15)
    --employee-list <path>       Employee data file path
    --auto-tax                   Auto-calculate tax withholdings
    --overtime-rules <path>      Overtime rules file path
    --bonuses <path>            Bonuses/commissions file path
    --dry-run                   Simulate without processing
    --confirm                   Skip confirmation prompts
    --notify <method>           Send notifications
    --output <path>             Export summary file path

  report:
    --time-period <start:end>    Report time frame
    --format <type>             Output format (pdf/csv/excel/json)
    --include-taxes             Include tax breakdowns
    --group-by <field>          Group by department/location/role
    --export <path>             Save report file path
    --email <address>           Email to stakeholders
    template:
      list                      List report templates
      apply:
        --template-id <id>      Apply template

  configure:
    --region <code>             Region code (US/UK/EU)
    --tax-rules <path>          Tax rules config file
    --benefits-config <path>    Benefits configuration file
    --pay-schedule <type>       Pay schedule type
    --overtime-policy <path>    Overtime calculations file
    --compliance-check         Run compliance check
    list                       Show current config
    reset                      Reset to defaults
    export:
      --file <path>            Export config file
    import:
      --file <path>            Import config file

Examples:
  # Process payroll with bonuses
  $ solomonai-cli payroll run --time-period 2024-01-01:2024-01-15 --employee-list ./employees.csv --bonuses ./bonuses.csv

  # Generate quarterly report
  $ solomonai-cli payroll report --time-period 2024-01-01:2024-03-31 --format excel --include-taxes

  # Configure regional settings
  $ solomonai-cli payroll configure --region US --tax-rules ./us_tax_rules.json --pay-schedule biweekly

For detailed help on any command:
  $ solomonai-cli payroll <command> --help
`,
	);
