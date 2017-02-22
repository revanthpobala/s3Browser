/**
 * Created by Revanth on 2/21/2017.
 */

/**
 * Fill the information related to the profile landing page.
 */
var amazonServices = require('./aws.js');
var fileInfo = require('./models/fileInformation.js');

module.exports = function () {

    userProfile : function createbucket (req, res, done) {
        var bucketName = req.body.bucketName;
        amazonServices.createBucket(bucketName);

    }
};



