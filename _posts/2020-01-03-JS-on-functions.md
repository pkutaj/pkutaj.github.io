---
layout: post
title: JS > On Functions
---
## the case
Ecmascript2015 came with a new way of writing functions

## solution/status
Currently there are three ways of creating functions
* function declaration
* function expression
* new arrow function

## TOC
<!-- TOC -->

- [pre-2015](#pre-2015)
- [DIFFERENCE BETWEEN FUNCTION EXPRESSIONS AND FUNCTION DECLARATION](#difference-between-function-expressions-and-function-declaration)
- [ENTER ARROW FUNCTION](#enter-arrow-function)

<!-- /TOC -->

## TERMINOLOGY
* arrow syntax
* concise
* scope
* function declaration
* function expression
* arrow function

## FINDINGS
### pre-2015
* two ways of declaring functions
* function declaration
    1. function keyword
    2. function name
    3. parameters within parenthesis
    4. code block within curly brackets

![function declaration]({{ site.url }}/assets/img000172.png)

* function expression
    § assign function to a variable
    1. var initialization (const in ecma 2015)
    2. function keyword
    3. parameters within parenthesis
    4. code block within curly brackets

![function expression]({{ site.url }}/assets/img000173.png)

### DIFFERENCE BETWEEN FUNCTION EXPRESSIONS AND FUNCTION DECLARATION
* not only syntactical, but also the control flow
    * function expressions are part of the regular top-to-down flow of control 
    * function declaration are exempt from this and moved immediately to the top of the script and initialized immidiately
    ➔ Function declarations are hoisted but function expressions are not

![different control-flow]({{ site.url }}/assets/img000174.png)

### ENTER ARROW FUNCTION
* arrow function
    1. variable declaration
    2. parameters in parenthesis
    3. arrow made from => (equal + gt)
    4. code block within curly brackets

![arrow functions]({{ site.url }}/assets/img000175.png)

* + if you have just a single argument, you don't need ()
* but without or with multiple 
* + if you are only using single line of code, you don't need return 
* + if you have only single line of code, you don't need curly barckets
    1. no parents with single arguments
    2. no curly brackets with single line of code
    3. no return keyword with single line of code			

![minified functions]({{ site.url }}/assets/img000176.png)

* with multiple lines of code you need to keep parameters within parentheses

![parameters in parenthesis]({{ site.url }}/assets/img000177.png)

## sources
* https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/apC.md#appendix-c-lexical-this
* [JavaScript Anonymous Functions](https://blog.scottlogic.com/2011/06/10/javascript-anonymous-functions.html)

