# Venomous Apps' Admin Server

## 🚀 Local Setup

```shell
# start all servers
% cd venomous_apps
% npm install
% make setup
% make entry CONTAINER_NAME=admin_server         # docker exec -it admin_server bash


# create admin superuser
% make entry CONTAINER_NAME=admin_server 
root@[container_id]:/app# \
    export DJANGO_SUPERUSER_USERNAME=admin && \
    export DJANGO_SUPERUSER_EMAIL=admin@example.com && \
    export DJANGO_SUPERUSER_PASSWORD=admin && \
    python manage.py createsuperuser --noinput
root@[container_id]:/app# exit


# develop admin_server
# way 1. within container
% make entry CONTAINER_NAME=admin_server         # docker exec -it admin_server bash 
root@[container_id]:/app# ...
root@[container_id]:/app# exit

# way 2. stop/restart container
% make stop SERVICE_NAME=admin_server            # docker-compose -f ./docker-compose.dev.yml -p venomous_apps stop admin_server
% cd ./admin_server
% make setup_venv                                # python -m venv .venv
% source .venv/bin/activate
(.venv) % make install && make start
(.venv) % deactivate
% cd ..
% make restart SERVICE_NAME=admin_server         # docker-compose -f ./docker-compose.dev.yml -p venomous_apps restart admin_server
```

## 📚 Tech Stacks

- [Python]() v3.10.0
- [Django]() v4.2.16
- [django-rest-framework]() v3.15.2
- [psycopg2-binary]() v2.9.9

## 🛠 Commands

```shell
# install packages
(.venv) % make install                                                          # pip install -r requirements.txt
(.venv) % make create_pkg_file                                                  # pip freeze > requirements.txt

# run server
(.venv) % make start                                                            # python manage.py runserver 8080
(.venv) % python manage.py createsuperuser

# migration
(.venv) % python manage.py makemigrations
(.venv) % python manage.py makemigrations [app_name] --name [migration_name]
(.venv) % python manage.py migrate
(.venv) % python manage.py migrate [migration_name]

# admin superuser
(.venv) % \
    export DJANGO_SUPERUSER_USERNAME=[username] && \
    export DJANGO_SUPERUSER_EMAIL=[email@example.com] && \
    export DJANGO_SUPERUSER_PASSWORD=[password] && \
    python manage.py createsuperuser --noinput

# others
(.venv) % make check-format         # black . --check
(.venv) % make format               # black .
```

## 📂 Project Structure

```shell
venomous_apps/
└── admin_server/
    ├── .venv/
    │
    ├── configs/                # main application
    │    ├── settings.py
    │    ├── urls.py
    │    ├── asgi.py
    │    ├── wsgi.py
    │    └── ...
    │
    ├── scenario/               # scenario apis' application
    │    ├── migrations/
    │    ├── models/
    │    ├── serializers/
    │    ├── views/
    │    ├── admin.py
    │    ├── urls.py
    │    └── ...
    │
    ├── manage.py
    │
    ├── .Dockerfile.dev
    │
    ├── requirements.txt
    ├── pyproject.toml
    ├── Makefile
    │
    └── ...
```
