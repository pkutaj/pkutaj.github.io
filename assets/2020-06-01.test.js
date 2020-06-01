const romanToInt = require("./2020-06-01")
describe('romanToInt', () => {
    test('given I, it shoult return 1', () => {
    let roman = "I";
    let result = romanToInt(roman);
    expect(result).toEqual(1);
    });
});