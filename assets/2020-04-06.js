/* the concern is to return first and last item of a targer within an ascending array
 * - use reverse iteration
 * - use linear search
 *  
*/

/* INITS */
const nums = []

/* WORK */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    let matchedPositions = new Array(2)
    let i = 0;
    let numsSize = nums.length;
    let j = numsSize - 1

    if(numsSize === 0) return matchedPositions = [-1, -1]

    for (i; i < numsSize; i++) {
        if (nums[i] === target) {
            matchedPositions[0] = i;
            break;
        } else if (i === j) {
            return matchedPositions = [-1, -1];
        }
    }

    for (j; j >= 0; j--) {
        if (nums[j] === target) {
            matchedPositions[1] = j;
            break;
        }
    }
    return matchedPositions;
}
/* TEST */
console.time("searchRange")
console.log(searchRange(nums, 0))
console.timeEnd("searchRange")