---
layout: post
title: KATA > JavaScript > swap array items
---
## the case	
* the question is, how to swap the items of array. for example:
    * from `[1,2,3,4,5]`
    * get `[5,4,3,2,1]`
* constraint
    * use just a single array

## toc
<!-- TOC -->

- [sources](#sources)

<!-- /TOC -->

## solution
* still need a temp structure, but instead of utilizing the whole temp array that would be deleted at the end, we get away with the fact that the array is modifiable and we can `push()` and `pop()` at our will


CODE                                                         | COMMENT
-------------------------------------------------------------|-----------------------------------------------------------------------------
`let swapMe = [1,2,3,4,5,6]`                                 | an original array
`let i;`                                                     | loop index1, indexing the lower position
`let lastExchangedPosition;`                                 | loop index2, indexing the upper position
`let middlePosition = Math.floor(swapMe.length / 2)`         | the swap should go only up to the middle point
`for (i = 0; i < middlePosition; i++)`                       | the loop definition, iterating only to the middle point, w/ 0-indexing
`swapMe.push(swapMe[i]);`                                    | the creation of the auxiliary array item, temporarily holding the lower item
`let lastExtraPosition = swapMe.length -1`                   | bind the temp item position (the upper bound of the array)
`lastExchangedPosition = [lastExtraPosition -1 -i]`          | bind the current upper position (`i` is the lower one)
`swapMe[i] = swapMe[lastExchangedPosition];`                 | replace the lower with the upper
`swapMe[lastExchangedPosition] = swapMe[lastExtraPosition];` | replace the upper with the item held in the temp position
`swapMe.pop();`                                              | delete the temp item
`lastExchangedPosition--`                                    | decrement the upper index

```js
let swapMe = [1,2,3,4,5,6]
console.log("original array: " + swapMe )
let i;
let lastExchangedPosition;
let middlePosition = Math.floor(swapMe.length / 2)

for (i = 0; i < middlePosition; i++) {
    swapMe.push(swapMe[i]);
    let lastExtraPosition = swapMe.length -1
    lastExchangedPosition = [lastExtraPosition -1 -i]
    swapMe[i] = swapMe[lastExchangedPosition];
    swapMe[lastExchangedPosition] = swapMe[lastExtraPosition];
    swapMe.pop();
    lastExchangedPosition--;}

console.log("swapped array: " + swapMe)
``` 

### sources
[source_file]({{ site.url }}/assets/2020-02-08-kata-js-array-swapping.js)