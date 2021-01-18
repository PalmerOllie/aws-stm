const lambda = require('../../../src/handlers/saveAppDetailsIntoDB.js');

describe('Test for saveAppDetailsIntoDB', function () {
    it('Verifies successful saving into DB', async () => {
        const result = await lambda.handler();
  
        const expectedResult = {
            statusCode: 200,
            headers: {},
            body: "Saved successfully."
        };
        expect(result).toEqual(expectedResult);
    });
});
