/* the aim of this kata is to solve https://leetcode.com/problems/two-sum/ */

/* INITS */
const nums = [2, 7, 11, 12]
const target = 9;
let term1 = undefined;
let term1index = undefined;
let term2 = undefined;
let term2index = undefined; 

/* WORK */
function getTwoSum(nums, target) {
    i = 0;
    numsSize = nums.length

    for (i; i < numsSize; i++) {
        if (nums[i] > target || (nums[i] / 2 === target && nums[i] % 2 === 0)) {
            continue;
        };

        if (term1 === undefined) {
            term1 = nums[i];
            term1index = i;
            continue;
        }

        if (target === term1 + nums[i]) {
            term2 = nums[i];
            term2index = i;
            return [term1index, term2index];
        }

    }

}

/* CALL */
console.time;
console.log(getTwoSum(nums, target))
console.timeEnd;
