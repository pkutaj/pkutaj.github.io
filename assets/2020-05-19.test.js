const reverse = require("./2020-05-19")

describe('reverse', () => {
    test('given out of range for int32, it should return 0', () => {
        /* Arr */
        let x = Math.pow(-2,31) - 1
        /* Act */
        let result = reverse(x)
        /* Asr */
        expect(result).toEqual(0);
    });


    test('given a short int (1311), it should reverse the values (return 1131) ', () => {
        /* Act */
        let x = 1311;
        /* Arr */
        let result = reverse(x);
        /* Ass */
        expect(result).toEqual(1131);
        
    });

});