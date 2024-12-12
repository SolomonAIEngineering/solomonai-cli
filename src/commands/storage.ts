import { Command } from 'commander';
import { directoriesCommand } from './storage/directories';
import { downloadCommand } from './storage/download';
import { infoCommand } from './storage/info';
import { listCommand } from './storage/list';
import { metadataCommand } from './storage/metadata';
import { searchCommand } from './storage/search.ts';
import { shareCommand } from './storage/share';
import { tagsCommand } from './storage/tags.ts';
import { uploadCommand } from './storage/upload';
import { versionsCommand } from './storage/versions.ts';

export const storageCommand = new Command()
	.name('storage')
	.description('Manage document storage and organization')
	.addCommand(uploadCommand)
	.addCommand(downloadCommand)
	.addCommand(listCommand)
	.addCommand(infoCommand)
	.addCommand(shareCommand)
	.addCommand(directoriesCommand)
	.addCommand(metadataCommand)
	.addCommand(versionsCommand)
	.addCommand(searchCommand)
	.addCommand(tagsCommand)
	.addHelpText(
		'after',
		`
Available Commands:
  upload       Upload documents to storage
  download     Download documents from storage
  list         List documents and directories
  info         View detailed document information
  share        Share documents with others
  directories  Manage directory structure
  metadata     Manage document metadata
  versions     Handle document versioning
  search       Search for documents
  tags         Manage document tags

Options by Command:
  upload:
    --file-path <path>      Path to document (required)
    --directory <dir>       Target directory
    --category <category>   Document category
    --encrypt              Enable encryption
    --tags <tags>          Add tags
    --metadata <key:value> Add metadata
    --version-note <text>  Version note

  download:
    --document-id <id>     Document to download
    --directory <dir>      Download directory
    --output <path>        Save location
    --version <number>     Specific version
    --decrypt             Decrypt on download

  list:
    --directory <dir>      Target directory
    --category <category>  Filter by category
    --tags <tags>         Filter by tags
    --date-range <range>  Filter by date
    --recursive          Include subdirectories

  share:
    --document-id <id>     Document to share
    --directory <dir>      Directory to share
    --email <email>       Recipient email
    --permissions <level> Access level
    --expires <date>      Expiration date

Examples:
  # Upload an encrypted document
  $ solomonai-cli storage upload --file-path ./report.pdf --encrypt --category reports

  # List documents with filters
  $ solomonai-cli storage list --directory finance --tags Q1,reports --recursive

  # Share a document
  $ solomonai-cli storage share --document-id 12345 --email user@example.com --permissions view

  # Search documents
  $ solomonai-cli storage search --query "tax return" --category taxes

  # Manage versions
  $ solomonai-cli storage versions list --document-id 12345
  $ solomonai-cli storage versions rollback --document-id 12345 --version 2

For detailed help on any command:
  $ solomonai-cli storage <command> --help
`,
	);
