---
layout: post
title: KATA > CS > JS > Compare triplets, nested ternaries hands-on
---
## the case	
* the question is, given two arrays of triplets, we should compare the respectie indices and create a new array that should sum the score
* if `a=[17 28 30]` and `b=[99 16 8]` the `result = [2, 1]`
* i am using nested ternaries as a way to experience the structural and syntactical difference in the work with nested conditionals, not as a way to promote ternaries

## toc
<!-- TOC -->

- [CODE](#code)
- [sources](#sources)

<!-- /TOC -->

### CODE

CODE                                            | COMMENT
------------------------------------------------|----------------------------------------------------------------------------------------------
`let comparison = [0, 0];`                      | initialize the final array with zeros, otherwise `NaN` is returned (type-declaration kind-of)
`tripletA[i] > tripletB[i] ? comparison[0]++`   | if
`: tripletA[i] < tripletB[i] ? comparison[1]++` | else if
`: null`                                        | else - this is mandatory, as opposed to `if else-if` construct

```js

/* INITS */
const allScoresPersonA = [10, 1, 0, 1];
const allScoresPersonB = [1, 2, 3, 1];
let i;
let comparison = [0, 0];

/* WORK */
function compareTriplets(tripletA, tripletB) {
    const tripletLength = tripletA.length
    for (i = 0; i < tripletLength; i++) {
        tripletA[i] > tripletB[i] ? comparison[0]++
            : tripletA[i] < tripletB[i] ? comparison[1]++
                : null

        /*  if(tripletA[i] > allScoresPersonB[i]) {comparison[0]++}
         else if (tripletA[i] < allScoresPersonB[i]) {comparison[1]++} */
    }
    console.log(comparison)
}

/* TEST */
//--------
//STEP: loop through the triplets and return score at the end
/* TEST-START */
compareTriplets(allScoresPersonA, allScoresPersonB)
/* TEST-END */
//RESULT: PASS; Array(2) [1, 2]
//------------
```

### sources
* [source_code]({{ site.url }}/assets/2020-02-23-DRAFT-KATA-compare-triplets.js)
* [for each...in - JavaScript — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for_each...in)
* [for...of - JavaScript — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
* [Ternary Operators In JavaScript - DEV Community](https://dev.to/iandavid/ternary-operators-in-javascript-4inl)