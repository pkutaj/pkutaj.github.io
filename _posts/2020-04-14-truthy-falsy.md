---
layout: post
title: javascript > truthy and falsy
categories: [javascript]
---
## the case	of truthy
the question is, what truthy and falsy mean, here in the concept of JavaScript

## toc
<!-- TOC -->

- [falsies](#falsies)
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

### 8 falsies

VALUE          | COMMENT
---------------|--------------------------------------------------------------------------------
1. `false`     | The keyword false
2. `0`         | The number zero
3. `-0`        | The number negative zero
4. `0n`        | BigInt, when used as a boolean, follows the same rule as a Number. 0n is falsy.
5. `""`        | Empty string value
6. `null`      | null - the absence of any value
7. `undefined` | undefined - the primitive value
8. `NaN`       | NaN - not a number


### sources