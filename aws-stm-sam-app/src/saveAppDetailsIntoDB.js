const helpers = require('./helpers');
const inspect = helpers.inspect;

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

/** Saves app details into a dynamoDB instance */
function saveAppDetailsIntoDB(appDetails) {
    //Do so connection to dynamoDB
    
    return;
}

module.exports = { saveAppDetailsIntoDB }