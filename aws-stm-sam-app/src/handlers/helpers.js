const https = require('https');

/** Allows easy viewing of JS objects */
const inspect = obj => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        console.log(`${prop}: ${obj[prop]}`)
      }
    }
    console.log("");
}

/** Returns data from URL as JSON */
async function getJsonFromRequest(url) {
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


module.exports = {
    inspect,
    getJsonFromRequest
}

