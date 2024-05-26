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
> You won't be able to fetch the data from Github, thus you need to disable it, by setting
> `PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=""` to an empty string

```bash
docker compose up
```

You can view the emulated firebase console ui on http://localhost:4000/

## Development Server

Place `.env` and `.env.development` in the root folder of the project, you can find
examples of them in the [.example.env](./.example.env) and [.example.development.env](./.example.env.development).

```bash
pnpm dev
```
