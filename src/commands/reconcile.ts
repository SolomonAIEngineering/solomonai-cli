import { Command } from 'commander';
import { exceptionsCommand } from './reconcile/exceptions.ts';
import { historyCommand } from './reconcile/history.ts';
import { matchCommand } from './reconcile/match.ts';
import { rulesCommand } from './reconcile/rules.ts';
import { statusCommand } from './reconcile/status.ts';
import { uploadCommand } from './reconcile/upload.ts';

export const reconcileCommand = new Command()
	.name('reconcile')
	.description('Reconcile financial records and manage exceptions')
	.addCommand(uploadCommand)
	.addCommand(matchCommand)
	.addCommand(exceptionsCommand)
	.addCommand(rulesCommand)
	.addCommand(historyCommand)
	.addCommand(statusCommand)
	.addHelpText(
		'after',
		`
Available Commands:
  upload      Upload files for reconciliation
  match       Perform and preview matches
  exceptions  Manage reconciliation exceptions
  rules       Manage reconciliation rules
  history     View reconciliation history
  status      Check reconciliation status

Options by Command:
  upload:
    --file-path <path>       Path to file or directory
    --type <type>           Record type (invoices/transactions/mixed)
    --format <format>       File format (csv/excel/json)
    --batch                 Enable batch mode
    --date-range <range>    Filter by date range
    --vendor-filter <name>  Filter by vendor
    --dry-run              Validate without uploading
    --auto-match           Auto-trigger matching
    --match-threshold <%>  Set matching threshold

  match:
    --file-id <id>         File ID to match
    --rule-file <path>     External rule file
    --auto-resolve         Auto-resolve discrepancies
    --threshold <value>    Tolerance threshold
    --vendor-override <id> Vendor-specific overrides
    --no-confirm          Skip confirmations
    --log-level <level>   Set log verbosity

  exceptions:
    --file-id <id>         Target file ID
    --filter <type>        Filter by type
    --date-range <range>   Filter by date
    --vendor-filter <name> Filter by vendor
    --export <format>      Export exceptions
    --resolve <id>         Resolve exception
    --bulk-resolve        Bulk resolution

  rules:
    list    List all rules
    add     Add new rule
    remove  Remove rule
    update  Update rule
    import  Import rules
    export  Export rules

Examples:
  # Upload and auto-match invoices
  $ solomonai-cli reconcile upload --file-path ./invoices.csv --type invoices --auto-match

  # Match with custom rules
  $ solomonai-cli reconcile match --file-id 12345 --rule-file ./rules.json

  # View exceptions
  $ solomonai-cli reconcile exceptions --file-id 12345 --filter unmatched

  # Manage rules
  $ solomonai-cli reconcile rules list
  $ solomonai-cli reconcile rules add --field amount --condition approx --threshold 5

  # Check history and status
  $ solomonai-cli reconcile history --date-range 2024-01-01:2024-03-01
  $ solomonai-cli reconcile status --file-id 12345 --verbose

For detailed help on any command:
  $ solomonai-cli reconcile <command> --help
`,
	);
