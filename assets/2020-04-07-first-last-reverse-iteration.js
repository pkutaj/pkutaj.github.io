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
/* INITS */
let matchedPositions = new Array(2);
let numsSize = nums.length;
let lo = 0;
let hi = numsSize - 1;
let mids = Math.floor((lo+hi)/2);
/* WORK */
//STEP-1 LEFT-LIMIT
while (condition) {
    
}
//STEP-2 RIGHT-LIMIT    
return matchedPositions;
}
/* TEST */
console.time("searchRange")
console.log(searchRange(nums, 0))
console.timeEnd("searchRange")