---
layout: post
title: NODE > Export classes using module.exports
categories: []
---
## the case	
the question is, how to export classes to another files / modules

## toc
<!-- TOC -->

- [general: on modules and module types](#general-on-modules-and-module-types)
- [STEP-1 assign the class to module.exports](#step-1-assign-the-class-to-moduleexports)
- [STEP-2 assign the require statement to a binding](#step-2-assign-the-require-statement-to-a-binding)
- [STEP-3 construct / instantiate](#step-3-construct--instantiate)
- [sources](#sources)

<!-- /TOC -->

## findings

### general: on modules and module types
* In Node, a module (a discrete program) is contained in **A SINGLE FILE** in Node.js. 
* Modules **TIED TO FILES**
* **ONE MODULE PER FILE**
* Node.JS uses the **CommonJS** system of modules
* there are other types used in the JavaScript ecosystem. 
    * Asynchronous Module Definition (AMD) 
    * ECMAScript 6 (ES6)
* a file is a system `module` object and it can contain an `exports` property 🠊 by default, node makes modules **PRIVATE** and exporting them means switching **PRIVATE** 🠊 **PUBLIC**
* the `require` function will look for files in the following order:
    1. Built-in core Node.js modules (like fs)
    2. NPM Modules. It will look in the node_modules folder.
    3. Local Modules. If the module name has a ./, / or ../, it will look for the directory/file in the given path. It matches the file extensions: *.js, *.json, *.mjs, *.cjs, *.wasm and *.node.

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

### STEP-2 assign the require statement to a binding
* in the referring file

```js
//consoleInput.js
const Input = require("./input") //STEP-2
```

### STEP-3 construct / instantiate
```js
const Input = require("./input")
let consoleInput = new Input();
```

### sources
* [How to use module.exports in Node.js](https://stackabuse.com/how-to-use-module-exports-in-node-js/)
* [Everything you should know about ‘module’ & ‘require’ in Node.js](https://www.freecodecamp.org/news/require-module-in-node-js-everything-about-module-require-ccccd3ad383/)