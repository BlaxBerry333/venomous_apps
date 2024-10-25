.PHONY: setup stop-all clean-all stop restart entry


COMPOSE_FILE_PATH_DEV = docker-compose.dev.yml
PROJECT_NAME = venomous_apps
CONTAINER_NAME_ADMIN_CLIENT = admin_client
CONTAINER_NAME_ADMIN_SERVER = admin_server
CONTAINER_NAME_BFF = bff
CONTAINER_NAME_NOTES_APP = notes_app 


# setup all containers
setup:
	@docker-compose \
		-f ${COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		up -d


# stop then remove all containers
stop-all:
	@docker-compose \
		-f ${COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		down


# stop then remove all containers、volumes、images
clean-all:
	@docker-compose \
		-f ${COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		down -v
	@for service in \
		${CONTAINER_NAME_ADMIN_CLIENT} \
		${CONTAINER_NAME_ADMIN_SERVER} \
		${CONTAINER_NAME_BFF} \
		${CONTAINER_NAME_NOTES_APP}; do \
		if docker images -q ${PROJECT_NAME}_$$service; then \
			docker rmi ${PROJECT_NAME}_$$service; \
		fi \
	done


# stop a specific container
stop: 
	@docker-compose \
		-f ${COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		stop ${CONTAINER_NAME}


# restart a specific container
restart: 
	@docker-compose \
		-f ${COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		restart ${CONTAINER_NAME}


# entry a running specific container
entry:
	@docker exec -it ${CONTAINER_NAME} bash     
