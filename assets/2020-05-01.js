/* the aim of this kata is to solve https://leetcode.com/problems/two-sum/ */

/* INITS */
const nums = [1,2,3,4,5,6,7,8,9,10]
const target = 10


/* WORK */
function getTwoSum(nums, target) {
    i = 0;
    numsSize = nums.length
    let pairs = [];
    let numList = []; //?
    let term1 = undefined;
    let term1index = undefined;
    let term2 = undefined;
    let term2index = undefined;

    for (i; i < nums.length; i++) {
        let term1 = nums[i];
        let term2 = target - term1;
        if(numList.includes(term2)) {
            pairs.push([term1, term2]);
        }
        numList.push(term1);
    }
    return pairs
};

console.log(getTwoSum(nums, target))
/* EXPORT */
module.exports.getTwoSum = getTwoSum;