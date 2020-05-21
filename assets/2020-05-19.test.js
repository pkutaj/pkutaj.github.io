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


    test('given a short int (123), it should reverse the values (return 321) ', () => {
        /* Act */
        let x = 123;
        /* Arr */
        let result = reverse(x);
        /* Ass */
        expect(result).toEqual(321);
        
    });

    test('given a rounded long int (900000), it should just remove zeroes (9)  ', () => {
        /* Act */
        let x = 900000;
        /* Arr */
        let result = reverse(x);
        /* Ass */
        expect(result).toEqual(9);
    });

    test('given 0, it should return 0 ', () => {
        let x = 0;
        let result = reverse(x);
        expect(result).toEqual(0);
    });

    test('given a large number that reverses into a value overflowing the range of int32(1534236469), it should return 0', () => {
    let x = 1534236469;
    let result = reverse(1534236469);
    expect(result).toEqual(0);
    })
});