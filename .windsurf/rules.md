# Project Rules

## Stack

- **Frontend**: React + TypeScript, Ant Design component library, TanStack Router, inside an NX monorepo.
- **Backend**: .NET 8 Web API.

## TypeScript

- Always enable **strict mode** (`"strict": true` in `tsconfig.json`).
- **Never use `any`**. Use `unknown`, proper generics, or explicit types instead.
- Use **functional components only** — no class components.
- Prefer explicit return types on exported functions and components.

## Security

- **Never commit secrets**, API keys, tokens, passwords, or any sensitive credentials to the repository.
- All configuration values (connection strings, API URLs, secrets) must be read from **environment variables**.
- Use `.env.local` or similar files for local overrides and ensure they are listed in `.gitignore`.

## NX Monorepo

- Respect the project boundaries enforced by NX (`@nx/enforce-module-boundaries`).
- Run affected commands (`nx affected`) rather than building/testing everything when possible.
- Keep library scope tags (`tags`) up to date in `project.json`.
- **Always use NX generators** (`nx generate`) to scaffold libraries, applications, components, and config files — never create these by hand.
- **Pin all dependency versions** exactly (no `^` or `~` prefixes) in `package.json`. Use `npm install --save-exact` / `npm install --save-dev --save-exact` when adding packages.
- Keep the NX version and all `@nx/*` plugin versions in sync; update them together via `nx migrate`.

## .NET Backend

- Follow RESTful conventions for controller routes and HTTP method usage.
- Read all configuration from `appsettings.json` / environment variables via `IConfiguration` — never hardcode values.
- Use dependency injection for services; avoid static state.

## General

- Keep commits small, focused, and descriptive.
- Write tests alongside new features; do not leave untested public API surface.
- Prefer explicit over implicit — avoid magic strings; use constants or enums.
