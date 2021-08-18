# Microservice
Learning Microservice from BOOK[manning-bootstrapping-microservices-docker-kubernetes-2021]


# How to start

## Before start
Add necessary into .env.sample

## Start
```bash
docker-compose --env .env.sample up -d
```


# docker-compose

## docker-compose up & down
```bash
docker-compose up --build -d
# up: The up command causes Docker Compose to boot our microservices application.
# If image is lacked, the up command contains build, otherwise, it only institate a container from image.
# --build: makes Docker Compose build each of our images before instantiating containers from these.
# -d: run in detached mode

docker-compose down
# stop services maintained by docker-compose.yml
```

# docker-compose ps
```bash
$ docker-compose.exe ps
     Name                    Command               State    Ports
-----------------------------------------------------------------
video-streaming   docker-entrypoint.sh /bin/ ...   Exit 0
```


# docker-compose --env-file
Set environmental variables from file when docker-compose up<br>
(https://docs.docker.com/compose/environment-variables/)
```bash
docker-compose --env .envfile up

#Print docker-compose.yml after env variables injection
docker-compose --env .envfile config

```


# 搬移紀錄
8/15 因為當初專案設計結構與課程目標有差異，沒考量構築多個 project，所以將原本Node.js搬移到 Project video-streaming

目前資料夾結構<br>
root
    - video-streaming
        - src
        - videos
        - Dockerfile
        - package.json
        - package-lock.json
        - README.md
    - docker-compose.yml
    - README.md