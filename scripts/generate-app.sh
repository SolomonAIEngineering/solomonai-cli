#!/bin/bash

# Strict mode
set -euo pipefail
IFS=$'\n\t'

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}INFO:${NC} $1"
}

log_success() {
    echo -e "${GREEN}SUCCESS:${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}WARNING:${NC} $1"
}

log_error() {
    echo -e "${RED}ERROR:${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    local -a required_commands=("rsync" "perl" "find" "xargs")
    local missing_commands=()

    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            missing_commands+=("$cmd")
        fi
    done

    if [ ${#missing_commands[@]} -ne 0 ]; then
        log_error "Missing required commands: ${missing_commands[*]}"
        log_info "Please install the missing commands and try again."
        exit 1
    fi
}

# Function to validate input
validate_input() {
    if [ "$#" -ne 1 ]; then
        log_error "Usage: $0 <new_app_name>"
        exit 1
    fi

    if [[ ! "$1" =~ ^[a-z0-9-]+$ ]]; then
        log_error "App name must contain only lowercase letters, numbers, and hyphens"
        exit 1
    fi
}

# Function to process templates
process_templates() {
    local target_dir="$1"
    local app_name="$2"

    log_info "Processing template files..."

    # Rename .hbs files
    while IFS= read -r -d '' file; do
        if [[ "$file" == *.hbs ]]; then
            local newname="${file%.hbs}"
            log_info "Renaming $file to $newname"
            mv -v "$file" "$newname"
        fi
    done < <(find "$target_dir" -type f -print0)

    # Process template variables
    log_info "Replacing template variables..."
    find "$target_dir" -type f -print0 | xargs -0 perl -pi -e "s/\{\{kebabCase name\}\}/$app_name/g"
}

# Main execution
main() {
    log_info "Starting app generation process..."

    # Validate input and check prerequisites
    validate_input "$@"
    check_prerequisites

    local new_app_name="$1"
    local template_dir="turbo/generator/templates/app"
    local target_dir="apps/$new_app_name"

    log_info "Template directory: $template_dir"
    log_info "Target directory: $target_dir"

    # Check if template directory exists
    if [ ! -d "$template_dir" ]; then
        log_error "Template directory not found: $template_dir"
        exit 1
    fi

    # Check if target directory already exists
    if [ -d "$target_dir" ]; then
        log_error "Directory $target_dir already exists."
        exit 1
    fi

    # Create target directory
    log_info "Creating target directory..."
    mkdir -p "$target_dir"

    # Copy template files
    log_info "Copying template files..."
    if ! rsync -av "$template_dir/" "$target_dir/" > /dev/null; then
        log_error "Failed to copy template files"
        rm -rf "$target_dir"
        exit 1
    fi

    # Process templates
    process_templates "$target_dir" "$new_app_name"

    # Verify critical files
    log_info "Verifying critical files..."
    local -a critical_files=("package.json" "tsconfig.json")
    for file in "${critical_files[@]}"; do
        if [ ! -f "$target_dir/$file" ]; then
            log_warning "Critical file missing: $file"
        fi
    done

    log_success "App '$new_app_name' created successfully in $target_dir"

    # Print next steps
    echo -e "\n${GREEN}Next steps:${NC}"
    echo -e "1. cd $target_dir"
    echo -e "2. pnpm install"
    echo -e "3. pnpm dev\n"
}

# Execute main function with all arguments
main "$@"