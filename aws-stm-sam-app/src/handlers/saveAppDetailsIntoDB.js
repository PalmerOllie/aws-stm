const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const helpers = require('./helpers');
const inspect = helpers.inspect;

/** saves AppDetails passed through into DB  */
let handler = async function(event, context) { 
    inspect(event);

    return {
        statusCode: 200,
        headers: {},
        body: "Saved successfully."
    };
}

exports.handler = handler;