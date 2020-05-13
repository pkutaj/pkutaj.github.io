---
layout: post
title: KATA > JavaScript > swap array items
categories: [programming]
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


STEP | CODE                                                         | COMMENT
-----|--------------------------------------------------------------|---------------------------------------------------------------------------
01   | `let swapMe = [1,2,3,4,5,6]`                                 | an original array
02   | `let i;`                                                     | loop index1, indexing the lower position
03   | `let lastExchangedPosition;`                                 | loop index2, indexing the upper position
04   | `let middlePosition = Math.floor(swapMe.length / 2)`         | axis point: the swap should go run around the axis (excluding axis itself)
05   | `for (i = 0; i < middlePosition; i++)..`                     | the loop definition, iterating only to the middle point, w/ 0-indexing
06   | `..swapMe.push(swapMe[i]);`                                  | the creation of the helper array item, temporarily holding the lower item
07   | `let lastExtraPosition = swapMe.length -1`                   | bind the temp item position (the upper bound of the array)
08   | `lastExchangedPosition = [lastExtraPosition -1 -i]`          | bind the actual upper position (`i` is the lower one)
09   | `swapMe[i] = swapMe[lastExchangedPosition];`                 | replace the lower with the upper
10   | `swapMe[lastExchangedPosition] = swapMe[lastExtraPosition];` | replace the upper with the item held in the helper
11   | `swapMe.pop();`                                              | delete the helper
12   | `lastExchangedPosition--`                                    | decrement the upper index

```js
let swapMe = [1,2,3,4,5,6]                  //01
console.log("original array: " + swapMe )
let i;                                      //02
let lastExchangedPosition;                  //03
let middlePosition = Math.floor(swapMe.length / 2)      //04

for (i = 0; i < middlePosition; i++) {      //05
    swapMe.push(swapMe[i]);                 //06
    let lastExtraPosition = swapMe.length -1            //07
    lastExchangedPosition = [lastExtraPosition -1 -i]   //08
    swapMe[i] = swapMe[lastExchangedPosition];          //09
    swapMe[lastExchangedPosition] = swapMe[lastExtraPosition];  //10
    swapMe.pop();                           //11
    lastExchangedPosition--;}               //12

console.log("swapped array: " + swapMe)
``` 

### sources
[source_file]({{ site.url }}/assets/2020-02-08-kata-js-array-swapping.js)