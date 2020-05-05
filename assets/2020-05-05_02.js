function indexedTwoSum(nums, target) {
if(target < Math.min(...nums)) return "all items are smaller than target"

i = 0;
numSize = nums.length

for(i; i<numSize; i++) {
if(target >= nums[i]) return i
}

}

module.exports = indexedTwoSum;