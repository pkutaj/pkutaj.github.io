---
layout: post
title: kata > javascript > first and last array position — binary search
categories: [javascript]
---
## the case	of the binary search
* the question is, how could you get a first and last position of an item of an array utilizing the **BINARY SEACH** approach
    * lesson: someone made a comment about Hector Berlioz's education (he was self-taught): he had bad teachers
    * 🠊 I would never figured this out by myself: the leftMost part yes, but not the rightMost
    * after I understood, I optimized and re-read many times, but the initial insight is, I believe, algorithmic
    * after I understood, that in algorithms, there is condensed magic happening in a few lines of code 
    * these are canonical solutions that have been worked on for generations and are definitely not self-evident and there is some convention to them that is understood by the initiates


## toc
<!-- TOC -->

- [official solution: the rubberduck](#official-solution-the-rubberduck)
- [my solution](#my-solution)
- [RAW](#raw)
- [sources](#sources)

<!-- /TOC -->

## findings
### official solution: the rubberduck 
> Although the basic idea of binary search is comparatively straightforward, the details can be surprisingly tricky ... — Donald Knuth

STEP#             | CODE                                                          | COMMENT
------------------|---------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------
**1-MAIN()**      |                                                               |
1.1               | `def searchRange(self, nums, target):`                        | main function definition
**2-GET EXTREME** |                                                               |
2.0               | `left_idx = self.extreme_insertion_index(nums, target, True)` | get the left limit by passing array, target and the flag for left-search
2.1               | `def extreme_insertion_index(self, nums, target, left):`      | sub-routine
2.2               | `lo = 0`                                                      | init of the low index to `0` (start of array)
2.3               | `hi = len(nums)`                                              | init of the high index (length of array) — this is starting from `0`
2.4               | `while lo < hi`                                               | loop: run until `lo` reaches the end of the array..
2.5               | `..mid = (lo + hi) // 2`                                      | ..get the middle index by dividing the array size by 2
2.6               | `..if nums[mid] > target OR...`                               | if the the value of middle-index is greater than the search—item....
2.7               | `..(left and target == nums[mid])`                            | ..or you are looking for the left-limit (left is `true`) and the middle-index is matching the search—item
2.8               | `....hi = mid`                                                | ....remove the half of the array by replacing the middle–index by the top—index
2.9               | `..else: lo = mid+1`                                          | else you change the value of bottom-index to middle-index+1
2.10              | `return lo`                                                   | return bottom—index that equals not the left-limit
**3-VALIDATION**  |                                                               | **INVALIDATE IF...**
3.1               | `if left_idx == len(nums)..`                                  | the leftmost is returned as initial length — logical nonsense, possible from the algorithm
3.2               | `..or nums[left_idx] != target`                               | the leftmost is not equal to the search item — there is 0 matches
3.3               | `..return [-1, -1]`                                           | the value to return signifying no matches
**4-RETURN**      |                                                               | **FINALLY RETURN THE VALUES**
4.1               | `return [left_idx,..`                                         | the leftmost index bound to a variable already
4.2               | `self.extreme_insertion_index..`                              | run the function for looking the extreme..
4.3               | `(nums, target, False)..`                                     | ..but change the `left` parameter by passing `false` argument
4.4               | `..-1`                                                        | and importantly, subtract 1 from the result, as the function returns the position 1 to the right of the rightmost


```python
class Solution: 
    # returns leftmost (or rightmost) index at which `target` should be inserted in sorted
    # array `nums` via binary search.
    """ STEP-2 GET EXTREME """
    def extreme_insertion_index(self, nums, target, left): #2.1
        lo = 0          #2.2
        hi = len(nums)  #2.3

        while lo < hi:  #2.4
            mid = (lo + hi) // 2    #2.5
            if nums[mid] > target or (left and target == nums[mid]):    #2.6-2.7
                hi = mid            #2.8
            else:       
                lo = mid+1          #2.9

        return lo                   #2.10

""" STEP-1 MAIN() """
    def searchRange(self, nums, target):            #1.1
        """ STEP-2 GET EXTREME """
        left_idx = self.extreme_insertion_index(nums, target, True) #2.0

        # assert that `left_idx` is within the array bounds and that `target`
        # is actually in `nums`.
        """ **STEP-3 VALIDATION LOGIC** """
        if left_idx == len(nums) or nums[left_idx] != target:       #3.1-3.2
            return [-1, -1]     #3.3
        
        """ **STEP-4 RETURN** """
        return [left_idx, self.extreme_insertion_index(nums, target, False)-1]  #4.1-4.3
```

* the left-limit search continues by being rewritten into javascript

### my solution
* the solution is full of "patches" and I consider it not really elegant
    * that would have to be countered with something like performance testing

STEP-#    | CODE                                              | COMMENT
----------|---------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------
1         | `function searchRange(nums, target)`              | the main function declaration with 2 input params: nums array, and target
**2 SUB** | **getFirstPosition**                              | **return the index of the first instance of the target**
2         | `let leftMost = getFirstPosition(nums, target);`  | bind the value returned from `getFirstPosition(nums, target`)
**2 SUB** | **getFirstPosition**                              | **return the index of the last instance of the target**
2.1       | `let lo = 0;`                                     | init the `lo` to the first index
2.2       | `let hi = nums.length - 1`                        | init the `hi` to the last index
2.3       | `let mid;`                                        | declare the `mid`; init later
2.4       | `while (lo < hi) {..`                             | loop until `lo === hi` at which point you should have some result
2.5       | `..mid = Math.floor((lo + hi) / 2);`              | ..init the mid point for each iteration
2.6       | `..if (nums[mid] >= target) {..`                  | ..when the value of the mid point is >= target..
2.7       | `....hi = mid`                                    | ....identify the `hi` with the `mid` and therefore remove the values greater than `mid`
2.8       | `..} else {..`                                    | ..else (if the value of the mid point is < target)
2.9       | `....lo = mid + 1}`                               | ....set the `lo` one position to the right of the mid point at that is logically the extreme position
2.10      | `if (nums[lo] === target) { return lo }..`        | the loop has cut the array and left a single value. if this value is the target, return `lo` as the leftMost value
2.11      | `..else { return undefined }`                     | else return `undefined` and quit early
**3 SUB** | **validate and quit early**                       |
3         | `if (leftMost === undefined) { return [-1, -1] }` | if the first function returs `undefined` quit the search with `[-1,-1]`
**4 SUB** | **getLastPosition**                               |
4         | `let rightMost = getLastPosition(nums, target);`  |
4.1       | `let lo = 0;`                                     | init the `lo` to the first index
4.2       | `let hi = nums.length - 1`                        | init the `hi` to the last index
4.3       | `let mid;`                                        | declare the `mid`; init later
4.4       | `if (nums[hi] === target) return hi`              | first pre-emptive check in case the target is the last item initially
4.5       | `while (lo < hi) {..`                             | loop until lo === hi, while the array is being reduced with the use if the `mid` point
4.6       | `..mid = Math.floor((lo + hi) / 2);`              | ..assign the `mid` in the scope of the loop
4.7       | `..if (nums[mid] > target) {..`                   | ..test if `mid` is to the **CERTAINLY** (pointing to the value greater than) from the `target`..
4.8       | `....hi = mid`                                    | ....if `true` reduce the array by turning `mid` into `hi`
4.9       | `..else {..`                                      | ..else `mid` is either pointing to the same value, or value lower than target
4.10      | `....lo = mid + 1`                                | ...in that case, move the `lo` one position to the right from `mid`
4.11      | `return lo - 1;`                                  | the `lo` is pointing ` position to the right of the rightmost position of the target ➔ subtract 1 to return the proper position
**5 SUB** | **getLastPosition**                               |
5         | `else { return [leftMost, rightMost]`             | the actual result, voila

```javascript
/* AIM */
// the concern is use BINARY SEARCH to return first and last array item using binary search

let nums = [1];
let target = 1;

function getFirstPosition(nums, target) {   //2
    let lo = 0;                 //2.1
    let hi = nums.length - 1    //2.2
    let mid;                    //2.3
    while (lo < hi) {           //2.4
        mid = Math.floor((lo + hi) / 2);    //2.5
        if (nums[mid] >= target) {          //2.6
            hi = mid                        //2.7
        } else {                            //2.8
            lo = mid + 1                    //2.9
        }
    }
    if (nums[lo] === target) { return lo }  //2.10
    else { return undefined }               //2.11
}

function getLastPosition(nums, target) {    //4.
    let lo = 0;                             //4.1
    let hi = nums.length - 1                //4.2
    let mid;                                //4.3

    if (nums[hi] === target) return hi      //4.4
    
        while (lo < hi) {                   //4.5
            mid = Math.floor((lo + hi) / 2);    //4.6
        if (nums[mid] > target) {           //4.7
            hi = mid                        //4.8
        } else {                            //4.9
            lo = mid + 1                    //4.10
        }
    }
    return lo - 1;                          //4.11
}

function searchRange(nums, target) {                //1
    let leftMost = getFirstPosition(nums, target);  //2
    if (leftMost === undefined) return [-1, -1] //3
    let rightMost = getLastPosition(nums, target);  //4
    else return [leftMost, rightMost]           //5
}

console.time("getFirstAndLast");
console.log(searchRange(nums, target));
console.timeEnd("getFirstAndLast");
```

### RAW
> not important; selected raw dumped here

```
### STEP-1 inits: low, high
* define low and high, which is known (array is sorted)
* get middle index out of that, which is when you sum up the first and has position and divide by 2 

### STEP-2 inits: middle
* get the half of an array
* round it to down, to get an integer  if the number of items is odd
* for this use `math.floor((start + end)/2)`

### STEP-3 while loop
* when thinking about what looping structure to use, it occured to me that in this algorithm you don't need a **FOR LOOP**
* for loop seems more suitable for **BRUTE FORCE**, or that is how I typically use it
#### rightMost Index
* we've already know that to get the leftMost index 
    * you have the `=` operator in the comparison operation on the `hi` — with `>=`
    * you have `<` on the `lo`
    * if `mid` is `<` ➔ you need move the `lo` to `mid+1`
    * there is this symetry in comparisions
* now for the rightMost index you should just switch the operators

#### BINARY — working version
* readibility > brevity
* still an issue with the logical consistency


/* AIM */
// the concern is use BINARY SEARCH to return first and last array item using binary search

let nums = [1, 2, 2, 2, 4, 5];
let target = 2;

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
        if (nums[mid] > target) {
            hi = mid - 1
        } else {
            lo = mid
        }
    }
    return hi;
}

function searchRange(nums, target) {
    let firstAndLast = new Array(2)
    return firstAndLast = [getFirstPosition(nums, target), getLastPosition(nums, target)];
}

console.time("getFirstAndLast");
console.log(searchRange(nums, target));
console.timeEnd("getFirstAndLast");


* this is **DIVIDE AND CONQUER** approach so the first test has to be testing the relationship between
    * middlePoint
    * targetPoint
* we also need the following behaviour
    * lo has to be progressing and stop at the last occurence or target
    * ho has to be receding and stop at the last occurence of target
    * once you have only 1 item return it
    * initially if hi === target ➔ done, but that's irrelevant

#### (1) IF nums[target] > target..


T M 
0 1 1 3
l     h


##### (1.1) ..THEN hi = mid ~ FAIL


T M 
0 1 
l h

* FAIL because of **INFINITE LOOP**, again ➔ if it is higher, you can be positive that one to the left is not excluding the `T`

##### (1.2.1) ..THEN hi = mid--.. ~ PASS

T
0
l
h


* PASS as the loop breaks and you return the `h` as search-result
* another scenario


//STEP-1
  T M
0 0 2 3 4 5
l         h

//STEP-2
M T
0 0
l h

//you need to switch to the ELSE here


##### (1.2.2) ..ELSE lo = mid++ ~ FAIL
* what do you do if `!mid[nums] > target` like in the STEP-2 above?


//STEP-2
M T
0 0
l h


* you cannot just identify `l` with `M` that leads to the infinite loop
* you should then increment `M` with `l=M++`


//STEP-3
T
M
0
l
h


* in this stage you
    1. test if `nums[mid] > target`
    2. if `true` ➔ `hi = mid--`
    3. else ➔ `lo = mid++`

* let us falsify this

##### (1.2.2) FALSIFICATION
* here, you should have tough cases at hand


//INIT
  T
  M
1 2 3
l   h

//STEP-1
M
3
l
h
! FAIL; T is removed from the subarray


* this logic is not working as you cannot do in/decrementation from the both sides

##### (1.2.3) ..THEN lo = mid
* this is the common place where we get **STUCK**


//INIT
  T
  M
1 2 3
l   h

//STEP-1
T
M
2 3
l h

! FAIL ➔ infinite loop


* so you need some enhancement of the first condition that stems from the necessary implictions for hi
* would this happen even with high number of targets

##### (1.2.3) INVESTIGATION


//INIT
    M     T
1 2 2 2 2 2
l         h

//STEP-1 ➔ l=M
  M   T
2 2 2 2
l     h

//STEP-2 ➔ l=M
  M T
2 2 2
l   h

//STEP-3 ➔ l=M
M T
2 2
l h

!infinite loop again


* so if you have array of 2, the `lo` === `mid` which should be, somewhat, taken into consideration when writing the test
* there if `h === T` return `T` else return `M`
* **THE INVESTIGATION FAILS HERE. I WOULD NEVER FIGURED THIS OUT**
```

### sources
* [source_code]({{ site.url }}/assets/2020-04-22 - binary search.js)
* [Find First and Last Position of Element in Sorted Array - LeetCode](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
* [JavaScript Break and Continue](https://www.w3schools.com/js/js_break.asp)
* [Measuring JavaScript Performance with console.time - A Drip of JavaScript](http://adripofjavascript.com/blog/drips/measuring-javascript-performance-with-console-time.html)