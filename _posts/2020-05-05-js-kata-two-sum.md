---
layout: post
title: javascript > kata > two sum
categories: [javascript]
---

| **THE CASE OF THE TWO SUM**                                                                                                              |
|------------------------------------------------------------------------------------------------------------------------------------------|
| **question**                                                                                                                             |
| given an array of ints, return **PAIRS OF TERMS** adding up to a specific target                                                         |
| **thesis**                                                                                                                               |
| re-work of the [great answer from Adam Coder](https://www.youtube.com/watch?v=TmjexrTRr6U) that is keeping the complexity of this linear |
| **anti-thesis**                                                                                                                          |
| if you got this as an interview question, you would fail TDD because the order of terms are opposite                                     |

## toc
<!-- TOC -->

- [SCENARIOS](#scenarios)
- [on SCNR#1: initial validation logic: Math.min(...arr)](#on-scnr1-initial-validation-logic-mathminarr)
- [CODE & RD](#code--rd)
- [sources](#sources)

<!-- /TOC -->

## findings

```example
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const target = 10
return [ [ 6, 4 ], [ 7, 3 ], [ 8, 2 ], [ 9, 1 ] ]
```

### SCENARIOS
* so there should be **SCENARIOS** 

SCNR# | ENTER                          | E.G.                  | EXIT
------|--------------------------------|-----------------------|--------------------------------------------
1     | target < min                   | `t=1, nums = [2,3]`   | logically impossible 🠊 "target is smaller"
2     | target >= min && sum found     | `t=1`, `nums = [1,2]` | `[[2,1]]`
3     | target >= min && sum not found | `t=3, nums = [1,5]`   | "not found"

### on SCNR#1: initial validation logic: Math.min(...arr)
* extract the MIN/MAX of the array and compare that to target
* use [Spread syntax - JavaScript ~ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
* combine with `Math.min()` to get the min of an array
* if you find that target is smaller, quit early

### CODE & RD

STEP#        | CODE                                                 | COMMENT
-------------|------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------
**1-INIT**   | `getTwoSum(nums, target)`                            | main function
1.1          | `i = 0;`                                             | counter
1.2          | `numsSize = nums.length`                             | array size
1.3          | `let pairs = [];`                                    | init of a return binding (will be array of arrays)
1.4          | `let numList = [];`                                  | essential helper incrementally populated and checked with each iteration to keep complexity linear
**2-SCNR#1** |                                                      |
2.1          | `if (target < getMinValue(nums))..`                  | call the helper function `getMinValue` to check if the target is smaller than the smallest of array values
2.2          | `..{ return "target is smaller" }`                   | if yes, quit here as it logically cannot return anything and return the string `target is smaller`
2.3          | `getMinValue = nums => { return Math.min(...nums) }` | arrow function using the `Math.min()` method combined with `spread` operator `(...)` that allows array items to be compared easily
**3-SCNR#2** |                                                      |
3.1          | `for (i; i < nums.length; i++)..`                    | the only needed loop in this solution
3.2          | `..let term1 = nums[i];`                             | ..assign the **ACTUAL** array item to the `term1`
3.3          | `..let term2 = target - term1;`                      | ..create a **FICTIONAL** `term2` by subtracting `term1` from the `target`
3.4          | `if (numList.includes(term2))`                       | ..test `numList` for the existence of the fictional `term2` (definitely false in the first iteration)
3.5          | `....pairs.push([term1, term2]);`                    | ....if true, conclude the iteration by pushing an array of `[term1, term2]` into the `pairs`
3.6          | `..numList.push(term1);`                             | ..in any case, populate the `numList` with the **ACTUAL** item
**4-SCNR#3** |                                                      |
4.1          | `if (pairs.length)`                                  | test for the truthy value returned by any array that is not empty
4.2          | `..return pairs`                                     | ..return the `pairs` as tangible result (still **SCNR#2**)
4.3          | `..else {return "no terms add up to target"}`        | ..if no true, return the message saying that none of the array items add up to the passed target

```javascript
/* the inspiration of this kata is https://leetcode.com/problems/two-sum/ */

/* INITS */
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const target = 10

const getMinValue = nums => { return Math.min(...nums) }

function getTwoSum(nums, target) {
    i = 0;
    numsSize = nums.length
    let pairs = [];
    let numList = []; //?
    if (target < getMinValue(nums)) { return "target is smaller" }
    for (i; i < nums.length; i++) {
        let term1 = nums[i];
        let term2 = target - term1;
        if (numList.includes(term2)) {
            pairs.push([term1, term2]);
        }
        numList.push(term1);
    }
    if (pairs.length) {
        return pairs} else {return "no terms add up to target"}
}

/* EXPORT */
module.exports.getTwoSum = getTwoSum;
```

### sources
* [source_code]({{ site.url }}/assets/2020-05-05.js)
* [unit_tests]({{ site.url }}/assets/2020-05-05.test.js)
* [Everything you should know about ‘module’ & ‘require’ in Node.js](https://www.freecodecamp.org/news/require-module-in-node-js-everything-about-module-require-ccccd3ad383/)
* [Math.min() - JavaScript ~ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
* [How to get min or min of an array in JavaScript - Vlad Bezden - Medium](https://medium.com/@vladbezden/how-to-get-min-or-min-of-an-array-in-javascript-1c264ec6e1aa)
* [Visualizing Permutations & Combinations](http://pebreo.github.io/combinations-visualization/)