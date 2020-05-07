const getIndicesOfTwoSum = require("./2020-05-07")
describe('getIndicesOfTwosum', () => {
    test('given target, it should return indices of terms that add-up to its value', () => {
        /* A */
        let nums = [-1, -2, -3];
        let target = -5
        /* A */
let result = getIndicesOfTwoSum(nums, target);
        /* A */
expect(result).toEqual([1,2])

    });
});