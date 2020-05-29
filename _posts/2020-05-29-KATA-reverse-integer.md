---
layout: post
title: programming > javascript > reverse integer
categories: [javascript]
---
## overview
The concern is to document the reverse integer KATA from [Reverse Integer - LeetCode](https://leetcode.com/problems/reverse-integer/)


## toc
<!-- TOC -->

- [instructions](#instructions)
- [CODE](#code)
- [findings](#findings)
- [exponential operations in Javascript](#exponential-operations-in-javascript)
- [bitness of ints](#bitness-of-ints)
    - [remove zeroes, but only at the end](#remove-zeroes-but-only-at-the-end)
    - [int into array of ints ?](#int-into-array-of-ints-)
    - [FAIL: -321](#fail--321)
- [ternary assignments instead of check-functions ?](#ternary-assignments-instead-of-check-functions-)
- [sources](#sources)

<!-- /TOC -->

## findings
### instructions

* RULE: use int32 [-2^31, 2^31-1]

IN       | OUT
---------|-----
123      | 321
-123     | -321
120      | 21
overflow | 0

### CODE

```javascript
/* The concern is to swap integers using to the "to the array and back approach */

const makeArray = x => Array.from(String(x), Number)
const removeZeroes = x => {
    while (checkZeroes(x)) {
        x = x / 10;
    }
    return x;
}
const checkZeroes = x => x % 10 === 0 ? true : false;
const makePositive = x => Math.abs(x);
const checkNegative = x => x < 0 ? true : false;
const checkInt32 = x => {
    if (x >= Math.pow(2, 31) || x < Math.pow(-2, 31)) { return true }
    else { return false }
}

var reverse = function (x) {

    let isNotInt32 = checkInt32(x);
    if (isNotInt32 || x === 0) return 0
    
    let isNegative = checkNegative(x);
    if (isNegative) x = makePositive(x);
    
    let isEndedWithZeroes = checkZeroes(x)
    if (isEndedWithZeroes) x = removeZeroes(x);

    let arrFromX = makeArray(x);
    let i = 0;
    let lastIndex = arrFromX.length - 1;
    let size = arrFromX.length;
    let mid = Math.floor(size / 2);

    while (i < mid) {
        let helper = 0;
        helper = arrFromX[i];
        arrFromX[i] = arrFromX[lastIndex]
        arrFromX[lastIndex] = helper;
        i++;
        lastIndex--;
    }

    let absResult = Number(arrFromX.join(""));
    isNotInt32 = checkInt32(absResult);
    if (isNotInt32) return 0
    if (isNegative) return -Math.abs(absResult);
    return absResult;
};
```

### findings
### exponential operations in Javascript
* since ES7 (ECMAScript 2016) there is an exponentiation operator `**` for numbers 🠊 `12**2` returns `144`
* else, use `Math.Pow(12,2)`

### bitness of ints
* the default is int32, which in c# is `int`

Type  | Capacity
------|---------------------------------------------------------
Int16 | -32,768 to +32,767
Int32 | -2,147,483,648 to +2,147,483,647
Int64 | -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807

#### remove zeroes, but only at the end
> failed. strings are immutable. you can't work with them as you work with an array

* why? because with the reversed int, you can't have leading zeroes
10000 
* seems like some slicing is needed because, **REALIZE** you can't simply `pop()` a string, right? 

STEP# | CODE                                     | COMMENT
------|------------------------------------------|-----------------------------------------
1     | `let lastIndex = intToStr.length - 1`    | get the value of last index
2     | `if(intToStr[lastIndex] === "0")`        | if that indexed-value is "0" (string!)
3     | `intToStr = intToStr.slice(0,lastIndex)` | ..slice the last character of the string
4     | `continue`                               | ..and start the next iteration

```js
while (i<mid) {
        let lastIndex = intToStr.length - 1         //1
        if(intToStr[lastIndex] === "0") {           //2
            intToStr = intToStr.slice(0,lastIndex)  //3
            continue;                               //4
        } else {   
        }
    i++
}
```

#### int into array of ints ?
> failed idea

* i tried making it a string, from what i know but there seems to be a better idea, eh ? 
* instead of using `toString()` you use something newer, the `Array.from()` ECMAScript 2015 that makes the job much easier
* from [javascript - How to convert an integer into an array of digits - Stack Overflow](https://stackoverflow.com/questions/19182266/how-to-convert-an-integer-into-an-array-of-digits/19182309)
* note that you are also utilizing `String()` and `Number()` functions and that `Number()` is mapped in the mapping function optional parameter (it is a bit acrobatic this function)

```javascript
> let int = 13
> let arr1 = Array.from(String(int))
> arr1
[ '1', '3' ]
> let arr2 = Array.from(String(int), Number);
> arr2
[ 1, 3 ]
```

#### FAIL: -321
* what about negative int?
* make it work by testing it for negative
* fixed by a toothpick function checking for negative values and explanatory variable 
* after cleanup, the intro of the function is

```js
// const checkInt32 = x => {
    if (x >= Math.pow(2, 31) || x < Math.pow(-2, 31)) { return true }
    else { return false }
}

const checkNegative = x => x < 0 ? true : false;

var reverse = function (x) {
    
    let isNotInt32 = checkInt32(x);
    if (isNotInt32) return 0
    
    let isNegative = checkNegative(x);
    if (isNegative) x = Math.abs(x)
```

### ternary assignments instead of check-functions ? 
* it would be possible to assign the explanatory variable via conditional assignments supported by ternary statements
* still, I am trying to adhere to Single Responsibility Principle and "outsource" those tasks to the bunch of micro functions out of main
    * there is some space for OOP in JS
* but the solutions on the leetcode page are painfully simpler/faster, alas

### sources
* [Reverse Integer - LeetCode](https://leetcode.com/problems/reverse-integer/)
* [Math.pow() - JavaScript ~ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)
* [math - JavaScript exponents - Stack Overflow](https://stackoverflow.com/questions/5907063/javascript-exponents)
* [Array.from() - JavaScript ~ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
* [javascript - How to convert an integer into an array of digits - Stack Overflow](https://stackoverflow.com/questions/19182266/how-to-convert-an-integer-into-an-array-of-digits/19182309)
* [String.prototype.slice() - JavaScript ~ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
* [Array.prototype.join() - JavaScript ~ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)