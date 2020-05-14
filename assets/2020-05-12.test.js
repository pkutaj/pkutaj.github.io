const reverse = require("./2020-05-12")

describe('reverse', () => {
    test('given out of range for int32, it should return 0', () => {
        /* Arr */
        let x = Math.pow(-2,31) - 1
        /* Act */
        let result = reverse(x)
        /* Asr */
        expect(result).toEqual(0);
    });


    test('given an int, it should return the mid of the length', () => {
        /* Arr */
        let x = 101223
        /* Act */
        let result = reverse(x)
        /* Ass */
        expect(result).toEqual(2)
        
    });


});