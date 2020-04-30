const getTwoSum = require("./2020-04-29")

describe('testExport', () => {
    test("given target greater the max value of an array, should return proper message", () => {
        /* Arr */
        const nums = [11,12];
        const target = 13;
        /* Act */
        const result = getTwoSum(nums, target)
        /* Asr */
        expect(result).toEqual("target is greater")
    });
});