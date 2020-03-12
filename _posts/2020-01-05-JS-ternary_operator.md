---
layout: post
title: JavaScript > The neglected ellegance of ternary operators
---

## the case	
the puzzle is, if ternary operators are something to be used, used efficiently and in an **elegant manner**

## solution
There is space for an elegant use I believe, but it seems that even though ternary operators are part of JS specs since 1997, they do not seem to be widely used. 

## sources
* [mdn - Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
* [stackoverflow - Damon's cool answer](https://stackoverflow.com/a/45022741)

## terminology
* conditional binding 
* conditional operator
* falsy
* ternary operator
* truthy

## toc
<!-- TOC -->

- [history](#history)
- [definition](#definition)
- [what about else IFs ? - conditional chains](#what-about-else-ifs----conditional-chains)
- [falsy expressions and conditions](#falsy-expressions-and-conditions)
- [multiple ternary operators](#multiple-ternary-operators)
- [elegant conditional bindings](#elegant-conditional-bindings)

<!-- /TOC -->

## changelog

### history
* implemented in ECMAscript 1 edition in 1997!

```js
function findGreater(a, b) {
  return a > b ? "a is greater" : "b is greater";
}
```

### definition
* the only JS opetator that takes three operands
> condition ? exprIfTrue : exprIfFalse
* kind of resembling excel, but can be used to write succint and short expressions

###  what about else IFs ? - conditional chains
* operator is right-associative

```js

function example(…) {
    return condition1 ? value1
         : condition2 ? value2
         : condition3 ? value3
         : value4;
}

// Equivalent to:

function example(…) {
    if (condition1) { return value1; }
    else if (condition2) { return value2; }
    else if (condition3) { return value3; }
    else { return value4; }
}
```

###  falsy expressions and conditions
* see that even null, undefined, NaN, 0 and empty string are possible falsy espressions!

```js
function greeting(person) {
    var name = person ? person.name : "stranger";
    return "Howdy, " + name;
}
console.log(greeting({name: 'Alice'}));  // "Howdy, Alice"
console.log(greeting(null));             // "Howdy, stranger"​​​​​
```

###  multiple ternary operators
* no problem, but not widely used

```js
let bar = 'a'
let foo = (
  bar === 'a' ? 1 : // if
  bar === 'b' ? 2 : // else if
  bar === 'c' ? 3 : // else is
  null              // else 
)
// foo === 1
```

### elegant conditional bindings 
* you can use these **conditional bindings** in a quite elegant manner 

```js
let num = -20;
let value = (
  num > 0 ? 'positive' : // if
  num < 0 ? 'negative' : // else-if
  num === 0 ? 'zero':  // else-if
  null  // else
)
// value === 'negative'
```
