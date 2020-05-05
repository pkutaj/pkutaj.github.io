/* the aim of this kata is to solve https://leetcode.com/problems/two-sum/ */

/* INITS */
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const target = 10

const getMinValue = nums => { return Math.min(...nums) }

function getTwoSum(nums, target) {
    i = 0;
    numsSize = nums.length
    let pairs = [];
    let numList = []; //?
    if (target < getMinValue(nums)) return "target is smaller" 
    for (i; i < nums.length; i++) {
        let term1 = nums[i];
        let term2 = target - term1;
        if (numList.includes(term2)) pairs.push([term1, term2]);
        numList.push(term1);
    }
    if (pairs.length) return pairs
        else return "no terms add up to target"
}

console.log(getTwoSum(nums, target))

/* EXPORT */
module.exports.getTwoSum = getTwoSum;