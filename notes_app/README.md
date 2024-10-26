# Venomous Apps's Notes App

## 🚀 Local Setup

```shell
# start all servers
% cd venomous_apps
% npm install
% make dev


# develop notes_app
# way 1. within container
% make entry CONTAINER_NAME=notes_app       # docker exec -it notes_app bash
root@[container_id]:/app# ...
root@[container_id]:/app# exit

# way 2. stop/restart container
% make stop SERVICE_NAME=notes_app          # docker-compose -f ./docker-compose.dev.yml -p venomous_apps stop notes_app
% cd ./notes_app
% npm install && npm run start:dev
% cd ..
% make restart SERVICE_NAME=notes_app       # docker-compose -f ./docker-compose.dev.yml -p venomous_apps restart notes_app
```

## 📚 Tech Stacks

- main
  - [Nuxt]() v3.13.2
  - [Vue]() v3.5.10
  - [MongoDB]() ( [Mongoose]() v8.7.2 )
- others
  - [Vuetify]() v3.7.3
  - [@nuxtjs/i18n]()

## 🛠 Commands

```shell
# run server
npm run start:[mode] [--force]

# build
npm run build:[mode]

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
└── notes_app/
    ├── .nuxt/
    │
    ├── public/
    │
    ├── assets/
    │   ├── images/
    │   └── ...
    │
    ├── components/
    │   ├── common/
    │   ├── custom/
    │   └── ...
    │
    ├── layouts/
    │
    ├── pages/
    │   ├── [route_name]/
    │   │   ├── [sub_route_name].vue
    │   │   └── index.vue
    │   ├── index.vue
    │   └── ...
    │
    ├── server
    │   ├── api/
    │   ├── middleware/
    │   ├── models/
    │   ├── plugins/
    │   │
    │   ├── tsconfig.json
    │   └── ...
    │
    ├── plugins/
    │   └── ...
    │
    ├── locals/
    │   ├── [i18n_lang_code].json
    │   └── ...
    │
    ├── utils/
    │   └── ...
    │
    ├── Dockerfile.dev
    │
    ├── .env.[env_name]
    ├── .depcheckrc
    ├── .prettierrc
    ├── package.json
    ├── tsconfig.json
    ├── eslint.config.mjs
    ├── nuxt.config.ts
    │
    └── ...
```

## 🤔 Questions

...
