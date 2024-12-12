<div align="center" width="100%">
    <img src="./logo.svg" width="128" alt="" />
</div>

<h1 align="center">♨️ Solomon CLI</h1>

A comprehensive CLI platform that unifies development and financial operations. Solomon CLI empowers teams with:

- Full-stack development tools for Next.js apps, React libraries, and Turborepo monorepos
- Enterprise financial management with budgeting, expense tracking, and automated reconciliation
- Advanced cash flow analysis, forecasting, and stress testing
- Real-time financial dashboards and reporting
- Automated payroll processing and compliance
- Secure document storage and team collaboration

All powered by modern tooling and industry best practices, enabling organizations to streamline both their development and financial workflows.

---

```bash

 ____            ___                                            ____     __     ______
/\  _`\         /\_ \                                          /\  _`\  /\ \   /\__  _\
\ \,\L\_\    ___\//\ \     ___     ___ ___     ___     ___     \ \ \/\_\\ \ \  \/_/\ \/
 \/_\__ \   / __`\\ \ \   / __`\ /' __` __`\  / __`\ /' _ `\    \ \ \/_/_\ \ \  __\ \ \
   /\ \L\ \/\ \L\ \\_\ \_/\ \L\ \/\ \/\ \/\ \/\ \L\ \/\ \/\ \    \ \ \L\ \\ \ \L\ \\_\ \__
   \ `\____\ \____//\____\ \____/\ \_\ \_\ \_\ \____/\ \_\ \_\    \ \____/ \ \____//\_____\
    \/_____/\/___/ \/____/\/___/  \/_/\/_/\/_/\/___/  \/_/\/_/     \/___/   \/___/ \/_____/



Usage: Solomon CLI [options] [command]

⚡️ Unify development and financial operations.

Options:
  -v, --version   display the version number
  -h, --help      display help for command

Commands:
  skaffold        Scaffold various project types and components
  config          Manage CLI configuration and settings
  expense         Track and manage expenses
  invoice         Manage invoices and billing
  reconcile       Reconcile financial records and manage exceptions
  storage         Manage document storage and organization
  dashboard       Financial overview and analytics dashboard
  budget          Budget management and financial forecasting
  cashflow        Manage and analyze cash flow
  payroll         Manage payroll processing and reporting
  help [command]  display help for command
```

## Introduction

Modern organizations face the dual challenge of managing complex development workflows alongside critical financial operations. **Solomon CLI** addresses both needs through a unified command-line interface that provides:

1. **Development Tools**: Scaffold and maintain projects with integrated toolchains—linters, formatters, bundlers, testing frameworks, and CI/CD pipelines.
2. **Financial Operations**: Manage budgets, track expenses, process payroll, and analyze cash flow with enterprise-grade tools.
3. **Business Intelligence**: Access real-time dashboards, run financial forecasts, and perform stress testing scenarios.

With Solomon CLI, you can:

### Development Operations

- Create Next.js applications with various routing patterns
- Package React libraries with Rollup, tsup, or Vite
- Set up Turborepo monorepos with advanced configurations
- Deploy SaaS templates with auth, payments, and team features

### Financial Management

- Track and categorize expenses across departments
- Create and adjust budgets with forecasting
- Process payroll with tax calculations and compliance
- Reconcile financial records automatically
- Generate comprehensive financial reports

### Business Tools

- Monitor real-time financial metrics
- Run stress tests on financial scenarios
- Manage secure document storage
- Configure team access and permissions

All this is integrated with TypeScript, ESLint, Prettier, Commitlint, and other professional tools to ensure both code quality and financial accuracy.

## Why Solomon CLI?

1. **Speed & Efficiency**:  
   Save hours on setup. With a single command, you'll get a fully configured project that’s ready to develop, test, and deploy.
2. **Consistency Across Projects**:  
   Establish a unified development experience for your entire team. Solomon CLI ensures every new project adheres to the same standards and structure, minimizing onboarding complexity.
3. **Best Practices Built-In**:  
   Benefit from industry best practices—clean code architecture, code quality automation, type safety, and sensible defaults—without manually researching and configuring them yourself.
4. **Extensibility & Customization**:  
   While Solomon CLI offers smart defaults, it doesn’t lock you in. Modify configurations, swap templates, and integrate additional tooling as your project grows.

