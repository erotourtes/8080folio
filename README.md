# 8080/folio

## [Design Document](https://docs.google.com/document/d/1ALqQY8AvnSiKsYHVTxN4POlIvJdv6yyh-zBOKLeutRM/edit#heading=h.k57aj13un2t)

## Demonstration

For a quick overview and demonstration of the project, watch the video



https://github.com/erotourtes/8080folio/assets/117169759/66d77c9b-c547-4d19-9946-f45a60b17c29



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

## Features

- **Containerized Application**: Easy setup and deployment using Docker.
- **GitHub Authentication**: Securely log in using your GitHub account.
- **Dynamic Portfolio Generation**: Automatically create a portfolio page with your GitHub data.
- **Modern UI**: A sleek and responsive user interface built with SvelteKit.
- **Real-time Data**: Fetches the latest data from your GitHub profile.

## Tech Stack

- **Frontend**: Svelte
- **Backend**: Firebase (Authentication and Firestore), SvelteKit
- **Programming Language**: TypeScript
- **Containerization**: Docker


