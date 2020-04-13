/* AIM */
// the concern is use BINARY SEARCH to return first and last array item using binary search

let nums = [1, 2, 2, 2, 4, 5];
let target = 1;

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
    return lo;
}

function getLastPosition(nums, target) {
    let lo = 0;
    let hi = nums.length - 1
    let mid;
    while (lo < hi) {
        mid = Math.floor((lo + hi) / 2);
        if (nums[mid] >= target) {
            lo = mid
        } else {
            hi = mid - 1
        }
    }
    return hi;
}

function getFirstAndLast(nums, target) {
    let firstAndLast = new Array(2)
    return firstAndLast = [getFirstPosition(nums, target), getLastPosition(nums, target)];
}

console.time("getFirstAndLast");
console.log(getLastPosition(nums, target));
console.timeEnd("getFirstAndLast");