## Key Features

- **Multiple Project Archetypes**:  
  Target a broad range of development scenarios:

  - Next.js Applications (App & Pages Routers)
  - React Component & UI Libraries
  - TypeScript Utility Packages
  - Full-Stack Monorepos with seamless integrations
  - SaaS Boilerplates designed for production

- **Modern, Reliable Tooling**:  
  Each generated project comes preconfigured with:

  - [**TypeScript**][typescript-url]: Strongly typed code for better reliability and maintainability.
  - [**ESLint**][eslint-url] & [**Prettier**][prettier-url]: Enforced code style and linting to maintain a clean codebase.
  - [**Commitlint**][commitlint-url]: Enforce conventional commit messages, making your commit history standardized and easier to parse.
  - [**tsup**][tsup-url]: Ship optimized builds for libraries and packages, ensuring fast bundle times and minimal configuration.
  - [**Vitest**][vitest-url]: A blazing-fast testing framework, integrated by default to keep your code quality in check.
  - [**Changesets**][changesets-url]: Automate versioning, changelogs, and publishing to npm with ease.

- **Highly Scalable Structures**:  
  Solomon CLI’s monorepo setups integrate seamlessly with tools like Turborepo, enabling advanced caching, parallelization, and code sharing between multiple packages and applications.

- **Production-Ready SaaS Templates**:  
  Get a jumpstart on building subscription-based services with authentication, payment workflows, and team management out-of-the-box, so you can focus on crafting your unique value proposition.

## Quick Start

Install Solomon CLI globally using the package manager of your choice:

```sh
# Using npm
npm install -g solomonai-cli

# Using yarn
yarn global add solomonai-cli

# Using pnpm
pnpm add -g solomonai-cli

# Using bun
bun add -g solomonai-cli
```

After installation, run `solomonai-cli --help` to discover available commands and options.

## Core Commands & Workflows

### Create a Next.js Application

Spinning up a Next.js application is a breeze—choose between the modern App Router or the legacy Pages Router:

```sh
# App Router (default)
solomonai-cli next my-app

# Pages Router
solomonai-cli next my-app -t pages

# Full-stack T3 Integration (Next.js, tRPC, Prisma, Tailwind)
solomonai-cli next my-app -t fullstack
```

These commands will scaffold a fully configured Next.js application with TypeScript, ESLint, Prettier, testing tools, and more. You’ll start coding on a solid foundation, complete with best practices already baked in.

### Generate a React Library

Building reusable UI components or utilities? Solomon CLI supports multiple configurations for React libraries, ensuring compatibility with various ecosystems:

```sh
# Rollup-based React library (default)
solomonai-cli lib my-lib

# React library with Vite
solomonai-cli lib my-components -t vite

# TypeScript utility library with tsup
solomonai-cli lib utils -t tsup
```

These libraries come ready with testing, linting, and a sensible folder structure. You can immediately focus on writing components or utilities rather than wrangling build scripts.

### Establish a Monorepo

Create a well-structured monorepo that scales with your organization’s growth. Solomon CLI sets up Turborepo, workspaces, shared tooling, and a streamlined developer experience:

```sh
# Production-grade Next.js monorepo
solomonai-cli monorepo my-project

# SaaS-focused monorepo with authentication, billing, and more
solomonai-cli monorepo my-saas -t saasfly

# Enterprise-oriented monorepo for large-scale applications
solomonai-cli monorepo my-enterprise -t enterprise
```

Monorepos generated by Solomon CLI come equipped with integrated testing, linting, and CI/CD workflows, ensuring every new package or application inside your workspace meets the same high standards.

### Add Components & Packages to Existing Projects

As your monorepo or project evolves, easily add new components, packages, and applications with consistent conventions:

```sh
# Generate a new TypeScript package
solomonai-cli generate package utils

# Generate a React package pre-configured with Storybook
solomonai-cli generate react-package ui

# Add a new Next.js application within a monorepo
solomonai-cli generate app admin
```

These commands ensure your new additions seamlessly integrate with your existing codebase, minimizing setup and configuration overhead.

## Advanced Configuration & Customization

While Solomon CLI aims for sensible defaults, you retain full control. Projects are scaffolding templates that you can freely modify. Want to swap out ESLint configs, change the testing framework, or integrate a new CI pipeline? All generated files are yours to adjust. Solomon CLI sets the stage, and you direct the play.

