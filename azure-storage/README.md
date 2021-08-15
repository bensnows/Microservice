
# Documentation for azure-microservice

Package Azure-storage is used to retrieve blobs in azure account.

Details of azure-storage package
https://www.npmjs.com/package/azure-storage



# Before start

Hava a azure storage account and get accountName and accessKey.
Generate folder name is video, put the test blob image inside, under the account in previous step.
In test situation, SampleVideo_1280x720_1mb.mp4 is uploaded into video folder.


## Start in development mode
environmentVariables:
```bash
export PORT=3000
export STORAGE_ACCOUNT_NAME=`<azureAccountName>`
export STORAGE_ACCESS_KEY=`<azureAccessKey>`

npm install
npm run `start:dev`
```
Query string: http://localhost:3000/video?path=SampleVideo_1280x720_1mb.mp4;