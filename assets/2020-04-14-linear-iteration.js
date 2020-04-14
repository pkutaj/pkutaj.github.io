/* the concern is to return first and last item of a targer within an ascending array
 * - use linear search
 *  
*/
const nums1 = [1,2,2,2,4,5]
/* WORK */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange1 = function (nums, target) {
    let matchedPositions = [];                              //1. 
    let limitPositions = new Array(2)                       //2. 
    let i = 0;
    let numsSize = nums.length;
    for (i; i < numsSize; i++) {                            //3. 
        if (nums[i] === target) matchedPositions.push(i)    //4. 
    };
    if (matchedPositions.length) {                          //5. 
        return limitPositions = [matchedPositions[0], matchedPositions[matchedPositions.length - 1]] //6.-7.
    } else {return limitPositions = [-1, -1]}               //8. 

}
/* TEST */
console.time("searchRange1")
console.log(searchRange1(nums1, 2))
console.timeEnd("searchRange1")
