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

    test('given an inte, it should return a string ', () => {
        /* Arr */
        let x = 12
        /* Act */
        let result = typeof reverse(x);
        /* Ass */
        expect(result).toEqual("string")
    });
});