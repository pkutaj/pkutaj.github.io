---
layout: post
title:
---
## the case	
the question is, how to listen to various kinds of inputs (browser-based, console-based, file-based)  and to pass the normalized object into another modules

## toc
<!-- TOC -->

- [ATTEMPT-1: Objects and inheritance](#attempt-1-objects-and-inheritance)
    - [STEP-1 class definition with getters and setters for properties](#step-1-class-definition-with-getters-and-setters-for-properties)
    - [STEP-2 add event listener to a class](#step-2-add-event-listener-to-a-class)
    - [STEP-3 listener in a constructor - a hungry object](#step-3-listener-in-a-constructor---a-hungry-object)
    - [STEP-4 passing an object into a callback assigning the fields](#step-4-passing-an-object-into-a-callback-assigning-the-fields)
    - [STEP-5 set a property via a callback from a constructor](#step-5-set-a-property-via-a-callback-from-a-constructor)
    - [STEP-6 moving object instance to another module](#step-6-moving-object-instance-to-another-module)
    - [STEP-7 passing the constructed normalized object](#step-7-passing-the-constructed-normalized-object)
        - [STEP-7.1 export the object](#step-71-export-the-object)
        - [STEP-7.2 require it and bind to a variable](#step-72-require-it-and-bind-to-a-variable)
        - [STEP-7.3 normalize input](#step-73-normalize-input)
    - [STEP-8 consolidate](#step-8-consolidate)
    - [STEP-9 adding another input type: the console](#step-9-adding-another-input-type-the-console)
    - [STEP-10 pass the consolidatedInput into app.js](#step-10-pass-the-consolidatedinput-into-appjs)

<!-- /TOC -->

## findings
### ATTEMPT-1: Objects and inheritance
#### STEP-1 class definition with getters and setters for properties
* have a base class `Input`
```js
class Input {

    set transactionCurrency(transactionCurrency) {
        this._transactionCurrency = transactionCurrency;
    }

    get transactionCurrency() {
        return this._transactionCurrency
    }

    set counterCurrency(counterCurrency) {
        this._counterCurrency = counterCurrency;
    }

    get counterCurrency() {
        return this._counterCurrency
    }

    set amountExchanged(amountExchanged) {
        this._amountExchanged = amountExchanged;
    }

    get amountExchanged() {
        return this._amountExchanged
    }

};
```
#### STEP-2 add event listener to a class
* this class should be extenting the class `Events` to be able to be listening when constructed
* [Node.js - inheriting from EventEmitter - Stack Overflow](https://stackoverflow.com/questions/8898399/node-js-inheriting-from-eventemitter)
* the template there being

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');
```
* my result being

```js
class Input extends EventEmitter {...}
/* test-start */
let input = new Input()
input.on("input", () => {console.log("fired!")});
input.emit("input");
/* test-end */
//passed, fired! in the console
```

#### STEP-3 listener in a constructor - a hungry object
* you need a `super()` - super constructor method to be able to refer to methods in the base class within the constructor

```js
class Input extends EventEmitter {
    constructor(){
        super();
        this.on("input", () => console.log("fired!"))
    }

/* test-start */
let input = new Input();
input.emit("input")
/* test-end */
//PASS, fired! is in the console!
```

#### STEP-4 passing an object into a callback assigning the fields
* you can access properties of the passed object directly in a constructor

```js
class Input extends EventEmitter {
    constructor(){
        super();
        this.on("input", (input) => {console.log(input.transactionCurrenty)})
    }
/* test-start */
let input = new Input();
let codeInput = {
    transactionCurrenty: "CZK"
}
input.emit("input", codeInput)

/* test-end */
//PASSED, CZK in the console
```

#### STEP-5 set a property via a callback from a constructor
* so now we have an object immediatelly listening and setting properties passed along by the event arguments

```js
class Input extends EventEmitter {
    constructor() {
        super();
        this.on("input", (input) => {
            this.transactionCurrency = input.transactionCurrency;
        })
    }

    set transactionCurrency(transactionCurrency) {
        this._transactionCurrency = transactionCurrency;
    }

    get transactionCurrency() {
        return this._transactionCurrency
    }

/* test-start */
let input = new Input();
let codeInput = {
    transactionCurrency: "CZK"
}
input.emit("input", codeInput)
console.log(input.transactionCurrency);

/* test-end */
//PASS, console returns "CZK" 
```

#### STEP-6 moving object instance to another module
* you require the class definition with `require("/classFilePath")`
* the test from above PASSES

```js
const Input = require("./input")
/* test-start */
let codeInput = {
    transactionCurrency: "GBP",
    counterCurrency: "CZK",
    amountExchanged: "999",
}
let input = new Input();
input.emit("input", codeInput)
console.log(input.transactionCurrency);
/* test-end */
//PASS, GBP in the console
```

#### STEP-7 passing the constructed normalized object
* not working

##### STEP-7.1 export the object
```js
//codeFileExchangeInput.js
const Input = require("./input")
/* test-start */
let codeInput = {
    transactionCurrency: "GBP",
    counterCurrency: "CZK",
    amountExchanged: "1000000",
}
let input = new Input();
input.emit("input", codeInput)
module.exports = input;             // note you are exporting the object from this module
```

##### STEP-7.2 require it and bind to a variable
```js
const codeFileInput = require("./ui/codeFileExchangeInput.js")
/* test-start access constructed object*/
console.log(codeFileInput)
/* test-end
/* PASS
Input {
  _events: [Object: null prototype] { input: [Function] },
  _eventsCount: 1,
  _maxListeners: undefined,
  _transactionCurrency: 'GBP',
  _counterCurrency: 'CZK',
  _amountExchanged: '1000000' }
*/
```

##### STEP-7.3 normalize input
* the idea is that you export only a part of the object and that should be passed

```js
const Input = require("./input")
let input = new Input();
let codeInput;
function normaliseCodeFileInput(normalizedInput) {
    const normalisedCodeFileInput = {
        transactionCurrency: normalizedInput.transactionCurrency,
        counterCurrency: normalizedInput.counterCurrency,
        amountExchanged: normalizedInput.amountExchanged
    };
    return normalisedCodeFileInput;
}
/* test-start */
 codeInput = {
    transactionCurrency: "GBP",
    counterCurrency: "CZK",
    amountExchanged: "1000000",
}
if (codeInput !== undefined) {
    input.emit("input", codeInput);
    module.exports = normaliseCodeFileInput(input);
} else(module.exports = null);
/* test-end*/
//PASS, passing only normalisedCodeFileInput as defined in the function
```

#### STEP-8 consolidate
```js
/* 
 * The aim of the module is to build a composite array with normalized structure and pass it into a service layer.
 * Instructions for adding another UI type (csv file for example) 
 * 1. require the .js file that processes / normalizes the input:
 *    const csvFileInput = require("./csvFileInput.js")
 * 2. call the addToCondolidatedInput function to append the input to the array that is passed further
 * 
 */

const codeFileInput = require("./codeFileExchangeInput.js")

let consolidatedInput = [];
function addToConsolidatedInput(normalizedInput) {
    if (normalizedInput !== null) { consolidatedInput.push(normalizedInput);}
}

addToConsolidatedInput(codeFileInput);
module.exports = consolidatedInput;
```

#### STEP-9 adding another input type: the console
* consoleinput is in the form of an array
* pass the input into the object proper

```js
/* 
 * The concern of this module the gathering of exchange input from the console
 * And exporting this 
 * This is the part of the UI module 
 */

const Input = require("./input")
let input = new Input();
let consoleInput = process.argv.slice(2);
const checkInputPresence = () => {return consoleInput.length === 3 ? true : false};

let consoleInputPresent = checkInputPresence();
function normaliseConsoleInput(consoleInput) {
    const normalisedConsoleInput = {
        transactionCurrency: consoleInput[0],
        counterCurrency: consoleInput[1],
        amountExchanged: consoleInput[2]
    };
    return normalisedConsoleInput;
}

if (consoleInputPresent) {
    consoleInput = normaliseConsoleInput(consoleInput);
    input.emit("input", consoleInput);
    module.exports = input;
} else(module.exports = null);
```

#### STEP-10 pass the consolidatedInput into app.js
* we need to loop through the array and for each input record to the work 
* and then you should be able to access the properties, right? ➔ test