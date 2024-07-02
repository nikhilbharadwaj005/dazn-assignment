# Nodejs Movie Service

This microservice contains CRUD endpoints about movies data. This service has signIn and signUp endpoints and RBAC with admin as role.

## Created Endpoints

- `GET /movies`: List all the movies in the lobby
- `GET /search?q={query}`: Search for a movie by title or genre - Contains pagination as well
- `POST /movies`: Add a new movie to the lobby (requires "admin" role)
- `PUT /movies/:id`: Update an existing movie's information (title, genre, rating, or streaming link)
  (requires "admin" role)
- `DELETE /movies/:id`: Delete a movie from the lobby (requires "admin" role)

# Before starting the service

You need the env variable which contains credentials of data source.

- Create a file name `deploy.sh` on the package.json level
- copy, paste the below values in that file

```
#!/bin/bash

export APP_VERSION="1.0.0"

export BODY_LIMIT='50mb'
export PARAMETER_LIMIT='1000'
export PORT='8000'
export CORS_ORIGIN='*'
export CORS_METHODS='GET,PUT,PATCH,POST,DELETE'

export MONGO_DBNAME='daznmovies'
export CONNECTION_URI='mongodb+srv://daznuser:gngmJRCjI4lPym5U@cluster0.ihjmxbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export REDIS_HOST='redis-18290.c1.us-east1-2.gce.redns.redis-cloud.com'
export REDIS_PORT='18290'
export REDIS_JWT_EXPIRY='6000'
export REDIS_USERNAME='default'
export REDIS_PWD='eMj6u6EQnxwVYVlgNCOG5O9dACwYckwV'


export JWT_SECRET='ncjkalsdnclancklajn'
```

# NOTE:

- change the permission of the above file. Make it executable using the below command
  `chmod 775 ./deploy.sh`
- The env variables are not supposed to be uploaded to git but these are uploaded for the demo purpose of DAZN

# How to start this service

- Run below command to install

```
npm install
```

- Run below command to start

```
npm start
```

- Run below command to perform test

```
npm test
```

#Documentation

Postman Link: https://documenter.getpostman.com/view/15180934/2sA3dvkCrA
