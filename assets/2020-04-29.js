/* the aim of this kata is to solve https://leetcode.com/problems/two-sum/ */

/* INITS */
const nums = [11,12]
const target = 23;
let term1 = undefined;
let term1index = undefined;
let term2 = undefined;
let term2index = undefined; 

/* WORK */
function getTwoSum(nums, target) {
    i = 0;
    numsSize = nums.length

    if (target > Math.max(...nums)) return "target is greater"

    };

/* CALL */
console.time;
console.log(getTwoSum(nums, target))
console.timeEnd;

/* EXPORT */
module.exports = getTwoSum;