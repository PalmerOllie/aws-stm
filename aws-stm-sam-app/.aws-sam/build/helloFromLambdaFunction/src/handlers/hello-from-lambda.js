/**
 * A Lambda function that returns a static string
 */
exports.helloFromLambdaHandler = async () => {
    // If you change this message, you will need to change hello-from-lambda.test.js
    const message = {
        statusCode: 200,
        headers: {
            "x-custom-header" : "x-custom-value"
        },
        body: "\nHello from Lambda!\n"
    };
    
    // All log statements are written to CloudWatch
    console.info(`${message}`);
    return message;
}
