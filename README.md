# Microservice
Learning Microservice from BOOK[manning-bootstrapping-microservices-docker-kubernetes-2021]


Video samples are from https://sample-videos.com

API: 
http://localhost:3000/
http://localhost:3000/video


Before start
add video folder in previous folder and update the code in index.js
```
const path = "../video/SampleVideo_1280x720_1mb.mp4";
```


How to start this project

in bash
```
export PORT=3000
npm install
npm run start:dev
```



note
1. add develop-needed dependences
```
npm install --save-dev <package>
```

2. add dependence (in dev & prod)
```
npm install --save <package>
```

3. install prod-needed dependences
```
npm install --only=production
```