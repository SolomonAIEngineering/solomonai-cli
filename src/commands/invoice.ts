import { Command } from 'commander';
import { analyticsCommand } from './invoice/analytics.ts';
import { createCommand } from './invoice/create.ts';
import { listCommand } from './invoice/list.ts';
import { reminderCommand } from './invoice/reminder.ts';
import { sendCommand } from './invoice/send.ts';

export const invoiceCommand = new Command()
	.name('invoice')
	.description('Manage invoices and billing')
	.addCommand(createCommand)
	.addCommand(listCommand)
	.addCommand(sendCommand)
	.addCommand(reminderCommand)
	.addCommand(analyticsCommand)
	.addHelpText(
		'after',
		`
Available Commands:
  create     Create a new invoice
  list       List and filter invoices
  send       Send an invoice to a client
  reminder   Set up invoice reminders
  analytics  Generate invoice reports

Options:
  create:
    --client <name>          Client name or ID (required)
    --amount <number>        Invoice amount (required)
    --currency <code>        Currency code (default: USD)
    --due-date <date>       Due date (YYYY-MM-DD)
    --template-id <id>      Invoice template ID
    --recurring <interval>  Set as recurring (weekly/monthly/yearly)

  list:
    --status <status>       Filter by paid/unpaid/overdue
    --client <name>         Filter by client
    --date-range <range>    Filter by date range

  send:
    --invoice-id <id>       Invoice ID to send (required)
    --email <address>       Recipient email (required)

  reminder:
    --invoice-id <id>       Invoice ID for reminder (required)
    --frequency <freq>      Reminder frequency (required)

  analytics:
    --time-period <period>  Analysis period (required)
    --client <name>         Filter by client
    --revenue-distribution  Include revenue breakdown

Examples:
  # Create a new invoice
  $ solomonai-cli invoice create --client acme-corp --amount 1000 --currency USD

  # List unpaid invoices
  $ solomonai-cli invoice list --status unpaid

  # Send invoice to client
  $ solomonai-cli invoice send --invoice-id INV-123 --email client@example.com

  # Set up recurring reminder
  $ solomonai-cli invoice reminder --invoice-id INV-123 --frequency weekly

  # View analytics
  $ solomonai-cli invoice analytics --time-period last-quarter --client acme-corp

For more details on a specific command:
  $ solomonai-cli invoice <command> --help
`,
	);
