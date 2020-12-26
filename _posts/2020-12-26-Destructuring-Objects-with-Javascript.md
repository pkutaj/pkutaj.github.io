---
layout: post
title: Destructuring Objects with Javascript
categories: [js]
---
## usecase
The concern is documenting a new feature of javascript called **destructuring assignment** which I meet in an existing script that in effect publishes markdown docs to zendesk. The module in question is parsing hyperlinks and calls the function in this manner

```js
const { linksMap, linksRegexStr } = parseLinks();
```

— From <https://github.com/JupiterOne/docs/blob/master/zendesk/publish.js#L62>

<!-- TOC -->

- [1. definition](#1-definition)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. definition
* destructuring assignment (speaking objects, used with arrays, too) **unpacks** properties into separate bindings
so you go from compound data into primitive data again, right ? this is why that is destructuring you don't combine, you destructure, kind of extract again. 

![example]({{ site.url }}/assets/img002386.jpg)

### 2. sources
* <https://github.com/JupiterOne/docs/blob/master/zendesk/publish.js#L62>
* [Destructuring assignment — JavaScript — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
