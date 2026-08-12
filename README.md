# react-vitejs-mfe-template

Boilerplate for a single **remote** microfrontend app, built on Vite and
`@module-federation/vite`. This repo does not contain a host — it produces a
standalone-runnable app during local dev, and a set of `exposes` entries
(`./App`, `./routes`, `./ExampleWidget`) that a future host app can consume.

## Before you use this template

The federation remote name is currently set to the placeholder
`example-remote-app`, in **two** places:

- `vite.config.ts` — `federation({ name: 'example-remote-app', ... })`
- `package.json` — `"name": "example-remote-app"`

Rename both, consistently, to your real remote's name before shipping this
anywhere. Nothing else in the codebase needs to change to pick up the new
name.

## Setup

Env files are gitignored — copy the committed `.example` templates before
running anything:

```sh
cp .env.development.example .env.development
cp .env.staging.example .env.staging
cp .env.production.example .env.production
npm install
```

## Commands

| Command                    | Purpose                                                             |
| -------------------------- | ------------------------------------------------------------------- |
| `npm run dev`              | Run the app standalone with its own router, query client, and theme |
| `npm run build:staging`    | Build with `.env.staging` values, output to `dist/staging`          |
| `npm run build:production` | Build with `.env.production` values, output to `dist/production`    |
| `npm run preview`          | Preview a production build locally                                  |
| `npm run lint`             | Run ESLint                                                          |
| `npm run format`           | Format the repo with Prettier                                       |
| `npm run format:check`     | Check formatting without writing changes                            |

## Environment variables

Only `VITE_`-prefixed variables are exposed to client code. `.env.development`,
`.env.staging`, and `.env.production` are gitignored — only their `.example`
counterparts are committed (see Setup above). Each mode file is fully
self-contained: there is no shared base `.env` layer, so a value needed in
more than one environment is simply duplicated across the mode files that
need it, rather than factored out. `.env.development` exists because
`npm run dev` runs Vite's default `development` mode, which neither
`.env.staging` nor `.env.production` covers — it's not a third deployment
environment, just the local-dev default. Required variables are validated
at build time in `vite.config.ts` — see `env.schema.ts`. A missing or
invalid required variable fails the build immediately rather than shipping
a broken bundle.
