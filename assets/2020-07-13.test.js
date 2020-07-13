const isValid = require("./2020-07-13");
describe('isValid', () => {
    test('given "()", it should return true ', () => {
        let input = "()"
        let result = isValid(input);
        expect(result).toEqual(true)
    });
    test('given "(){}", it should return true ', () => {
        let input = "(){}"
        let result = isValid(input);
        expect(result).toEqual(true)  
    });
    
})


