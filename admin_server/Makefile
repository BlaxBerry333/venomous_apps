.PHONY: setup_venv install start \
	create_lib_file check-format format


DEV_SERVER_PORT=8080


# create virtual environment
setup_venv:
	@python -m venv .venv
	@echo "virtual environment created."


# install packages
install:
	@pip install -r requirements.txt
	@echo "dependencies installed."


# django's run server
start:
	@python manage.py runserver ${DEV_SERVER_PORT}


# create requirements.txt
create_pkg_file: 
	@pip freeze > requirements.txt
	@echo "requirements.txt created successfully."


# black check
check-format:
	@black . --check
	@echo "black format check complete."


# black format
format:
	@black .
	@echo "black code formatting complete."
