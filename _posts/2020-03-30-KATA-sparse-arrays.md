---
layout: post
title: programming > KATA > sparse arrays
categories: [programming]
---
## the case	of sparse arrays
* based on [Sparse Arrays - HackerRank](https://www.hackerrank.com/challenges/sparse-arrays/problem)
* the question is to find how many times do query strings appear in input strings
    * there is a collection of **INPUT STRINGS** `strings= ["ab", "ab", "abc"]`
    * there is a collection of **QUERY STRINGS** `queries = ["ab", "abc", "bc"]`
    * there is a collection of **RESULTS** `results = [2,1,0]`
* the input consists of 
    * integer defining the size of an array of input strings
    * input strings
    * integer defining the size of an array of query strings
    * query strings

## toc
<!-- TOC -->

- [double loop as a cartesian product](#double-loop-as-a-cartesian-product)
- [properly initialize results array](#properly-initialize-results-array)
- [CODE](#code)
- [sources](#sources)

<!-- /TOC -->

## findings
### double loop as a cartesian product
* the idea is a simple double looping, as you need to do a cartesian product, i.e. `strings` **X** `queries`
* you test each query against each string, in this scenario there's 9 iterations with `queries.count` number of `results`
* the following **IS NOT WORKING**; getting `NaN` when trying to increment an empty array

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
if(queries[i] === strings[j]) results[i]++;
}};
```

* why ? 
* you cannot increment `results[0]`, since it is initialized only as an empty array

### properly initialize results array
* you need to define the size of `results` via `queries.length` and initialize those values to `0`
* [Array() constructor - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)
* use the `.fill()` after a constructor to initialize the values to a parameter
    * our example `let results = new Array(queriesSize).fill(0);`

### CODE

```javascript
/* INITS */
const queries = ["ab", "abc", "bc"];
const strings = ["ab", "ab", "abc"];
const stringSize = strings.length;
const queriesSize = queries.length;
let i = 0;
let results = new Array(queriesSize).fill(0);

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
* [source_code]({{ site.url }}/assets/2020-03-30-sparse-arrays.js)
* <https://stackoverflow.com/a/23326623/11082684>