const helpers = require('./helpers');
const inspect = helpers.inspect;

const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

let docClient = new AWS.DynamoDB.DocumentClient();

/** Saves app details into a dynamoDB instance */
async function saveAppDetailsIntoDB(appDetails, tableName) {
    appDetails.id = uuid.v4().toString();

    let params = {
        TableName: tableName,
        Item: appDetails
    };

    await new Promise((resolve, reject) => {
        docClient.put(params, function(err, data) {
            if(err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    });
}

module.exports = { saveAppDetailsIntoDB }