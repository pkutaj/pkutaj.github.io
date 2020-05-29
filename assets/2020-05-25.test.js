const isPalindrome = require("./2020-05-25");
describe('isPalindrome', () => {
    test('given an int with different first and last digist (12345), it should return "false"', () => {
        let int = 12345
        let result = isPalindrome(int);
        expect(result).toEqual(false);
    });

    test('given an int same limit digits, with different second and last-1 digits (12331), it should return "false"', () => {
        let int = 12331;
        let result = isPalindrome(int);
        expect(result).toEqual(false);
    });

    test('given an int with 1 digit (0), it should return "true"', () => {
        let int = 0;
        let result = isPalindrome(int);
        expect(result).toEqual(true);
    });

    test('given 1000021, it should return false', () => {
        let int = 1000021;
        let result = isPalindrome(int);
        expect(result).toEqual(false)
        
    });

    test('given a negative (-333), it should return false', () => {
        let int = -333;
        let result = isPalindrome(int)
        expect(result).toEqual(false)
    });


});