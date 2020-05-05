const indexedTwoSum = require("./2020-05-05_02.js")

describe('indexedTwoSum', () => {
    test('given target smaller than items, it should return "all items are smaller than target"', () => {
        /* ARR */
        const nums = [5,6];
        const target = [1]
        /* ACT */
        const result = indexedTwoSum(nums, target)
        /* ASR */
        expect(result).toEqual("all items are smaller than target")
    });

    test('given target greater or equal of an array item, it should return the index of the first term', () => {
        /* Arr */
        const nums = [6,7,3,6,2]
        const target = [5]
        /* Act */
        const result = indexedTwoSum(nums, target)
        /* Asr */
        expect(result).toEqual(2)
    });
});