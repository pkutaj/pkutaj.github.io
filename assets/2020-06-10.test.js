const longestPrefix = require("./2020-06-10")
 describe('longest prefix', () => {
/*    test('given 5 items and needing to combine 2 of them, loop should run 12 times', () => {
        let result = longestPrefix(3);
        expect(result).toEqual(3);
    }); */

    /* test('given 4 words, it should take it as N and return 6', () => {
        let input = ["cat", "cap", "pig", "pit"];
        let result = longestPrefix(input)
        expect(result).toEqual(6);
    });
 */

     test('given no equal prefix, it should return an false ', () => {
        let input = ["cat", "dog"]
        let result = longestPrefix(input)
        expect(result).toEqual(false);
    });
    
});