const express = require("express");
const http = require("http");
// const fs = require("fs");
const mongodb = require("mongodb");

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
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

function main() {
    return mongodb.MongoClient.connect(DBHOST).then(client => {
        const db = client.db(DBNAME);
        const videosCollection = db.collection("videos");

        app.get("/video", (req, res) => {
            const videoId = new mongodb.ObjectID(req.query.id);

            videosCollection
                .findOne({ _id: videoId })
                .then(videoRecord => {
                    const forwardRequest = http.request({
                            host: VIDEO_STORAGE_HOST,
                            port: VIDEO_STORAGE_PORT,
                            path: `/video?path=${videoRecord.videoPath}`,
                            method: "GET",
                            headers: req.headers,
                        },
                        (forwardRes) => {
                            res.writeHeader(forwardRes.statusCode, forwardRes.headers);
                            forwardRes.pipe(res);
                        }
                    );
                    req.pipe(forwardRequest);
                }).catch(err => {
                    console.error("Database query failed.");
                    console.error(err && err.stack || err);
                    res.sendStatus(500);
                })

        });
        app.listen(port, () => {
            console.log(`Microservice online.`);
        });
    });
}

main()
    .then(() => console.log("Microservice online."))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });