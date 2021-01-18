const appDetailsLambda = require('../../../src/handlers/appDetails.js');

// This includes all tests for appDetails handler
describe('Test for appDetails handler', function () {
    it('Verifies data successfully retrieved', async () => {
        const mockEvent = { pathParameters: { appId: 212680 }}; //appId for 'FTL: Faster Than Light'
        const result = await appDetailsLambda.handler(mockEvent);
        const appData = JSON.parse(result.body);

        const expectedName = 'FTL: Faster Than Light'; 
        const resultName = appData.key_info.app_name;
        expect(resultName).toEqual(expectedName);

        const expectedReleaseDate = '14 Sep, 2012';
        const resultReleaseDate = appData.key_info.release_date;
        expect(resultReleaseDate).toEqual(expectedReleaseDate);

        const expectedDevelopers = ['Subset Games'];
        const resultDevelopers = appData.key_info.developers;
        expect(resultDevelopers).toEqual(expectedDevelopers);
    });
});
