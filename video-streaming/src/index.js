const express = require('express')
const fs = require("fs")
const app = express()

if(!process.env.PORT){
    throw new Error("Please specift the prot number for the HTTP server with the environment variable PORT. ");
}

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get("/video",(req,res)=>{
    const path = "./videos/SampleVideo_1280x720_1mb.mp4";
    fs.stat(path,(err, stats)=>{
        if(err){
            console.error("Error occurred");
            console.log(err)
            res.sendStatus(500);
            return;
        }
        res.writeHead(200,{
            "Content-Length": stats.size,
            "Content-Type": "video/mp4"
        })
        fs.createReadStream(path).pipe(res);
    })
    
})


app.listen(port, () => {
  console.log(`HelloWorld listening at http://<docker_host>:${port}`)
  console.log(`Example image listening at http://<docker_host>:${port}/videos`)
})