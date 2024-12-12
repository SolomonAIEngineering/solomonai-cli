import { Command } from 'commander';
import { alertCommand } from './cashflow/alert.ts';
import { analyzeCommand } from './cashflow/analyze.ts';
import { forecastCommand } from './cashflow/forecast.ts';
import { integrationCommand } from './cashflow/integration.ts';
import { scenarioCommand } from './cashflow/scenario.ts';

export const cashflowCommand = new Command()
	.name('cashflow')
	.description('Manage and analyze cash flow')
	.addCommand(analyzeCommand)
	.addCommand(forecastCommand)
	.addCommand(scenarioCommand)
	.addCommand(alertCommand)
	.addCommand(integrationCommand)
	.addHelpText(
		'after',
		`
Available Commands:
  analyze     Analyze cash flow and generate reports
  forecast    Generate cash flow forecasts
  scenario    Manage scenario modeling
  alert       Configure cash flow alerts
  integration Manage data integrations

Options by Command:
  analyze:
    --time-period <start:end>    Analysis period (e.g., 2024-01-01:2024-03-31)
    --variables <var1,var2,...>  Focus variables (revenue/expenses/net-cash)
    --scenario <name>            Apply saved scenario
    --granularity <level>        Detail level (daily/weekly/monthly/quarterly)
    --compare-to <period>        Compare with previous period
    --format <type>             Output format (json/csv/table/chart)
    --export <path>             Export results file path
    --tags <tag1,tag2>          Filter by tags
    --source <name>             Data source integration

  forecast:
    --time-horizon <months>      Forecast period in months
    --assumptions <path>         Assumptions file path
    --confidence-level <%>       Prediction confidence level
    --scenario <name>            Apply scenario model
    --external-data <api>        External data integration
    --format <type>             Output format (json/csv)
    --export <path>             Save forecast results

  scenario:
    create:
      --name <name>             Scenario name
      --description <text>      Scenario description
      --assumptions <path>      Assumptions file path
    list:
      --filter <keyword>        Filter scenarios
    delete:
      --name <name>            Remove scenario
    apply:
      --name <name>            Use scenario

  alert:
    --threshold <value>         Numeric/percentage threshold
    --metric <type>            Monitored metric
    --action <type>            Alert action (email/webhook/slack/sms)
    --recipient <address>      Alert destination
    --frequency <interval>     Check frequency
    --mute-until <date>       Temporary mute period

  integration:
    add:
      --type <type>            Integration type
      --api-key <key>          API credentials
    list                       Show integrations
    remove:
      --integration-id <id>    Remove integration

Examples:
  # Analyze quarterly cash flow
  $ solomonai-cli cashflow analyze --time-period 2024-01-01:2024-03-31 --granularity monthly --format chart

  # Generate 12-month forecast
  $ solomonai-cli cashflow forecast --time-horizon 12 --assumptions ./forecast-config.json --confidence-level 90

  # Create scenario model
  $ solomonai-cli cashflow scenario create --name "recession_case" --assumptions ./recession-model.json

  # Set up low balance alert
  $ solomonai-cli cashflow alert --threshold 10000 --metric net-cash --action email --recipient finance@example.com

  # Add bank integration
  $ solomonai-cli cashflow integration add --type bank --api-key ABC123XYZ

For detailed help on any command:
  $ solomonai-cli cashflow <command> --help
`,
	);
