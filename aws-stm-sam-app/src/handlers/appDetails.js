const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const helpers = require('../helpers');
const inspect = helpers.inspect;

/** Retieves details (Name, Price, Genre) given a Steam Game appID. */
let handler = async function(event, context) {
    inspect(event);
    inspect(event.pathParameters);
    console.log(event.pathParameters);
    let appId = event.pathParameters.appId;//861540; //TODO: Allow dynamic appId (pass into function)
    //For future use to obtain appIds: https://api.steampowered.com/ISteamApps/GetAppList/v2/
    
    if(appId == undefined) {
        return {
            statusCode: 200,
            headers: {},
            body: "No appId specified."
        };
    }

    let collectedAppData = getAppData(appId);
   
    const message = {
        statusCode: 200,
        headers: {
            "x-custom-header" : "x-custom-value"
        },
        body: JSON.stringify(collectedAppData)
    };
    
    return message;
}

//getDetails();
exports.handler = handler;