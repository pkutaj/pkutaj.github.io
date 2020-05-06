function indexedTwoSum(nums, target) {

    let i = 0;
    let numSize = nums.length
    let resultPair = [];
    let processedGivenTerms = [];
    for (i; i < numSize; i++) {
        let actualGivenTerm = nums[i];
        let actualNeededTerm = target - nums[i];
        if (processedGivenTerms.includes(actualNeededTerm)) {
            resultPair.push(nums.indexOf(actualNeededTerm))
            resultPair.push(i)
            return resultPair
        }
        processedGivenTerms.push(actualGivenTerm);
    }
}

module.exports = indexedTwoSum;