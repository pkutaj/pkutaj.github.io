/* AIM */
// the concern is use BINARY SEARCH to return first and last array item using binary search

/* let randomInt = Math.floor(Math.random() * 10); */ // FAIL
function randomInt() {
    let randomNUmber = Math.floor(Math.random() * 10)
    return randomNUmber}

let nums = (arrSize) => {
    let len = 1;
    let nums = [];
    while (len <= arrSize) {
        nums.push(randomInt());
        len++
    };
    return nums;
    
}

let target = randomInt();

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
    let rightMost = getLastPosition(nums, target);
    if (leftMost === undefined) { return [-1, -1] }
    else { return [leftMost, rightMost] }
}

console.time("getFirstAndLast");
console.log(searchRange(nums(10), target));
console.timeEnd("getFirstAndLast");