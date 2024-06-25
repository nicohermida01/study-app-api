![alt text](./study_logo.png)

# Introduction

Welcome to Study documentation!
Here you will find all about how our architecture works.

# Technologies

This applications has the following main technologies:

- NestJS
- TypeScript
- MongoDb

# Required tools

We use **docker** and **docker compose** for read the .yaml manifiests and start up the containers.

# How to start

> **IMPORTANT**: keep in min this is only a piece of all the Study Infraestrcuture. First go to [devtools](https://github.com/nicohermida01/study-dev-tools) and following the instructions there.

1. Clone the repository

```
git clone https://github.com/nicohermida01/study-app-api.git

cd study-app-front
```

2. Copy the env file

```
cp ./.env.example ./.env
```

3. Start up the container

```
docker compose up -d
```
