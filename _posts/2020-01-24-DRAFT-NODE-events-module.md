---
layout: post
title: NODE > Creating custom events
---
## the case	
the question is how to create custom event emitters and how to handle events fired from those emitters

* **note:** the example used aims to fire an event if there is a command line argument present when the application is started

## toc
<!-- TOC -->

- [the events module](#the-events-module)
- [STEP-1 events & emitter](#step-1-events--emitter)
- [STEP-2 listener and callback](#step-2-listener-and-callback)
- [STEP-3 emit](#step-3-emit)
- [sources](#sources)

<!-- /TOC -->

## findings
### the events module
* core, essential module in Node

### STEP-1 events & emitter
* navigate to the module from which you want to fire events
* import the built-in events module by `const events = require("events")`
* construct the emitter object by `const consoleInputEmitter = new events.EventEmitter()`;
* the rest of the event-related functions are from this clas

CODE                                                          | COMMENT
--------------------------------------------------------------|-------------------------
1.1. `const events = require("events");`                      | import the events module
1.2. `const consoleInputEmitter = new events.EventEmitter();` | instantiate EventEmitter

```js
//consoleInput.js
const events = require("events");                       //1.1
const consoleInputEmitter = new events.EventEmitter();  //1.2
```

### STEP-2 listener and callback
* **important** this is an interpreted language, therefore the listener must be interpreted / read **before** the emitter
* **rule**: the name of the event must match the one defined in STEP-3
* **rule**: the parameter in the callback is what gets passed from the event as an event argument
* it has to be higher in the control flow, that's why it's a STEP-2 here
* the callback function is where the most effort lies, of course but that does not belong in this structure

CODE                                       | COMMENT
-------------------------------------------|----------------------------------------------------------------
2.1 `consoleInputEmitter.on(...);`         | call the `on()` method of the emmiter object
2.2 `("consoleInputPresent"...)`           | event-name that is listened to
2.3 `(..., consoleInput =>...`             | parameter accepting the event arguments passed from the emitter
2.4 `(... => {console.log(consoleInput)}`) | the callback function

```js
const Input = require("./input"); 
const events = require("events");                       //1.1
const consoleInputEmitter = new events.EventEmitter();  //1.2
const checkConsoleInput = () => {return consoleInput.length === 3 ? true : false}; //3 parameters are mandatory

let consoleInput = process.argv.slice(2);
let consoleInputPresent = checkConsoleInput();

consoleInputEmitter.on("consoleInputPresent", consoleInput => {console.log(consoleInput)}); //2.1-2.4
```

### STEP-3 emit
* locate the place when exactly the event should be fired and put an event emitter there
* I have hidden it behind an if-statement here, as I need to check if there are any command line parameters present

CODE                                | COMMENT
------------------------------------|-------------------------------------------------------------------------------------------------------------------------
3.1 `if (consoleInputPresent)`      | decision to emit / not to emit the event
3.2 `consoleInputEmitter.emit(...)` | the `emit` method of the emitter object firing the event
3.3 `("consoleInputPresent",...)`   | **here**, you define the event name that has to be matched by listeners (you don't care about the listeners)
3.4 `...consoleInput)`              | the event argument that is actually attached to the event signal, here an existing binding of the command line arguments

```js
const Input = require("./input")
const events = require("events");
const consoleInputEmitter = new events.EventEmitter();
const checkConsoleInput = () => {return consoleInput.length === 3 ? true : false};

let consoleInput = process.argv.slice(2);
let consoleInputPresent = checkConsoleInput();

consoleInputEmitter.on("consoleInputPresent", consoleInput => {console.log(consoleInput)} );

if (consoleInputPresent) {
    consoleInputEmitter.emit("consoleInputPresent", consoleInput)  //3.1-3.4
}
```

### sources