---
layout: post
title: javascript > looping through arrays > for of loop, array inits, scope
categories: [javascript]
---
## the case	of looping through arrays
the question is the use/history of the for of loop; how that can be applied on an example; but also how to use a nested loop properly; and also how to initialize array to array of integers (array of zeroes)

## toc
<!-- TOC -->

- [the for of loop as a loop structure](#the-for-of-loop-as-a-loop-structure)
- [initialize array to array of integers; use the new fill()](#initialize-array-to-array-of-integers-use-the-new-fill)
- [lesson on scope](#lesson-on-scope)
- [sources](#sources)

<!-- /TOC -->

## findings
### the for of loop as a loop structure
* With ES6, there is this new loop for **ITERABLES**; the `for of` loop is the structure used for iterating over objects within **THE ARRAY**
* there is also the **FOR IN LOOP** can be used on all **ENUMERABLE** objects, but realize the return may be in random order
* the for of is a new loop, replacing the deprecated `.foreach()`, and working on **ITERABLE COLLECTIONS** with `[symbol.iterator]`
* it does **NOT WORK ON OBJECTS**

* Example array

```js
let printerRecords = [
    {
        name: "HP",
        quantity: 3,
        amount: 300
    },
    {
        name: "Xerox",
        quantity: 5,
        amount: 750
    },
    {
        name: "Brother",
        quantity: 1,
        amount: 130
    },
    {
        name: "Brother",
        quantity: 3,
        amount: 390
    },
    {
        name: "Brother",
        quantity: 10,
        amount: 1300
    },
    {
        name: "Xerox",
        quantity: 8,
        amount: 900
    },
    {
        name: "HP",
        quantity: 7,
        amount: 1000
    },
    
];
```

```js
for(let printer of printerRecords) {
    console.log(printer.name);
}
//RESULT
//-----
//HP
//Xerox
//Brother
//Brother
//Brother
//Xerox
//HP
```

### initialize array to array of integers; use the new fill()

```javascript
/* INITS */
let results = new Array(queriesSize).fill(0);

/* WORK */
console.log(results);

/* Array(3) [0, 0, 0] ➔ PASS */

```

### lesson on scope
* I am usually initializing everything (indices and array sizes) upfront so that binding and recalculation of query size does not have to happen in the `for` statement
* but if doing a nested loop, you have to **RESPECT THE SCOPE**
* the nested loop runs only **ONCE** in the code below because `j` is initialized in the **GLOBAL SCOPE** and the counter is not reset (re-initialized to `0` properly)
* ... it has to start from `0` for each `i` 

```javascript
/* INITS */
const queries = ["ab", "abc", "bc"];
const strings= ["ab", "ab", "abc"];
const stringSize = strings.length;
const queriesSize = queries.length;
let i = 0;
let j = 0;
let results = new Array(queriesSize).fill(0);

/* WORK */
for (i; i<queriesSize; i++) {
for (j; j<stringSize; j++) {
if(queries[i] === strings[j]) results[i]++;
}};

/* OUTPUT */

console.log(results);

/* Array(3) [2, 0, 0] ➔ FAIL; j is not re-initialized when finished, but keeps incrementing */

```

* **NOTE** how `let j = 0;` is moved inside of the first loop to reset the counter so that each item is tested against each item

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

/* Array(3) [2, 1, 0] ➔ PASS */
```

### sources
* [for...of - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
* <https://stackoverflow.com/a/32802644/11082684>