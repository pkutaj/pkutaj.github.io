
/* the concern is to return first and last item of a targer within an ascending array
 * - use reverse iteration
 * - use linear search
 *  
*/
/* INITS */
const nums2 = [1,2,2,2,4,5]

/* WORK */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange2 = function (nums, target) {
    let matchedPositions = new Array(2)     //01
    let i = 0;                              //02
    let numsSize = nums.length;             //03
    let j = numsSize - 1                    //04

    if(numsSize === 0) return matchedPositions =  [-1, -1] //05

    for (i; i < numsSize; i++) {            //06
        if (nums[i] === target) {           //07
            matchedPositions[0] = i;        //08
            break;                          //08
        } else if (i === j) {               //09
            return matchedPositions = [-1, -1];            //09
        }
    }

    for (j; j >= 0; j--) {                  //10
        if (nums[j] === target) {           //11
            matchedPositions[1] = j;        //12
            break;                          //12
        }
    }
    return matchedPositions;                //13
}
/* TEST */
console.time("searchRange2")
console.log(searchRange2(nums2, 2))
console.timeEnd("searchRange2")

