const express = require("express");
const azure = require("azure-storage");

const app = express();


if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.STORAGE_ACCOUNT_NAME) {
    throw new Error("Please specify the name of an Azure storage account in environment variable STORAGE_ACCOUNT_NAME.");
}

if (!process.env.STORAGE_ACCESS_KEY) {
    throw new Error("Please specify the access key to an Azure storage account in environment variable STORAGE_ACCESS_KEY.");
}

const PORT = process.env.PORT;
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const STORAGE_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY;


function createBolbService() {
    const blobService = azure.createBlobService(
        STORAGE_ACCOUNT_NAME,
        STORAGE_ACCESS_KEY
    );
    return blobService;
}

app.get("/video", (req, res) => {
    const videoPath = req.query.path;
    const blobService = createBolbService();

    const containerName = "videos";
    blobService.getBlobProperties(containerName, videoPath, (err, properties) => {
        if (err) {
            console.error("Error occurred when get azure-blob properties");
            console.log(err);
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": properties.contentLength,
            "Content-Type": "video/mp4",
        });

        //send out stream from azure blob to res;
        blobService.getBlobToStream(containerName, videoPath, res, (err) => {
            if (err) {
                console.error("Error occurred when send blob to stream");
                console.log(err)
                res.sendStatus(500);
                return;
            }
        });
    });
});


app.listen(PORT, () => {
    console.log("Microservice is online")
})