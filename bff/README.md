# Venomous Apps' BFF ( Backend for Frontend )

## 🚀 Local Setup

```shell
# start all servers
% cd venomous_apps
% npm install
% make setup


# develop bff
# way 1. within container
% make entry CONTAINER_NAME=bff         # docker exec -it bff bash
root@[container_id]:/app# ...
root@[container_id]:/app# exit

# way 2. stop/restart container
% make stop SERVICE_NAME=bff            # docker-compose -f ./docker-compose.dev.yml -p venomous_apps stop bff
% cd ./bff
% npm install && npm run start:dev
% cd ..
% make restart SERVICE_NAME=bff         # docker-compose -f ./docker-compose.dev.yml -p venomous_apps restart bff
```

## 📚 Tech Stacks

- [Node.js]() v18.18.0+
- [Express.js]() v4.21.1
- [TypeScript]() v5.6.3
- [@apollo/server]() v4.11.0

## 🛠 Commands

```shell
# run server
npm run start:[mode]

# build
npm run build

# check lint
npm run check-all
npm run check-eslint
npm run check-prettier
npm run check-packages

# format
npm run format-all
npm run eslint
npm run prettier

# others
npm run commit
```

## 📂 Project Structure

```shell
venomous_apps/
└── bff/
    ├── .cache/
    │
    ├── .env/
    │    ├── .development
    │    ├── .production
    │    └── ...
    │
    ├── src/
    │    ├── __mock__/
    │    │
    │    ├── apis/                              # restful apis
    │    │    ├── handlers/
    │    │    │    └── [handler_name]/
    │    │    │         └── ...
    │    │    └── routers/
    │    │         ├── router-[name].ts
    │    │         └── index.ts
    │    │
    │    ├── apollo/                            # graphql apis
    │    │    ├── graphql/
    │    │    │    ├── query.graphql
    │    │    │    ├── mutation.graphql
    │    │    │    ├── [graphql_type].graphql
    │    │    │    └── ...
    │    │    │
    │    │    ├── resolvers/
    │    │    │    ├── [resolver_name]/
    │    │    │    │     └── [graphql_type].ts
    │    │    │    └── index.ts
    │    │    │
    │    │    └── schemas/
    │    │         └── index.ts
    │    │
    │    ├── configs/
    │    │
    │    ├── utils/
    │    │    ├── constants/
    │    │    ├── helpers/
    │    │    └── ...
    │    │
    │    └── ...
    │
    ├── .Dockerfile.dev
    │
    ├── tsconfig.json
    ├── package.json
    │
    └── ...
```
