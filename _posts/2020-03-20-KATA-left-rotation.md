---
layout: post
title: Programming > KATA > array rotation
categories: [programming]
---
## the case	of array rotation
* from [Left Rotation — HackerRank](https://www.hackerrank.com/challenges/array-left-rotation/problem)
* the question is the rotation operation of an array, in particular, a left rotation
* given an array `[1,2,3,4,5]`, 2 left rotations would reshuffle the structure by moving the first two items to the end and creating `[3,4,5,1,2]`
* the aim is to write a function that accepts
    * number of integers
    * number of rotations

## toc
<!-- TOC -->

- [shifts and pops](#shifts-and-pops)
- [unshifting and pushing](#unshifting-and-pushing)
- [queuing](#queuing)
- [CODE](#code)
- [OUTPUT](#output)
- [sources](#sources)

<!-- /TOC -->

## findings
### shifts and pops
* you can remove the last array's item by `pop()` method

![pop_method]({{ site.url }}/assets/2020-03-12-01.png)

* you can remove the first array's item by `shift()` method

![shift_method]({{ site.url }}/assets/2020-03-12-02.png)

### unshifting and pushing
* the `push()` adds an item to the end of an array

![push_method]({{ site.url }}/assets/2020-03-17-01.png)

* the `unshift()` adds an item to the beginning of an array

```javascript
> let arr = [1,2,3];
> arr.unshift(0);
> arr
[ 0, 1, 2, 3 ]
```

### queuing
* this: shifting and pushing methods are associated with the queue data structure
* the dynamic principle is FIFO: first in, first out
* in a queue, however, you **DEQUEUE** and **ENQUEUE**, with **HEAD** and **TAIL** being the  beginning and the end of a queue

### CODE

```javascript
/* 
 * the aim of this script is to left rotate an array passed into a functino
 */

/**
 * 
 * @param {number[]} array - array to be rotated
 * @param {number} rotations - number of rotations
 */

function rotateArray(array, rotations) {
  let i = 0; 
  for (i; i<rotations; i++) {
    array.push(array[0]);
    array.shift(array[0]);
    console.log(array);
  }
  
}

rotateArray([1,2,3,4,5], 45)
```

### OUTPUT

```
[ 2, 3, 4, 5, 1 ]
[ 3, 4, 5, 1, 2 ]
[ 4, 5, 1, 2, 3 ]
[ 5, 1, 2, 3, 4 ]
[ 1, 2, 3, 4, 5 ]
[ 2, 3, 4, 5, 1 ]
[ 3, 4, 5, 1, 2 ]
[ 4, 5, 1, 2, 3 ]
[ 5, 1, 2, 3, 4 ]
[ 1, 2, 3, 4, 5 ]
[ 2, 3, 4, 5, 1 ]
[ 3, 4, 5, 1, 2 ]
[ 4, 5, 1, 2, 3 ]
[ 5, 1, 2, 3, 4 ]
[ 1, 2, 3, 4, 5 ]
[ 2, 3, 4, 5, 1 ]
[ 3, 4, 5, 1, 2 ]
[ 4, 5, 1, 2, 3 ]
[ 5, 1, 2, 3, 4 ]
[ 1, 2, 3, 4, 5 ]
[ 2, 3, 4, 5, 1 ]
[ 3, 4, 5, 1, 2 ]
[ 4, 5, 1, 2, 3 ]
[ 5, 1, 2, 3, 4 ]
[ 1, 2, 3, 4, 5 ]
[ 2, 3, 4, 5, 1 ]
[ 3, 4, 5, 1, 2 ]
[ 4, 5, 1, 2, 3 ]
[ 5, 1, 2, 3, 4 ]
[ 1, 2, 3, 4, 5 ]
[ 2, 3, 4, 5, 1 ]
[ 3, 4, 5, 1, 2 ]
[ 4, 5, 1, 2, 3 ]
[ 5, 1, 2, 3, 4 ]
[ 1, 2, 3, 4, 5 ]
[ 2, 3, 4, 5, 1 ]
[ 3, 4, 5, 1, 2 ]
[ 4, 5, 1, 2, 3 ]
[ 5, 1, 2, 3, 4 ]
[ 1, 2, 3, 4, 5 ]
[ 2, 3, 4, 5, 1 ]
[ 3, 4, 5, 1, 2 ]
[ 4, 5, 1, 2, 3 ]
[ 5, 1, 2, 3, 4 ]
[ 1, 2, 3, 4, 5 ]
```

### sources
* [source_code]({{ site.url }}/assets/2020-03-20-left-rotation.js)
* [JavaScript Programming with Visual Studio Code](https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support)


