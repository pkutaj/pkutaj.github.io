/* AIM */
// the concern is use BINARY SEARCH to return first and last array item using binary search

let target = 12;
let nums = [1,1,1,1,1,1,1,2,3,4,5,5,6,8,9,11];

function getLastPosition(nums, target) {
    let lo = 0;
    let hi = nums.length - 1
    let mid;

    if (nums[hi] === target) return hi
    
    while (lo < hi) {
        mid = Math.floor((lo + hi) / 2);
        if (nums[mid] > target) {
            hi = mid
        } else {
            lo = mid + 1
        }
    }
    return lo - 1;
}

function getFirstPosition(nums, target) {
    let lo = 0;
    let hi = nums.length - 1
    let mid;
    while (lo < hi) {
        mid = Math.floor((lo + hi) / 2);
        if (nums[mid] >= target) {
            hi = mid
        } else {
            lo = mid + 1
        }
    }

    if (nums[lo] === target) { return lo }
    else { return undefined }
}


function searchRange(nums, target) {
    let leftMost = getFirstPosition(nums, target);
    if (leftMost === undefined) return [-1, -1]
    let rightMost = getLastPosition(nums, target);
    return [leftMost, rightMost]
}

console.time("getFirstAndLast");
console.log(searchRange(nums, target));
console.timeEnd("getFirstAndLast");