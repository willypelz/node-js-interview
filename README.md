# Node test application.
Application that has an API Client + Server using Node using the REST architecture.
1.  code architecture implemented repository design pattern,
2.  database: MongoDB
3.  API: rest
4.  Test-driven development(TDD): mocha
5.  Request validation: Joi
6.  project dockerized;
7.  docker image pushed to the GitLab container registry automatically which can be found here: 
``registry.gitlab.com/codelittinc/node-rest-interview-project-asefon-michael/test-backend:latest``

# Getting started

There are two ways to set the project up and running the first one is the manual project setup 
and the other one is the docker setup.

## Installation A

Clone the repository

    git clone https://gitlab.com/codelittinc/node-rest-interview-project-asefon-michael.git

Switch to the repo folder

    cd node-rest-interview-project-asefon-michael
    
Install dependencies
    
    npm install

Copy config file 

    cp .env.example .env
    
----------

## Database
    
The project implements No-sql database(mongoDB)


----------

##### mongoDB

----------
    
Set mongo database settings in .env

    port=3000,
    env="development",
    NODE_ENV="development"
    mongoURI="mongodb://localhost:27017/members_management"
    AMQP_URL='amqp://guest:guest@localhost'
    mqServerUrl='amqp://guest:guest@localhost'

  
    
Start local mysql server and create new database 'members_management'

On application start, tables for all entities will be created.

## NPM scripts

- `npm start` - Start application 
- `npm run test` - run Jest test runner  

----------


## Start application

- `npm start`
- Test api with `http://localhost:3000` in your favourite browser

----------
 
 
## Installation B

### Requirement 
 - Docker
 - RAM (^4gb)
 
The second way of setting the project which is running it on docker

Clone the repository

    git clone https://gitlab.com/codelittinc/node-rest-interview-project-asefon-michael.git

Switch to the repo folder

    cd node-rest-interview-project-asefon-michael
    
### building and running the project

`` docker-compose up --build ``

this build and run the project together in docker container.

     1. members_management_backend
     2. members_management_database

## Start application

- `npm start`
- Test api with `http://localhost:3000` in your favourite browser
 

## API Documentation/access ( API docs)

This application documentation can be access in the apidoc folder generated after running the code below

`` npm run docs ``

`` apidoc/index.html``
----------
