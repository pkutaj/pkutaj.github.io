const getTwoSum = require("./2020-05-04")

describe('twoSum', () => {

    test('given the target is smaller then the min value, it should return "target is smaller"', () => {
        /* Arr */
        const nums = [5, 10]
        const target = 1

        /* Act */
        const result = getTwoSum.getTwoSum(nums, target)

        /* Asr */
        expect(result).toEqual("target is smaller")

    });

test('given array contains no terms that add up to target, it should return "no terms add up to target" ', () => {
    /* Arr */
    let nums = [2,0]
    let target = 3
    /* Act */
    const result = getTwoSum.getTwoSum(nums, target)
    /* Asr */
    expect(result).toEqual("no terms add up to target")

});
    test('given target with matching terms, it should return a pair of terms adding up to the target', () => {
        /* Arr */
        const nums = [1, 2]
        const target = 3
        /* Act */
        const result = getTwoSum.getTwoSum(nums, target)
        /* Asr */
        expect(result).toEqual([[2,1]])
    });

});