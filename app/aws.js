/**
 * Created by Revanth on 2/13/2017.
 */

var aws = require('aws-sdk');
var fs = require('fs');
aws.config.loadFromPath('./config/awsConfig.json');
s3 = new aws().S3;

var bucketName = 'test-bucket';

function createBucket(bucketName) {
    s3.createBucket({Bucket: bucketName}, function () {
        console.log("Bucket created successfully")
    })
}

function uploadFile(remoteFilename, fileName) {
    var fileBuffer = fs.readFileSync(fileName);
    var metaData = getContentTypeByFile(fileName);

    s3.putObject({
        ACL: 'public-read',
        Bucket: bucketName,
        Key: remoteFilename,
        Body: fileBuffer,
        ContentType: metaData
    }, function (error, response) {
        console.log('uploaded file[' + fileName + '] to [' + remoteFilename + '] as [' + metaData + ']');
    });
}

function getFileList(path) {
    var i, fileInfo, filesFound;
    var fileList = [];
    filesFound = fs.readdirSync(path);
    for (i = 0; i < filesFound.length; i++) {
        fileInfo = fs.lstatSync(path + filesFound[i]);
        if (fileInfo.isFile()) fileList.push(filesFound[i]);
    }
    return fileList;
}

function getContentTypeByFile(fileName) {
    var rc = 'application/octet-stream';
    var fn = fileName.toLowerCase();

    if (fn.indexOf('.html') >= 0) rc = 'text/html';
    else if (fn.indexOf('.css') >= 0) rc = 'text/css';
    else if (fn.indexOf('.json') >= 0) rc = 'application/json';
    else if (fn.indexOf('.js') >= 0) rc = 'application/x-javascript';
    else if (fn.indexOf('.png') >= 0) rc = 'image/png';
    else if (fn.indexOf('.jpg') >= 0) rc = 'image/jpg';
    return rc;
}