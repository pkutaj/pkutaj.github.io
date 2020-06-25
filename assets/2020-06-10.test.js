const longestPrefix = require("./2020-06-10")
describe('longest prefix', () => {

    test('given empty string, it should return empty string', () => {
        let arr = []
        let result = longestPrefix(arr)
        expect(result).toEqual("");
    })

    test('given two identical strings, it should return the string', () => {
        let arr = ["dog", "dog"]
        let result = longestPrefix(arr)
        expect(result).toEqual("dog")
    });

    test('given ["dog", "dope"], it shoudl return "do"', () => {
        let arr = ["dog", "dope"]
        let result = longestPrefix(arr); 
        expect(result).toEqual("do")
    });
});

