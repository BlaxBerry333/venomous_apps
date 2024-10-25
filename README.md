# Venomous Apps

## 🔗 Related Links

|            App Name             | Topics                                                        |      Description       |
| :-----------------------------: | ------------------------------------------------------------- | :--------------------: |
| [Admin Client](./admin_client/) | [Vite]()、[React]()、[TypeScript]()<br/>[Docker]()            |          SPA           |
| [Admin Server](./admin_server/) | [Django]()、[Python]()、[DRF]()<br/>[Docker]()                |        REST API        |
|         Admin Server DB         | [PostgreSQL]()<br/>[Docker]()                                 |           DB           |
|          [BFF](./bff/)          | [Node.js]()、[Express.js]()<br/>[GraphQL]()<br/>[Docker]()    | REST API + Graphql API |
|    [Notes App](./notes_app/)    | [Nuxt.js]()<br/>[MongoDB]()、[MongoDB Atlas]()<br/>[Docker]() |     SSR + REST API     |
|     [Chat API](./chat_api/)     | [Gin]()、[Golang]()<br/>[Docker]()                            |       WebSocket        |

## 🚀 Local Setup

```shell
% cd venomous_apps
% npm install
% make setup
```

## 🛠 Commands

```shell
# server
% make setup                        # setup all containers
% make stop-all                     # stop then remove all containers
% make clean-all                    # stop then remove all containers、volumes、images
% make stop CONTAINER_NAME=[?]      # stop a specific container             ( % make stop CONTAINER_NAME=notes_app )
% make restart CONTAINER_NAME=[?]   # restart a specific container          ( % make restart CONTAINER_NAME=notes_app )
% make entry CONTAINER_NAME=[?]     # entry a running specific container    ( % make entry CONTAINER_NAME=notes_app )


# others
% npm run commit                    # Using Interactive Options to Replace Standard "git commit" Command
```

## 📂 Project Structure

```shell
venomous_apps/
├── .husky/
├── node_modules/
├── package.json
├── commitlint.config.mjs
├── docker-compose.dev.yml
├── Makefile
│
├── admin_client/               # Admin Client
│   ├── Dockerfile.dev
│   └── ...
│
├── admin_server/               # Admin Server ( Scenario etc. )
│   ├── Dockerfile.dev
│   └── ...
│
├── bff/                        # BFF ( Backend for Frontend )
│   ├── Dockerfile.dev
│   └── ...
│
├── notes_app/                  # Notes App
│   ├── Dockerfile.dev
│   └── ...
│
├── chat_api/                   # Chat API
│   ├── Dockerfile.dev
│   └── ...
│
└── ...
```
