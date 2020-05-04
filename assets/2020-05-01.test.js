const getTwoSum = require("./2020-05-01")

describe('twoSum', () => {
 
    test('given target with no matching terms, it should return "array has no matching terms"', () => {
        /* Arr */
        const nums = [1,2]
        const target = 3

        /* Act */
        const result = getTwoSum.getTwoSum(nums, target)
        
        /* Asr */
        expect(result).toEqual([[2,1]])

    });
});