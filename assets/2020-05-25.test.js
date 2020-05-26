const abc = require("./2020-05-25");
describe('isPalindrome', () => {
    test('given an int (12345), it should return "[1,5]"', () => {
        let int = 12345
        let result = abc.test(int);
        expect(result).toEqual([1,5]);
    });
});