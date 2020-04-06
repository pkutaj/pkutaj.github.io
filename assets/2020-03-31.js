/* the concern is to return first and last item of a targer within an ascending array */

/* INITS */
const nums = [5, 7, 7, 8, 8, 10]

/* WORK */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    let matchedPositions = [];
    let limitPositions = new Array(2)
    let i = 0;
    let numsSize = nums.length;
    for (i; i < numsSize; i++) {
        if (nums[i] === target) matchedPositions.push(i)
    };
    if (matchedPositions.length) {
        return limitPositions = [matchedPositions[0], matchedPositions[matchedPositions.length - 1]]
    } else {return limitPositions = [-1, -1]}

}
/* TEST */
console.time("timer");
console.log(searchRange(nums, 6));
console.timeEnd("timer");