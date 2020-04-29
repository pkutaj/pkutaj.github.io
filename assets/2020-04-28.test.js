const gesvltTwoSum = require("./2020-04-28")
describe('getTwoSum', () => {
    test("given target smaller then all items, should return null", () => {
        /* Arr */
        const nums = [11,12];
        const target = 10;
        /* Act */
        const result = getTwoSum(nums, target)
        /* Asr */
        expect(result).toEqual(undefined)
    });
});