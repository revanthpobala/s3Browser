/**
 * Created by Revanth on 2/21/2017.
 */
/**
 * Schema to store the information related to the files uploaded.
 */

var mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
    local:{
        fileName: String,
        fileLocation: String,
        fileExtension: String,
        fileAddedDate: Date,
        fileAddedByUser: String,
        downloadTimes: Number,
        isActive : Boolean,
        fileHash : String,
        bucketName: String
    }
})

module.exports = mongoose.model('FileSchema', fileSchema);