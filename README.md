# Microservice
Learning Microservice from BOOK[manning-bootstrapping-microservices-docker-kubernetes-2021]

Tutorial code sample https://github.com/bootstrapping-microservices<br/>
Video samples are from https://sample-videos.com

# API: 
http://localhost:3000/<br/>
http://localhost:3000/video<br/>


# Before start
add video folder in project-root folder and update the name in ./src/index.js
```javascript
const path = "./videos/SampleVideo_1280x720_1mb.mp4";
```


# How to start this project
## Run Node.js in bash
```bash
export PORT=3000
npm install
npm run start:dev
```

## Run Node.js in docker
Move to project folder
```bash
docker build -t video-streaming --file Dockerfile .
docker image list video-streaming:latest --format "{{.ID}}"
docker run -d -p 3000:3000 --env PORT=3000 $(docker image list video-streaming:latest --format "{{.ID}}")
```

# Notes
## Node.js Note


1. add dependence (both in dev & prod)
```bash
npm install --save <package>
```

2. add develop-only dependences
```bash
npm install --save-dev <package>
```

3. install production-necessary dependences
```
npm install --only=production
```

4. Node.js 以 npm start 作為 workingDir，project內的路徑皆以 workingDir 為相對路徑判定


## Docker Note
1. Docker build image
* docker build `-t <repoName> --file <DockerfileName> <projectFolder>`
```bash
docker build -t video-streaming --file Dockerfile .
# -t tag name<br/>
# --file dockerfileName<br/>
# `.`  point to project directory, also indicate the directory for docker to copy file
```


2. Docker list images & remove image(details: https://docs.docker.com/engine/reference/commandline/images/)
* docker image list
* docker image list `<repository>:<tag>`
* docker rmi <imageId>
```bash
$ docker image list
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
video-streaming     latest              50bcc5820697        11 minutes ago      92.7MB
<none>              <none>              b7a532f28c6e        About an hour ago   91.7MB
node                12.18.1-alpine      06a4a7b5263d        14 months ago       89.3MB

----------------------------------------------------------------------------------------------
$ docker image list video-streaming:latest
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
video-streaming     latest              50bcc5820697        19 minutes ago      92.7MB

----------------------------------------------------------------------------------------------
$ docker image list video-streaming:latest --format "{{.ID}}"
50bcc5820697

$ docker rmi <imageId> //successfully when image is not used by container
```

3. Docker run image
* docker run -d -p `<os port>:<container port> <containerId> --env varName=value`
```bash
$ docker run -d -p 3000:3000 50bcc
----------------------------------------------
$ docker run -d -p 3000:3000 --env PORT=3000 $(docker image list video-streaming:latest --format "{{.ID}}")
fb9eebfb216600ee0e6e8de54500f9fba5bd23855ad78231ddb6e92571432d79
# -d daemon
# -p `<os port>:<container port>`
# --env environment variables(example: instead of `export PORT=3000` in bash)
```



4. Get Docker containers && delete containers
* docker ps -a
* docker rm -f `<containerId>`
```bash
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
fb9eebfb2166        50bcc5820697        "docker-entrypoint.s…"   46 minutes ago      Up 46 minutes       0.0.0.0:3000->3000/tcp   intelligent_leavitt

----------------------------------------------------------------------------------------------
docker rm -f fb
fb
```

5. Get Docker logs
* docker logs `<containerID>`
```bash
$ docker logs fb9e

> microservice@1.0.0 start /usr/src/app
> node ./src/index.js

Example app listening at http://localhost:3000
```





# Note from Node.js to Docker
1. 程式位置更動
index.js -> ./src/index.js
../video -> ./video

2. 程式引用結構更動(與程式啟動位置有關)<br/>
In index.js<br>
<del>const path = "../videos/SampleVideo_1280x720_1mb.mp4";</del><br/>
const path = "./videos/SampleVideo_1280x720_1mb.mp4";

3. Dockerfile 
```Dockerfile
FROM node:12.18.1-alpine  //imagebase

# point working dir in container
WORKDIR /usr/src/app  

# copy and install production-needed dependences
COPY package*.json ./    
RUN npm install --only=production

# copy source codes and materials
COPY ./src ./src
COPY ./videos ./videos

# start run in /usr/src/app folder
CMD npm start
```
