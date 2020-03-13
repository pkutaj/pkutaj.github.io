---
layout: post 
title: programming > KATA > recursive design primer
categories: [programming]
---
## the case	of a recursive staircase
* the question is, how to build a staircase such as

```
   #
  ##
 ###
####
```

* where both base and height are equal to `n` 
* in the example above, `n = 4`
* the staircase is **right-aligned**
* the building block can be **definable by input**
* the last line is not preceded by any spaces

## toc
<!-- TOC -->

- [single-layer, left-aligned](#single-layer-left-aligned)
- [HYPO: split the parameter, use a helper function](#hypo-split-the-parameter-use-a-helper-function)
- [source](#source)

<!-- /TOC -->

## findings

### single-layer, left-aligned
* so you know how to get one layer, recursively and left-aligned

CODE                                | COMMENT
------------------------------------|-------------------------------------------------------------------------------------------------
`if (size === 1) { return block }`  | base case
`block + ... `                      | opening of the recursive case compensating for the fact that the parameter itself never executes
`recursiveBuilder(size - 1, block)` | recursive case

```js
function recursiveBuilder(size, block) {
    if (size === 1) { return block }
    else {
        return block + recursiveBuilder(size - 1, block)
    }
}
console.log(recursiveBuilder(4, "#"));

//PRINTS ####
```

* this is the recursive tree, with functions building on top 

```
function (4, #)
# + function(3, #)
# + # + function(2, #)
# + # + # + return # (base case, return #)
# + # + return ##
# + return ###
return ####
```

* you can paste any of the recursive function to visualize the stack-building of the recursive function on [the loupe](http://latentflip.com/loupe/)



### HYPO: split the parameter, use a helper function
* the hypothesis is to split the `size` parameter into
    * `whiteSpaceSize`
    * `blockSize`
    * add `whiteSpace` character, too
* example that would be used in the recursive desing

size | whiteSpaceSize | blockSize
-----|----------------|----------
5    | 4              | 1
5    | 3              | 2
5    | 2              | 3
5    | 1              | 4
5    | 0              | 5

* from there, you see that the base case `whiteSpaceSize === 0`
* we need a helper function because the builder does not care about the internal computation of whitespace and blocksize and whiteSpace character definition

CODE                                                                                 | COMMENT
-------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------
1. `let whiteSpaceSize = size - 1;`                                                  | the initialization of the size of the whiteSpace
2. `let blockSize = 1;`                                                              | the initialization of the size of the block is a constant `1`
3. `let whiteSpace = " ";`                                                           | the initializatino of the whiteSpace character is a constant empty string
4. `helpWithEnrichedParameters(whiteSpaceSize, whiteSpace, blockSize, block);`       | helper function with enriched parameters to achieve results
5. `if (whiteSpaceSize === 0) {console.log(block.repeat(blockSize))}`                | base case, printing only blocks to the console as the base of the staircase
6. `else {...}`                                                                      | recursive case with the two below statements
7. `console.log(whiteSpace.repeat(whiteSpaceSize) + block.repeat(blockSize))`        | the first case which is executed as last, with only a single block crowning the staircase
8. `helpWithEnrichedParameters(whiteSpaceSize -1, whiteSpace, blockSize + 1, block)` | the substraction of `whiteSpaceSize` and the addition of `blockSize` performing the recursion towards the base case

```js
/**
 * 
 * @param {number} size the size of base and height
 * @param {string} block the building block of the staircase
 */

function buildRightAlignedStaircase_recursively(size, block) {
    let whiteSpaceSize = size - 1;                                  //1. 
    let blockSize = 1;                                              //2.
    let whiteSpace = " ";                                           //3. 
    helpWithEnrichedParameters(whiteSpaceSize, whiteSpace, blockSize, block);           //4. 
}

function helpWithEnrichedParameters(whiteSpaceSize, whiteSpace, blockSize, block) {
    if (whiteSpaceSize === 0) {                                     //5.
        console.log(block.repeat(blockSize))                        //5. 
    } else {                                                        //6. 
        console.log(whiteSpace.repeat(whiteSpaceSize) + block.repeat(blockSize))        //7. 
        helpWithEnrichedParameters(whiteSpaceSize -1, whiteSpace, blockSize + 1, block) //8.
    }

}

buildRightAlignedStaircase_recursively(25, "@");
```

* the staircase resulting from the call above

```
                        @
                       @@
                      @@@
                     @@@@
                    @@@@@
                   @@@@@@
                  @@@@@@@
                 @@@@@@@@
                @@@@@@@@@
               @@@@@@@@@@
              @@@@@@@@@@@
             @@@@@@@@@@@@
            @@@@@@@@@@@@@
           @@@@@@@@@@@@@@
          @@@@@@@@@@@@@@@
         @@@@@@@@@@@@@@@@
        @@@@@@@@@@@@@@@@@
       @@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@
     @@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@
   @@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@
```

### source
* [source code]({{ site.url }}/assets/2020-03-02-KATA-the-staircase.js)