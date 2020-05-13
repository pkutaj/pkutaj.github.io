---
layout: post
title: programming > 2 general ways of array creation
categories: [programming]
---
## the case	of creating arrays
the question is, what is the general approach to creation arrays

## toc
<!-- TOC -->

- [declaration](#declaration)
- [initializer](#initializer)
- [constructor](#constructor)
- [javascript: the particularities of the dynamic loosely types languages](#javascript-the-particularities-of-the-dynamic-loosely-types-languages)
- [sources](#sources)

<!-- /TOC -->

## findings
* there are 2 ways how to initialize an array
* **NOTE:** array is always a **REFERENCE TYPE** even if the value they hold is a value type

![reference_types_declared_to_null]({{ site.url }}/assets/img000838.png)

* A reference type is stored as a reference (like a pointer) to an object instance.
* 🠊 `null` means a reference that isn't pointing to an instance of an object.
* Value types are stored as the values themselves, without any references.
* 🠊 it doesn't make sense to have a `null` value type — the value type by definition **CONTAINS A VALUE**.

### declaration
* the following does not instantiate, it just declares the binding with the type of array

```c#
Country[] countries = null
```

### initializer
*  you have the values to go in it ➔ use **INITIALIZER** with the values

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

* if the exact type is explicit on the left hand size, it is permitted to repeat the name of the type on the right-hand side♠ 

![remove_right_had_type_declaration]({{ site.url }}/assets/2020-05-05-array-initializer.gif)

### constructor
* you do not have the values to go in it ➔ use **CONSTRUCTOR** with the number of items that will be created to a default value of that type
* the default values of the reference types is `null` so if you construct an array of 10 items you define a fixed-size with 10 nulls that need to be populated

```c# 
Tickets[] tickets = new Tickets[10];
```

* for the array of integers 🠊 you would receive an array with 10 zeroes, because the default value of an integer is zero

```c#
int[] ints = new int[10];
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
