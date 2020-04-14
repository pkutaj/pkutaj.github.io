---
layout: post
title: javascript > truthy and falsy
categories: [javascript]
---
## the case	of truthy
the question is, what truthy and falsy mean, here in the concept of JavaScript

## toc
<!-- TOC -->

- [sources](#sources)

<!-- /TOC -->

## findings
* used in tests
* truthy are expressions that evaluate to `true` in a test
* falsy are expressinos that evaluate to `false` in a test
* see the following example where `array.length === 0` evaluates to false and therefore is falsy

```javascript
> let matchedPositions = [];
> if(matchedPositions.length) {console.log("not empty")} else {console.log("empty")}

> empty

> matchedPositions.push(1)
> if(matchedPositions.length) {console.log("not empty")} else {console.log("empty")}

> not empty
```


### sources