---
layout: post
title: programming > kata > the first and last position in an array
categories: [programming]
---
## the case	of limit positions
* the question is to find limit positions (first and last) of an integer within an array
    * array is sorted in ascending order
    * target value is provided
    * if not found, return `[-1, -1]`

* **EXAMPLE**
```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```
    
## toc
<!-- TOC -->

- [bruteforce: linear iteration](#bruteforce-linear-iteration)
    - [rubberduck](#rubberduck)
    - [comment: on truthy and falsy](#comment-on-truthy-and-falsy)
    - [notes on my solution](#notes-on-my-solution)
- [linear search with reverse iterations](#linear-search-with-reverse-iterations)
    - [rubberduck](#rubberduck)
    - [break vs continue](#break-vs-continue)
- [binary search](#binary-search)
- [sources](#sources)

<!-- /TOC -->

## findings
* the idea is to get a list of positions and from that list extract the first and last item and return that

### bruteforce: linear iteration

#### rubberduck


CODE                                                      | COMMENT
----------------------------------------------------------|----------------------------------------------------------------------------------------------------
1. `let matchedPositions = [];`                           | init of the result array with unknown size (helper structure)
2. `let limitPositions = new Array(2)`                    | init of the final 2-item array
3. `for (i; i < numsSize; i++) {...`                      | loop through each item in the passed array...
4. `...if (nums[i] === target) matchedPositions.push(i)}` | ...add check matches and push the index number signifying position  to the `matchedPositions` array
5. `if (matchedPositions.length){...`                     | check with truthy/falsy if there was any match..
6. `return limitPositions = [matchedPositions[0],...`     | ...if yes, return first position...
7. `...matchedPositions[matchedPositions.length - 1]]`    | ...and last position of the array
8. `else {return limitPositions = [-1, -1]}`              | if no match, return `[-1, -1]`

```javascript
/* the concern is to return first and last item of a target within an ascending array */

/* INITS */
const nums = [5, 7, 7, 8, 8, 10]

/* WORK */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
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
/* Array(2) [1, 3]
searchRange1: 7.162841796875ms
*/
```

#### comment: on truthy and falsy
* see [on-truthy-and-falsy]({% post_url 2020-04-14-truthy-falsy %})

#### notes on my solution
* seems to be slow, because I am saving all matches into a helper array and extract the first and past position afterward

### linear search with reverse iterations
* init 2 indices: 
    * one iterating from the front
        * init to `0`
    * one iterating from the back
        * init to `.length-1` 
* if the front one does not have a match, quit early with `[-1, -1]`
* if there is a match, proceed to the reverse iteration

#### rubberduck
* better runtime 

CODE                                                            | COMMENT
----------------------------------------------------------------|--------------------------------------------------------------------------------------------
01. `let matchedPositions = new Array(2)`                       | new array contruction
02. `let i = 0;`                                                | index
03. `let numsSize = nums.length;`                               | array size
04. `let j = numsSize - 1`                                      | reverse index pointing to the last item
05. `if(numsSize === 0) return matchedPositions = [-1, -1]`     | validation check for empty arrays
06. `for (i; i < numsSize; i++) {...`                           | front-iteration loop...
07. `...if (nums[i] === target) {`                              | ...if indexed item is target...
08. `......matchedPositions[0] = i;  break;`                    | ......pass the left limit into `matchedPositions` and break the front-iteration
09. `...else if (i === j) {return matchedPositions = [-1, -1];` | ...else return **NO MATCH** in the final iteration (front-index is equal to the last index)
10. `for (j; j >= 0; j--) {...`                                 | reverse-iteration loop (looping backwards)...
11. `...if (nums[j] === target) {...`                           | ...if indexed item is targed...
12. `matchedPositions[1] = j; break;`                           | ......pass the match into `matchedPositions` and break the reverse-iteration
13. `return matchedPositions;`                                  | return result `matchedPositions`

```javascript
/* the concern is to return first and last item of a target within an ascending array
 * - use reverse iteration
 * - use linear search
 *  
*/

/* INITS */
const nums = []

/* WORK */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
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
console.log(searchRange(nums, 0))
/* 
Array(2) [1, 3]
searchRange2: 7.93212890625ms
```

#### break vs continue
* break jumps out of the **WHOLE** looP
* `continue` jumps over **SINGLE ITERATION**

![continue_statement_w3_example]({{ site.url }}/assets/img000653.png)

### binary search
* [binary_search](2020-04-14-draft-js-first-last-array-position-binary-search.md)

### sources
* [source_linear_iteration]({{ site.url }}/assets/2020-04-14-linear-iteration.js)
* [source_reverse_iteration]({{ site.url }}/assets/2020-04-14-first-last-reverse-iteration.js)
