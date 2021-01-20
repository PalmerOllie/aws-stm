const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const helpers = require('../helpers');
const inspect = helpers.inspect;
const getSteamAppData = require('../getSteamAppData');
const saveSteamAppData = require('../saveAppDetailsIntoDB');

/** Retieves details (Name, Price, Genre) given a Steam Game appID. */
let handler = async function(event, context) {
    console.log(event.httpMethod);
    // inspect(event);
    // inspect(event.pathParameters);
    // console.log(event.pathParameters);
    console.log(JSON.stringify(event));
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
    let tableName = 'aws-stm-sam-app-steamAppDB-10GHMKQQ4OE1T';
    if(event.httpMethod == "POST") {
        console.log("Saving entry for " + collectedAppData.key_info.app_name + " into DB");
        await saveSteamAppData.saveAppDetailsIntoDB(collectedAppData, tableName);
    }

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



/*
  EXAMPLE API GATEWAY EVENT
  {
    "resource": "/appDetails/{appId}",
    "path": "/appDetails/212680",
    "httpMethod": "GET",
    "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*\/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "CloudFront-Forwarded-Proto": "https",
        "CloudFront-Is-Desktop-Viewer": "true",
        "CloudFront-Is-Mobile-Viewer": "false",
        "CloudFront-Is-SmartTV-Viewer": "false",
        "CloudFront-Is-Tablet-Viewer": "false",
        "CloudFront-Viewer-Country": "GB",
        "Host": "4hwy4kizze.execute-api.us-east-1.amazonaws.com",
        "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
        "Via": "2.0 12f337884d143d214aea45cb63616a4d.cloudfront.net (CloudFront)",
        "X-Amz-Cf-Id": "cNQwIeYzhQ31wsmdcchNYLKZI0WX8u700zjpCJMvhiqb9ck8V53DQg==",
        "X-Amzn-Trace-Id": "Root=1-6006d5e0-3fdc0a0c6e5aeccf24a6c7d1",
        "X-Forwarded-For": "194.37.96.104, 64.252.133.114",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
    },
    "multiValueHeaders": {
        "Accept": [
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*\/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
        ],
        "Accept-Encoding": [
            "gzip, deflate, br"
        ],
        "Accept-Language": [
            "en-US,en;q=0.9"
        ],
        "cache-control": [
            "max-age=0"
        ],
        "CloudFront-Forwarded-Proto": [
            "https"
        ],
        "CloudFront-Is-Desktop-Viewer": [
            "true"
        ],
        "CloudFront-Is-Mobile-Viewer": [
            "false"
        ],
        "CloudFront-Is-SmartTV-Viewer": [
            "false"
        ],
        "CloudFront-Is-Tablet-Viewer": [
            "false"
        ],
        "CloudFront-Viewer-Country": [
            "GB"
        ],
        "Host": [
            "4hwy4kizze.execute-api.us-east-1.amazonaws.com"
        ],
        "sec-ch-ua": [
            "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\""
        ],
        "sec-ch-ua-mobile": [
            "?0"
        ],
        "sec-fetch-dest": [
            "document"
        ],
        "sec-fetch-mode": [
            "navigate"
        ],
        "sec-fetch-site": [
            "none"
        ],
        "sec-fetch-user": [
            "?1"
        ],
        "upgrade-insecure-requests": [
            "1"
        ],
        "User-Agent": [
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
        ],
        "Via": [
            "2.0 12f337884d143d214aea45cb63616a4d.cloudfront.net (CloudFront)"
        ],
        "X-Amz-Cf-Id": [
            "cNQwIeYzhQ31wsmdcchNYLKZI0WX8u700zjpCJMvhiqb9ck8V53DQg=="
        ],
        "X-Amzn-Trace-Id": [
            "Root=1-6006d5e0-3fdc0a0c6e5aeccf24a6c7d1"
        ],
        "X-Forwarded-For": [
            "194.37.96.104, 64.252.133.114"
        ],
        "X-Forwarded-Port": [
            "443"
        ],
        "X-Forwarded-Proto": [
            "https"
        ]
    },
    "queryStringParameters": null,
    "multiValueQueryStringParameters": null,
    "pathParameters": {
        "appId": "212680"
    },
    "stageVariables": null,
    "requestContext": {
        "resourceId": "ycgfq2",
        "resourcePath": "/appDetails/{appId}",
        "httpMethod": "GET",
        "extendedRequestId": "ZZZbKGVZoAMF05A=",
        "requestTime": "19/Jan/2021:12:51:44 +0000",
        "path": "/Prod/appDetails/212680",
        "accountId": "747407036452",
        "protocol": "HTTP/1.1",
        "stage": "Prod",
        "domainPrefix": "4hwy4kizze",
        "requestTimeEpoch": 1611060704930,
        "requestId": "8e526c71-7897-42f5-8324-a7a2f27bc25f",
        "identity": {
            "cognitoIdentityPoolId": null,
            "accountId": null,
            "cognitoIdentityId": null,
            "caller": null,
            "sourceIp": "194.37.96.104",
            "principalOrgId": null,
            "accessKey": null,
            "cognitoAuthenticationType": null,
            "cognitoAuthenticationProvider": null,
            "userArn": null,
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
            "user": null
        },
        "domainName": "4hwy4kizze.execute-api.us-east-1.amazonaws.com",
        "apiId": "4hwy4kizze"
    },
    "body": null,
    "isBase64Encoded": false
}
*/