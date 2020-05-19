const reverse = require("./2020-05-18")

describe('reverse', () => {
    test('given out of range for int32, it should return 0', () => {
        /* Arr */
        let x = Math.pow(-2,31) - 1
        /* Act */
        let result = reverse(x)
        /* Asr */
        expect(result).toEqual(0);
    });


    test('given a short int (13), it should reverse the values (return 31) ', () => {
        /* Act */
        let x = 13;
        /* Arr */
        let result = reverse(x);
        /* Ass */
        expect(result).toEqual(31);
        
    });

});