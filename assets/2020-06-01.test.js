const romanToInt = require("./2020-06-01")
/* describe('romanToInt', () => {
    test('given I, it shoult return 1', () => {
    let roman = "I";
    let result = romanToInt(roman);
    expect(result).toEqual(1);
    });
});

test('given III, is should return 3', () => {
    let roman = "III"
    let result = romanToInt(roman);
    expect(result).toEqual(3);
});

test('given ""VIIII"", it should return 9', () => {
    let roman = "VIIII";
    let result = romanToInt(roman);
    expect(result).toEqual(9);
});

test('give "XXIV", it shoud return 24', () => {
    let roman = "XXIV"
    let result = romanToInt(roman);
    expect(result).toEqual(24)
}); */

test('give "XLIV, it should return 44', () => {
    let roman = "XLIV"
    let result = romanToInt(roman);
    expect(result).toEqual(44)
});