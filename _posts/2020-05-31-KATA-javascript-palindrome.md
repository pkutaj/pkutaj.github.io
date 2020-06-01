---
layout: post
title: KATA > javascript > palindrome
categories: [javascript]
---

## overview
The concern is to document the [(4) Palindrome Number - LeetCode](https://leetcode.com/problems/palindrome-number/)

## toc
<!-- TOC -->

- [(1) MINE](#1-mine)
- [(2) ALG](#2-alg)
    - [(2.1) edge cases](#21-edge-cases)
    - [(2.2) revert the last half](#22-revert-the-last-half)
    - [(2.3) stop at the right place](#23-stop-at-the-right-place)
- [(2.4) CODE](#24-code)
- [sources](#sources)

<!-- /TOC -->

## findings

### (1) MINE
* a rather classical brute force approach from both sides

```javascript
const isSingleDigit = arr => arr.length === 1 ? true : false;

function isPalindrome(x) {
    let arr = Array.from(String(x), Number)
    let frontIndex = 0
    let backIndex = arr.length - 1
    if(isSingleDigit(arr)) return true
    while (frontIndex < backIndex) {
        if(arr[frontIndex] !== arr[backIndex]) return false;
        frontIndex++;
        backIndex--;
    }
    return true;
}
```

### (2) ALG
* kind of divide and conquer by smartly using math + `Math` object in Javascript

#### (2.1) edge cases
* negative numbers are not palindrome 🠊 `false` for all negatives

#### (2.2) revert the last half
* For number 1221, if we do 1221 % 10, we get the last digit 1
* to get the second to the last digit, we need to remove the last digit from 1221
* 🠊 we could do so by dividing it by 10, 1221 / 10 = 122. 
* 🠊 we can get the last digit again by doing a modulus by 10, 122 % 10 = 2
* 🠊 multiply the last digit by 10 and add the second last digit, 1 * 10 + 2 = 12, it gives us the reverted number we want. 
* Continuing this process would give us the reverted number with more digits.

#### (2.3) stop at the right place
* Since we divided the number (1221) by 10, and multiplied the reversed number by 10 (1*10 + 2), when the original number is less than the reversed number, it means we've processed half of the number digits.

### (2.4) CODE 

STEP# | CODE                             | COMMENT
------|----------------------------------|-----------------------------------------------------------------------------------------
1     | `if (x < 0) return false`        | negatives are `false`
2     | `if (x < 10) return true`        | positive single-digits are `true`
3     | `if (x % 10 === 0) return false` | multiples of 10 are `false`
4     | `let rev = 0`                    | initiate reversed variable
5     | `while (x >= 10)..`              | start a loop until reduced `x` is 10 or single-digit
5.1   | `..let cur = x % 10`             | binding the last digit of the iteration via % 10 (1234 % 10 🠊 4)
5.2   | `..rev = rev*10 + cur`           | iterativelly build-up the reversed variable by (1234 🠊 4 in first iteration; 43 in 2nd)
5.3   | `..if (x === rev) return true`   | `true` if `x` equals the newly created `rev`
5.4   | `..x = Math.floor(x / 10)`       | popping the int by "flooring" the result of /10 (1234/10 = 123.4 🠊 123)
5.5   | `..if (x === rev) return true`   | `true` if reduced `x` equals the newly created `rev`
5.6   | `..if (x < rev) return false;`   | `false` if reduced `x` gets to be smaller than the built-up `rev`
6     | `return false`                   | for the longest cases (diff in the middle such as 77778777)

```javascript
var isPalindrome = function(x) {
    if (x < 0) return false;        // 1
    if (x < 10) return true;        // 2
    if (x % 10 === 0) return false; // 3
    let rev = 0;                    // 4
    while (x >= 10) {               // 5
        let cur = x % 10;           // 5.1
        rev = rev*10 + cur;         // 5.2
        if (x === rev) return true; // 5.3
        x = Math.floor(x/10);       // 5.4
        if (x === rev) return true; // 5.5
        if (x < rev) return false;  // 5.6
    }
    return false;                   // 6
};
```

### sources
* [Tilde or the Floor? Practical use for JavaScript bitwise operators](http://rocha.la/JavaScript-bitwise-operators-in-practice)
* [(4) Palindrome Number - LeetCode](https://leetcode.com/problems/palindrome-number/)