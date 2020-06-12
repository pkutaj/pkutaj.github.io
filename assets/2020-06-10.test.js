const longestPrefix = require("./2020-06-10")
describe('longest prefix', () => {
    test('given 5 items and needing to combine 2 of them, loop should run 12 times', () => {
        let result = longestPrefix();
        expect(result).toEqual(10);
    });
    
});