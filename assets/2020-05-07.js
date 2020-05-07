function getIndicesOfTwoSum(nums, target) {
    let neededValue_IndexPairs = {};
    let numsSize = nums.length;
    let i = 0;
    for (i; i < numsSize; i++) {
    if(nums[i] in neededValue_IndexPairs) {
        return [neededValue_IndexPairs[nums[i]], i]
    }
    neededValue_IndexPairs[target - nums[i]] = i;
    }
    
}

module.exports = getIndicesOfTwoSum;