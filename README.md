Basic setup of the project is forked from: https://dev.to/vguleaev/dockerize-a-react-app-with-node-js-backend-connected-to-mongodb-10ai

## Available Scripts
In the project directory, you can run:

####`docker-compose up` or `docker-compose up --build`
for start up of fully dockerized production like environment.

#### `docker-compose -f docker-compose.dev.yml up`
starts development environment. This is always reloading source codes after they change.

#### `docker-compose -f docker-compose.dev.yml down`
to shut `down al ldevelopment containers

#### `docker-compose -f docker-compose.dev.yml run --rm api_install`
re-installs backend Node JS dependencies

#### `docker-compose -f docker-compose.dev.yml run --rm ui_install`
re-installs frontend React dependencies


##Pre-reqiusities for development environment
run both api and ui re-install before first run of dev docker

Install [Docker](https://www.docker.com/) and [MongoDB](https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.10-signed.msi/download) which needs to be runnig on localhost and default port 27017


### Docker commands 
`docker exec -it <container name> /bin/bash`
to open a bash within the container - useful for inspection
