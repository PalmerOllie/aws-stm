const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const helpers = require('../helpers');
const inspect = helpers.inspect;
const getSteamAppData = require('../getSteamAppData');

/** Retieves details (Name, Price, Genre) given a Steam Game appID. */
let handler = async function(event, context) {
    inspect(event);
    inspect(event.pathParameters);
    console.log(event.pathParameters);
    let appId = event.pathParameters.appId;//861540;
    //For future use to obtain appIds: https://api.steampowered.com/ISteamApps/GetAppList/v2/
    
    if(appId == undefined) {
        return {
            statusCode: 200,
            headers: {},
            body: "No appId specified."
        };
    }

    let collectedAppData = await getSteamAppData.getSteamAppData(appId);
    // inspect(collectedAppData);

    const message = {
        statusCode: 200,
        headers: {
            "x-custom-header" : "x-custom-value"
        },
        body: JSON.stringify(collectedAppData)
    };
    
    return message;
}

// const mockEvent = { pathParameters: { appId: 212680 }}; //appId for 'FTL: Faster Than Light'
// handler(mockEvent);
exports.handler = handler;