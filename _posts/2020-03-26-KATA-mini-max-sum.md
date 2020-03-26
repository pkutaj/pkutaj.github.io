---
layout: post
title: programming > kata > mini max sum problem
categories: [programming]
---
## the case	of min and max sum within array
* the question is how to find a maximum and minimum sum in an array (of 5 items) when summing only 4 items (`(array.length)-1`)
* there is an array with 5 items `array = [4,5,1,1,2]`
- [x] find a minimal sum: **1+1+2+4 = 8**
- [x] find a maximal sum: **1+2+4+5 = 12**

## toc
<!-- TOC -->

- [IDEA](#idea)
- [STEP-1 inverse init to MINVALUE and MAXVALUE](#step-1-inverse-init-to-minvalue-and-maxvalue)
- [STEP-2 get arrays minVal and maxVal](#step-2-get-arrays-minval-and-maxval)
- [STEP-3 get maxSum and minSum](#step-3-get-maxsum-and-minsum)
- [sources](#sources)

<!-- /TOC -->

## findings
### IDEA
* in order to get a maxSum and minSum we need to find: (1)
    * minValue of an array: `1`
    * maxValue of an array: `5`
* get a sum of array items
* for the maxSum, do `arraySum - maxValue`
* for the minSum, do `arraySum - minValue`


### STEP-1 inverse init to MIN_VALUE and MAX_VALUE
* note **INVERSE**
* this is the init value that will later be compared in each iteration with the current value 

```JavaScript
/* INIT */
let minVal = Number.MIN_VALUE;
let maxVal = Number.MAX_VALUE;
```

### STEP-2 get arrays minVal and maxVal

```javascript
//1. INIT
let array = [4,5,1,1,2]
let maxVal = Number.MIN_VALUE; 
let minVal = Number.MAX_VALUE;

//2. RE-ASSIGNMENT
for(i; i<array.length; i++) {
minVal = Math.min(array[i], minVal);
maxVal = Math.max(array[i], maxVal);
arraySum += array[i];
}
```

### STEP-3 get maxSum and minSum

```javascript
 
/* The aim of this script is to exercise arrays. 
 * Finding a minimal and maximal sum of 4 items within the array of 5 items
 * /


/* INITS */
let array = [4,5,1,1,2]
let arraySum = 0;
let i = 0;
let minSum = 0;
let maxSum = 0; 
let maxVal = Number.MIN_VALUE;
let minVal = Number.MAX_VALUE;

/* WORK */
for(i; i<array.length; i++) {
minVal = Math.min(array[i], minVal);
maxVal = Math.max(array[i], maxVal);
arraySum += array[i];
}

minSum = arraySum - maxVal;
maxSum = arraySum - minVal;

/* OUTPUT */
console.log(`the array provided is ${array}`);
console.log(`the sum of all items is ${arraySum}`);
console.log(`the minimal Value is ${minVal}`);
console.log(`the maximal Valus is ${maxVal}`);
console.log(`the minimal Sum is ${minSum}`);
console.log(`the maximal Sum is ${maxSum}`);

/* TEST RUN: PASS
 * the array provided is 4,5,1,1,2
 * the sum of all items is 13
 * the minimal Value is 1
 * the maximal Valus is 5
 * the minimal Sum is 8
 * the maximal Sum is 12
 * /
```

### sources
* [source_code]({{ site.url }}/assets/2020-03-26-KATA-mini-max-sum.js)

