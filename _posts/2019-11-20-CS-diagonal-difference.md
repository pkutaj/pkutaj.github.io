---
layout: post
title: KATA > ARRAYS > Diagonal difference
---
## the case	of diagonal difference
* the question is the absolut difference in a diagonal relationship of a static array containing 3 items, for example...

```
1 2 3
3 4 5 
9 8 9
```

* would return `|14 - 16| = 2`
* write the function that takes the array-of-arrays and return **the absolute difference** of the sum of diagonals

## toc
<!-- TOC -->

- [CODE](#code)
- [sources](#sources)

<!-- /TOC -->

## findings
### CODE

CODE                                                                    | COMMENT
------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------
1. `let j = 0;`                                                         | the index of primaryDiagonal running sum (forward-oriented)
2. `let k = 2;`                                                         | the index of secondaryDiagonal running sum (backward-orited)
3. `for (i = 0; i < diagonalsLength; i++)`                              | a single loop does the trick, with the usage of 3 indexes; default `i` and `j` + `k` described above
4. `absoluteDifference = Math.abs(primaryDiagonal - secondaryDiagonal)` | use the `Math` object to calculate the absolute value

```js
/* 
 * the aim of this script of to return an absolute difference of the sum of diagonals in array of arrays
 */

/* INITS */
const diagonals = [
    [1, 2, 3],
    [3, 4, 5],
    [9, 8, 9]
];
const diagonalsLength = diagonals.length;
let primaryDiagonal = 0;
let secondaryDiagonal = 0;
let absoluteDifference = 0;
let i = 0;          
let j = 0;                                                                  //1.
let k = 2;                                                                  //2. 

/* WORK */
function diagonalDifference(diagonals) {
    for (i = 0; i < diagonalsLength; i++) {                                 //3. 
        primaryDiagonal += diagonals[i][j];
        console.log(`round ${i} primaryDiagonal is ${primaryDiagonal}`)
        j++;
        secondaryDiagonal += diagonals[i][k]
        k--;
        console.log(`round ${i} secondaryDiagonal is ${secondaryDiagonal}`)
    }
    absoluteDifference = Math.abs(primaryDiagonal - secondaryDiagonal)      //4. 
    console.log(`The absolute difference of diagonal sums is ${absoluteDifference}`)
}

/* CALL */
diagonalDifference(diagonals)
```

### sources
* [Math.abs - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)