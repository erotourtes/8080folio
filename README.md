# 8080/folio

## Get started

```bash
# install pnpm  (https://pnpm.io/installation)
npm install -g pnpm

# install dependencies
pnpm install
```

## Emulators

You can run your app with emulators.  
To configure which service will be emulated, view [.example.env.development](./.example.env.development)

> [!WARNING]
> If you emulate Auth service (by defining `PUBLIC_FIREBASE_AUTH_EMULATOR_HOST`)
> you won't be able to fetch the data from the Github, thus you need to disable it.

```bash
docker compose up
```

You can view emulated firebase console ui on http://localhost:4000/

## Development Server

Place `.env` and `.env.development` to the root folder of the project, you can find
examples of them in the [.example.env](./.example.env) and [.example.development.env](./.example.env.development).

```bash
pnpm dev
```
