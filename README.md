# Venomous Apps

## 🔗 Related Links

|                   App Name                   |                                                                                                                |         Topic          |  Port   |
| :------------------------------------------: | -------------------------------------------------------------------------------------------------------------- | :--------------------: | :-----: |
|       [Admin Client](./admin_client/)        | [![My Skills](https://skillicons.dev/icons?i=docker,vite,react,apollo&perline=4)](https://skillicons.dev)      |          SPA           | `3000`  |
| [Admin Server](./admin_server/) ( Scenario ) | [![My Skills](https://skillicons.dev/icons?i=docker,django&perline=4)](https://skillicons.dev)                 |        REST API        | `8080`  |
|               Admin Server DB                | [![My Skills](https://skillicons.dev/icons?i=docker,postgresql&perline=4)](https://skillicons.dev)             |           DB           | `5432`  |
|                [BFF](./bff/)                 | [![My Skills](https://skillicons.dev/icons?i=docker,nodejs,express,graphql&perline=4)](https://skillicons.dev) | REST API + Graphql API | `9000`  |
|          [Notes App](./notes_app/)           | [![My Skills](https://skillicons.dev/icons?i=docker,nuxt,vuetify&perline=4)](https://skillicons.dev)           |     SSR + REST API     | `3600`  |
|                 Notes App DB                 | [![My Skills](https://skillicons.dev/icons?i=docker,mongodb&perline=4)](https://skillicons.dev)                |           DB           | `27017` |
|           [Chat API](./chat_api/)            | [![My Skills](https://skillicons.dev/icons?i=docker,go,&perline=4)](https://skillicons.dev)                    |       WebSocket        | `3700`  |
|         [Report API](./report_api/)          | [![My Skills](https://skillicons.dev/icons?i=docker,rails,firebase&perline=4)](https://skillicons.dev)         |        REST API        | `3800`  |

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
├── report_api/                 # Report API
│   ├── Dockerfile.dev
│   └── ...
│
└── ...
```
