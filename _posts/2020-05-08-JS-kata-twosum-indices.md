---
layout: post
title: javascript > kata > two sum + return indices
categories: [javascript]
---

| **THE CASE OF THE INDEXED TWOSUM**                                                                                 |
|--------------------------------------------------------------------------------------------------------------------|
| given an array of integers, return indices of terms that add-up to the target; 1 solution per array; no repetition |

## toc
<!-- TOC -->

- [expectation](#expectation)
- [code](#code)
- [winning code](#winning-code)
- [footnotes to the winning code](#footnotes-to-the-winning-code)
    - [refactor-2](#refactor-2)
    - [refactor-3](#refactor-3)
- [sources](#sources)

<!-- /TOC -->

## findings
### expectation

nums = [2, 7, 11, 15]  
target = 9  
return [0, 1]

### code

```javascript
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
```

### winning code

```javascript
const twoSum = function(nums, target) {
    const comp = {};                        //1
    for(let i=0; i<nums.length; i++){       //2
        if(comp[nums[i] ]>=0){              //3
            return [ comp[nums[i] ] , i]    //4
        }
        comp[target-nums[i]] = i            //5
    }
};
```

STEP# | CODE                                  | COMMENT
------|---------------------------------------|--------------------------------------------------------------------
1     | `const comp = {};`                    | init an empty object
2     | `for(let i=0; i<nums.length; i++){..` | loop through all items
3     | `..if(comp[nums[i] ]>=0){..`          | check if the actual value is stored as needed key with index
4     | `....return [ comp[nums[i] ] , i]`    | return an array of the index of needed and index of actual
5     | `..comp[target-nums[i]] = i`          | create a key:value with `key` that maps needed value with the index


### footnotes to the winning code
* note how he is checking if the given value is the iteration is already stored as a wanted one
* that is working — in array-only solution is is enough to 
* see [2020-04-14-truthy-falsy]({% post_url 2020-04-14-truthy-falsy %})
* remember: zero is falsy, that is why is is including 0 as true to pass the test 🠊 **HE IS COUNTING FROM 0**
* there are ~~3 solutions~~ 2 solutions to this
    ~~1. dirty: start counting from 1~~ 🠊 just 2, you are forced to count from 0 by the assignment
    2. `in` operator 
    3. `hasOwnProperty` property

#### refactor-2

```javascript
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
```

#### refactor-3

```javascript
function getIndicesOfTwoSum(nums, target) {
    let neededValue_IndexPairs = {};
    let numsSize = nums.length;
    let i = 0;
    for (i; i < numsSize; i++) {
    if(neededValue_IndexPairs.hasOwnProperty(nums[i])) {
        return [neededValue_IndexPairs[nums[i]], i]
    }
    neededValue_IndexPairs[target - nums[i]] = i;
    }
    
}
```

### sources
* [String.prototype.indexOf() - JavaScript ~ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
* [How do I check if an object has a key in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/455338/how-do-i-check-if-an-object-has-a-key-in-javascript)