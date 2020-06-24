const longestPrefix = require("./2020-06-10")
describe('longest prefix', () => {

    test('given empty string, it should return empty string', () => {
        let arr = []
        let result = longestPrefix(arr)
        expect(result).toEqual("");
    })
});