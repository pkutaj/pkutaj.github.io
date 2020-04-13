---
layout: post
title: programming > 2 general ways of array creation
categories: [programming]
---
## the case	of creating arrays
the question is, what is the general approach to creation arrays

## toc
<!-- TOC -->

- [initializer](#initializer)
- [constructor](#constructor)
- [javascript: the particularities of the dynamic loosely types languages](#javascript-the-particularities-of-the-dynamic-loosely-types-languages)
- [sources](#sources)

<!-- /TOC -->

## findings
* there are 2 ways how to initialize an array

### initializer
1. you have the values to go in it ➔ use **INITIALIZER** with the values

```c#
string[] daysOfWeek = {
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
}
```
### constructor
2. you do not have the values to go in it ➔ use **CONSTRUCTOR** with the number of items

```c#
Tickets[] tickets = new Tickets[10];
```

### javascript: the particularities of the dynamic loosely types languages
* in the example below, you test each query against each string and you try to push an integer to an initially–empty array called `results`
* the following **IS NOT WORKING**; getting `NaN` when trying to push an int an empty array

```javascript
/* INITS */
const queries = ["ab", "abc", "bc"];
const strings= ["ab", "ab", "abc"];
const stringSize = strings.length;
const queriesSize = queries.length;
let i = 0;
let j = 0;
let results = []; //➔ ROOT CAUSE
/* WORK */
for (i; i<queriesSize; i++) {
for (j; j<stringSize; j++) {
if(queries[i] === strings[j]) results[i]++; //➔ ERROR: NaN
}};
```

* you need to define the size of `results` via `queries.length` and initialize those values **A RESPECTIVE TYPE** with `0`
* use the `.fill()` after a constructor to initialize the values to a parameter
    * our example `let results = new Array(queriesSize).fill(0);`

```javascript
/* INITS */
const queries = ["ab", "abc", "bc"];          //NOTE THE ARRAY CREATION: INIT
const strings = ["ab", "ab", "abc"];
const stringSize = strings.length;
const queriesSize = queries.length;
let i = 0;
let results = new Array(queriesSize).fill(0); //NOTE THE ARRAY CREATION: CONSTRUCT WITH VALUES VIA FILL();
/* WORK */
for (i; i < queriesSize; i++) {
    let j = 0;
    for (j; j < stringSize; j++) {
        if (queries[i] === strings[j]) results[i]++;
    }
};
/* OUTPUT */
console.log(results);
/* Array(3) [2, 1, 0] | PASS */
```

### sources
* * [Array() constructor - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)
