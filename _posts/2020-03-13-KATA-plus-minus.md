---
layout: post
title: JavaScript > KATA > Plus Minus
categories: [programming]
---

## the case	of array ratios 
* based on [Plus Minus, HackerRank](https://www.hackerrank.com/challenges/plus-minus/problem)
* the question is to calculate the ratios in array of integers
    * positive integers / total
    * negative integers / total
    * zeroes / total

```js
const arr = [-4, 3, -9, 0, 4, 1]
```

* this time, brevity over readibility, just to experience the difference (ET)


## toc
<!-- TOC -->

- [toPrecision()](#toprecision)
- [CODE](#code)
- [sources](#sources)

<!-- /TOC -->

## findings

### toPrecision()
* typesetting in Javascript done with `parse-`family of methods
* once that has been parsed to a float, you can use `toPrecision()` 


### CODE

```javascript
/* 
 * the aim of this script is to calculate the ration/fraction of positive/negative/zero values to the sum of items
 * the aim is to be precise to 6 decimal places
 */

/* INITS */
const arr = [-4, 3, -9, , 0, 4, 1]
const arrLength = arr.length;
let positive = 0;
let zero = 0;
let negative = 0;
let i = 0;

/* ROUNDING FUNCTINO */
function roundToFourDecimals(x) {
    return Number.parseFloat(x).toPrecision(4);
}

/* DO THE WORK */
for (i; i < arrLength; i++) {
    arr[i] > 0 ? positive++ :
        arr[i] === 0 ? zero++ :
            arr[i] < 0 ? negative++ :
                null
if(i === (arrLength-1)) {
    positive /= arrLength
    negative /= arrLength
    zero /= arrLength
}
            }

/* OUTPUT */
console.log(roundToFourDecimals(positive))
console.log(roundToFourDecimals(negative))
console.log(roundToFourDecimals(zero))

/* 
0.4286
0.2857
0.1429
*/
```

### sources
* [source code]({{ site.url }}/assets/2020-03-13-KATA-plus-minus.js)
* [VSCode Debugging - Conditional Breakpoints](https://ephos.github.io/posts/2017-9-10-VSCode-Debugging-CondBreakPoint)
* [Number.prototype.toPrecision() - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)