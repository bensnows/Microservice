const express = require("express");
const http = require("http");
const fs = require("fs");
const app = express();

if (!process.env.PORT) {
  throw new Error(
    "Please specift the port number for the HTTP server with the environment variable PORT. "
  );
}

if (!process.env.VIDEO_STORAGE_HOST) {
  throw new Error("Video storage host is lacked");
}

if (!process.env.VIDEO_STORAGE_PORT || isNaN(process.env.VIDEO_STORAGE_PORT)) {
  throw new Error("Video storage host is lacked");
}

const port = process.env.PORT;
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/video", (req, res) => {
  const fileName = "SampleVideo_1280x720_1mb.mp4";
  const forwardRequest = http.request(
    {
      host: VIDEO_STORAGE_HOST,
      port: VIDEO_STORAGE_PORT,
      path: `/video?path=${fileName}`,
      method: "GET",
      headers: req.headers,
    },
    (forwardRes) => {
      res.writeHeader(forwardRes.statusCode, forwardRes.headers);
      forwardRes.pipe(res);
    }
  );
  req.pipe(forwardRequest);
});

app.listen(port, () => {
  console.log(`HelloWorld listening at http://<docker_host>:${port}`);
  console.log(`Example image listening at http://<docker_host>:${port}/videos`);
});
