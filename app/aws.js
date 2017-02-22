/**
 * Created by Revanth on 2/13/2017.
 */

//TODO Methods for deleting files.

var aws = require('aws-sdk');
var fs = require('fs');
aws.config.loadFromPath('../Passport/config/awsConfig.json');
s3 = new aws.S3();

/**
 * Method to create the bucket in s3
 *
 * @param bucketName
 */
function createBucket(bucketName) {
    s3.createBucket({Bucket: bucketName}, function () {
        console.log("Bucket created successfully")
    })
}

/**
 * Upload file method to upload the file(s) to the bucket.
 *
 * @param remoteFilename
 * @param fileName
 * @param bucketName
 */
function uploadFile(remoteFilename, fileName, bucketName) {
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

/**
 * Helper method to get the file list
 *
 * @param path
 * @returns {Array}
 */
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

/**
 * Helper method to get the content type of the file.
 *
 * @param fileName
 * @returns {string}
 */
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

module.exports.createBucket = createBucket;
module.exports.uploadFile = uploadFile;
module.exports.getFileList = getFileList;