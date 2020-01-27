---
layout: post
title: NODE > Export classes using module.exports
---
## the case	
the question is, how to export classes to another files / modules

## toc
<!-- TOC -->

- [STEP-1 assign the class to module.exports](#step-1-assign-the-class-to-moduleexports)
- [STEP-2 assign the require statement to a binding and instantiate](#step-2-assign-the-require-statement-to-a-binding-and-instantiate)
- [STEP-3 construct](#step-3-construct)
- [sources](#sources)

<!-- /TOC -->

## findings
### STEP-1 assign the class to module.exports
* in the referred-to file
```js
//input.js
class Input {
     constructor(transactionCurrency, counterCurrency, amountExchanged) {
        this.transactionCurrency = transactionCurrency;
        this.counterCurrency = counterCurrency;
        this.amountExchanged = amountExchanged;
    }

};
module.exports = Input; //STEP-1
```  

### STEP-2 assign the require statement to a binding and instantiate
* in the referring file

```js
//consoleInput.js
const Input = require("./input") //STEP-2
```

### STEP-3 construct
```js
const Input = require("./input")
let consoleInput = new Input();
```

### sources
* [How to use module.exports in Node.js](https://stackabuse.com/how-to-use-module-exports-in-node-js/)