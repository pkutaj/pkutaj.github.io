---
layout: post
title: KATA > JavaScript > Sum of Array with template literals and proper type-setting
categories: [powershell]
---

## the case	
* the question is
    * Given an array of integers, find the sum of its elements
    * e.g. `let arr = [1,2,3]` should return `6`
    * utilize template literals
    * 

## toc
<!-- TOC -->

- [sources](#sources)

<!-- /TOC -->

## findings
CODE                  | COMMENT
----------------------|---------------------------------------------------------------------------
`let runningSum = 0;` | this has to be initiated to `0` value as a way to **type-set** the binding
`let total = 0;`      | same above, otherwise `Parse.Int()` would have to be utilized

```js
/* INITS */
let sumMe = [1, 2, 3];
let sumMeLength = sumMe.length
let runningSum = 0;
let total = 0;
let i;

/* WORK */
for (i = 0; i < sumMeLength; i++) {
    runningSum += sumMe[i]
    console.log(
        `the running sum at the ${i+1}th item is ${runningSum}`
        )
    if (i === (sumMe.length - 1)) total = runningSum
}
console.log(
    `the total is ${total}`
    );
```

![console_output_working]({{ site.url }}/assets/img000456.png)

### sources
* [source_code]({{ site.url }}/assets/2020-02-11-KATA-JS-sum-of-array.js)
* [parseInt() - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)