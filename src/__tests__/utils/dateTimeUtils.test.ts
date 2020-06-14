import { convertToReadableDateTime } from '../../utils/dateTimeUtils';

describe('Tests for date time utils.', () => {
    describe('Test for convert to readable date time function.', () => {
        it('Correctly converts an iso date time string into a readable date time.', () => {

            let exampleDate = '2020-06-14T12:36:46.028Z';
            let expectedResult = 'June 14, 2020';
            let actualResult = convertToReadableDateTime(exampleDate);

            expect(expectedResult).toMatch(actualResult);
        })
    })
})