## Development, Testing & Building

For those contributing to Solomon CLI itself or experimenting locally:

```sh
# Start Solomon CLI in development mode
pnpm dev

# Build the CLI for production
pnpm build

# Create a changeset for versioning & releasing
pnpm changeset
```

By harnessing Changesets, you can manage versions, generate changelogs, and prepare for npm releases cleanly and efficiently.

## Automating Releases & Publishing

Solomon CLI leverages [changesets][changesets-url] for smart versioning and publishing workflows:

1. Create an **Automation**-enabled `NPM_TOKEN`. [Read the docs](https://docs.npmjs.com/creating-and-viewing-access-tokens)
2. Store this token as `NPM_TOKEN` in your GitHub Actions secrets. [Instructions](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)
3. Install the [changeset bot](https://github.com/apps/changeset-bot) to manage PRs and version bumps.
4. Enable GitHub Actions to create and approve PRs in your repository’s settings.

Once set up, releasing new versions and publishing packages to npm becomes a largely automated process, freeing up time for feature development and improvements.

## Contributing

We warmly welcome contributions to Solomon CLI. If you have an idea, encounter an issue, or want to improve existing functionality, please consider contributing:

1. Fork the repository to your GitHub account.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes following conventional commit standards:  
   `git commit -m 'feat: add amazing feature'`
4. Push your branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request and detail your changes and rationale.

Our community values code quality, maintainability, and transparency. Before submitting your PR, ensure your code passes all tests, linters, and follows the existing conventions.

## Additional Examples & Use Cases

### Next.js Applications

```sh
# Basic Next.js app with App Router
solomonai-cli next my-app

# Enterprise-grade Next.js setup with authentication, database integration, and robust testing
solomonai-cli next my-enterprise -t enterprise

# Professional admin dashboard with Chakra UI integration
solomonai-cli next my-dashboard -t horizonUI

# Full-stack T3 stack: Next.js, tRPC, Prisma, and Tailwind
solomonai-cli next my-saas -t fullstack
```

### React Libraries

```sh
# Simple React component library with Rollup
solomonai-cli lib my-components

# Zero-config TypeScript utility library with tsup
solomonai-cli lib utils -t tsup

# Production-grade TypeScript library with CI/CD, automated releases, Jest, and docs
solomonai-cli lib core -t typescript
```

### Monorepo Templates

```sh
# Next.js monorepo with Turborepo and shared configuration
solomonai-cli monorepo my-workspace

# Full SaaS starter with auth, payments, and team management
solomonai-cli monorepo my-saas -t saasfly

# Enterprise monorepo with AWS architecture and best practices
solomonai-cli monorepo my-enterprise -t saasBoilerplate

# Open-source SaaS template featuring Wasp for rapid iteration
solomonai-cli monorepo my-project -t openSaas
```

### Generating Components & Packages Within a Monorepo

```sh
# Create a new TypeScript package under packages/
solomonai-cli generate package logger

# Spin up a React package with Storybook support under packages/
solomonai-cli generate react-package ui

# Add a new Next.js application in apps/
solomonai-cli generate app admin
```

## Pro Tips

- Use the `-v` (verbose) flag when executing commands for detailed logs and insights during project creation.
- All templates are TypeScript-first, ensuring type safety from the get-go.
- Each generated project or package includes a well-integrated testing environment to promote quality and stability.
- Documentation and example configs are included in most templates, providing guidance on advanced configuration and customization.
- Run `--help` on any Solomon CLI command for a full breakdown of available options:

  ```sh
  solomonai-cli next --help
  solomonai-cli lib --help
  solomonai-cli monorepo --help
  solomonai-cli generate --help
  ```

---

**Embrace a simpler, more consistent development workflow.** With Solomon CLI, you’ll spend less time on configuration and tooling setup, and more time building the solutions that matter.

[typescript-url]: https://www.typescriptlang.org
[eslint-url]: https://eslint.org
[commitlint-url]: https://github.com/conventional-changelog/commitlint
[prettier-url]: https://prettier.io
[changesets-url]: https://github.com/changesets/changesets
[tsup-url]: https://tsup.egoist.sh
[vitest-url]: https://vitest.dev
