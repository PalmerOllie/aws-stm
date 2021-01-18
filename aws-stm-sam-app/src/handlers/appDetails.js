const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ssm = new AWS.SSM();

// const kms = new aws.KMS({
//     accessKeyId: 'someLetterskfDJWJFNdndej',
//     secretAccessKey: 'someNums029487589220304',
//     region: 'ap-southeast-1'
// });

function getSecret() {
    var params = {
        Name: 'testParam', /* required */
        WithDecryption: true || false
    };

    let secret = {};

    ssm.getParameter(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     {
            secret = data;
            inspect(data.Parameter);
        }
    });

    return data.Parameter.Value;
}

const steamUrlReviewsEndpoint = (appId) => { return `https://store.steampowered.com/appreviews/${appId}?json=1&purchase_type=all&language=all`; }
const steamUrlAppDetailsEndpoint = (appId) => { return `https://store.steampowered.com/api/appdetails?appids=${appId}&purchase_type=all&language=all`; }
const https = require('https');

/**
 * Retieves details (Name, Price, Genre) given a Steam Game appID. 
 */
exports.getDetails = async (event) => {
    let appId = 861540; //TODO: Allow dynamic appId (pass into function)
    //For future use to obtain appIds: https://api.steampowered.com/ISteamApps/GetAppList/v2/

    //Retieve JSON
    let rawAppReviewJson = await getDataFromRequest(steamUrlReviewsEndpoint(appId));
    rawAppReviewJson.reviews = ""; //Remove 20+ reviews for easier console logging
    // console.log(rawAppDetailJson);
    let rawAppDetailJson = await getDataFromRequest(steamUrlAppDetailsEndpoint(appId));

    //Build object using retieved JSON
    let collectedAppData = {};
    collectedAppData.key_info = {};
    collectedAppData.key_info.appId = appId;
    collectedAppData = addAppReviewJsonDataToObject(rawAppReviewJson, collectedAppData);
    collectedAppData = addAppDetailsJsonDataToObject(rawAppDetailJson, collectedAppData);
   
    const message = {
        statusCode: 200,
        headers: {
            "x-custom-header" : "x-custom-value"
        },
        body: JSON.stringify(collectedAppData)
    };
    
    // All log statements are written to CloudWatch
    // console.info(`${message}`);
    return message;
}


async function getDataFromRequest(url) {
    let dataString = "";
    const response = await new Promise((resolve, reject) => {
        const req = https.get(url, function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
                statusCode: 200,
                body: JSON.stringify(JSON.parse(dataString), null, 4)
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });

    return JSON.parse(dataString);
}

//Helper function to view JS objects 
const inspect = obj => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        console.log(`${prop}: ${obj[prop]}`)
      }
    }
    console.log("");
  }


//Adds review date to object from raw JSON from steamUrlEndpoint
function addAppReviewJsonDataToObject(rawAppReviewJson, collectedAppData) {
    collectedAppData.reviews = {};
    collectedAppData.reviews.review_score =  rawAppReviewJson.query_summary.review_score;
    collectedAppData.reviews.total_reviews = rawAppReviewJson.query_summary.total_reviews;
    collectedAppData.reviews.positive_reviews = rawAppReviewJson.query_summary.total_positive;
    collectedAppData.reviews.negative_reviews = rawAppReviewJson.query_summary.total_negative;

    console.log("Adding Review Data....:")
    // inspect(collectedAppData.reviews);
    return collectedAppData;
}

//Adds appDetails (app_name, prices, developer) to object from raw JSON from steamUrlEndpoint
function addAppDetailsJsonDataToObject(rawAppDetailJson, collectedAppData) {
    rawAppDetailJson = rawAppDetailJson[collectedAppData.key_info.appId].data;

    collectedAppData.key_info.app_name = rawAppDetailJson.name;
    collectedAppData.key_info.app_type = rawAppDetailJson.type;
    collectedAppData.key_info.price_initial = rawAppDetailJson.price_overview.initial;
    collectedAppData.key_info.price_currency = rawAppDetailJson.price_overview.currency;
    collectedAppData.key_info.release_date = rawAppDetailJson.release_date.date;
    collectedAppData.key_info.developers = rawAppDetailJson.developers;
    collectedAppData.key_info.publishers = rawAppDetailJson.publishers;

    collectedAppData.support_info = {};
    collectedAppData.support_info.platforms = rawAppDetailJson.platforms;
    collectedAppData.support_info.required_age = rawAppDetailJson.required_age;
    collectedAppData.support_info.controller_support = rawAppDetailJson.controller_support;
    collectedAppData.support_info.languages = rawAppDetailJson.supported_languages;

    if(rawAppDetailJson.genres != undefined) {
        collectedAppData.support_info.genres = rawAppDetailJson.genres;
    } else  {
        console.log("No genres found for appId:" + collectedAppData.key_info.appId);
    }

    console.log("Adding AppDetails Data....:")
    // inspect(rawAppDetailJson);
    // inspect(collectedAppData.key_info);
    // inspect(collectedAppData.support_info);
    return collectedAppData;
}


exports.getDetails();