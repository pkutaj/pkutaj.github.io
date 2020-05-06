const indexedTwoSum = require("./2020-05-06.js")

describe('indexedTwoSum', () => {

    test('given the target is 0, it should still return the values', () => {
        /* Arr */
        const nums = [-1,-2,-3,-4,-5]
        const target = -8
        /* Act */
        const result = indexedTwoSum(nums, target)
        /* Asr */
        expect(result).toEqual([2,4])
    });

    
});