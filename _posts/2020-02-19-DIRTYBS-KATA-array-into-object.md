---
layout: post
title: DIRTYBS > KATA >  JavaScript > array into object
---
* trying to capture the thought process behind the {% post_url 2020-02-19-KATA-array-into-object %}

## the case	
* the result is in 
* the question is, how to iterate and aggregate array-of-objects into a single object structure based on the `name` property
* Example array

```js
[
    {
        name: "HP",
        quantity: 3,
        amount: 300
    },
    {
        name: "Xerox",
        quantity: 5,
        amount: 750
    },
    {
        name: "Brother",
        quantity: 1,
        amount: 130
    },
    {
        name: "Brother",
        quantity: 3,
        amount: 390
    },
    {
        name: "Brother",
        quantity: 10,
        amount: 1300
    },
    {
        name: "Xerox",
        quantity: 8,
        amount: 900
    },
    {
        name: "HP",
        quantity: 7,
        amount: 1000
    },
    
]
```

* The final nested object should have 2-levels, with the name being the natural key and quantities and amounts should be aggregated

## toc
<!-- TOC -->

- [bs](#bs)
- [the for of loop as a loop structure](#the-for-of-loop-as-a-loop-structure)
- [STEP-2 extract keys](#step-2-extract-keys)
    - [note: you cannot use `break` in ternary operators](#note-you-cannot-use-break-in-ternary-operators)
    - [note: break vs continue](#note-break-vs-continue)
    - [(05:35:44) but how to deal with the fact that that thing is just being built](#053544-but-how-to-deal-with-the-fact-that-that-thing-is-just-being-built)
    - [(06:05:00) enter javascript sets](#060500-enter-javascript-sets)
    - [(06:13:55) BREAKTHROUGH](#061355-breakthrough)
    - [(06:25:11) clean that thing up first](#062511-clean-that-thing-up-first)
- [STEP-3 aggregate on those keys](#step-3-aggregate-on-those-keys)
    - [(06:55:59) aggregation issues](#065559-aggregation-issues)
    - [(07:26:46) BREAKTHROUGH on step-3](#072646-breakthrough-on-step-3)
    - [(07:33:07) clearing up by method-extraction](#073307-clearing-up-by-method-extraction)
- [sources](#sources)

<!-- /TOC -->

## findings
### bs
* iterate through names
* extract unique values
* build objects based of those values
* aggregate based on the key name
* **is there a canonical form already???**
* is there a dedicated loop ? there is `for each` there is `for in` 

### the for of loop as a loop structure
* the new loop for iterables is the structure used for iterating over objects withih the array
* there is also a **for in loop** can be used on all enumerable objects, but realize the return may be in a random order
* the for of is a new loop, replacing the deprecated `.foreach()`, and working on **iterable collections** with `[symbol.iterator]`
* it does not work on objects


```js
for(let printer of printerRecords) {
    console.log(printer.name);
}
//RESULT
//-----
//HP
//Xerox
//Brother
//Brother
//Brother
//Xerox
//HP
```

### STEP-2 extract keys
* once you know a unique identifier you would like to aggregate on, you need to extract that into an array
    * iterate over names
    * iterate with each name over each array
    * if it is there, break the second loop
    * if it is not there, push it into the array

#### note: you cannot use `break` in ternary operators
> When you use a ternary operator, it is not like an if. The ternary operator has this form: (condition ? expression_if_true : expression_if_false); Those two expression must have the same type, otherwise that makes nonsense. And you cannot use statement in this operator, only expression. This is because the whole ternary operator must be an expression itself, depending on the condition.
* that's why it's an **operator** while **if** is a **statement**

#### note: break vs continue

![break_statements_stops_loop]({{ site.url }}/assets/img000479.png)

![continue_statement_stops_one_iteration]({{ site.url }}/assets/img000480.png)

#### (05:35:44) but how to deal with the fact that that thing is just being built
* of course that array is just being built, as we speak so you cannot iterate over that thing too much, right ? 
* so the elegant idea of nested for loop is not as cool as it may have seen
* i need to check it length every time
    * each iteration check the length of the array
    * but in case you are just initiating, you need to write in the first item there is
    * check for empty array upfront and add an initial name
    * get the array of one and enlarge it
    * in next iteration get an array of two already 
    * this is just for key extraction part
    * it bas to **break** as I am creating a set here, right ? they keys are a set this is a set of records as they cannot be duplicate and those names are natural keys that I am aggregatingon
* why is brother there multiple times
    * some test had to fail
        * why
            * it has to be skipping something
* what it does is checks for the identity and it pushes it even if it is there in other place
* you need to discover a set in javascript

#### (06:05:00) enter javascript sets

#### (06:13:55) BREAKTHROUGH

CODE                                  | COMMENT
--------------------------------------|----------------------------------------------
`let printerKeys = new Set();`        | instantiate a new set object
`for (let printer of printerRecords)` | iterate through objects in a array
`if (!printerKeys.has(printer.name))` | if the printer name is not part of the set...
`printerKeys.add(printer.name)`       | ...add it as a member of the set

```JS
let printerKeys = new Set();
    for (let printer of printerRecords) {
        if (!printerKeys.has(printer.name)) {
            printerKeys.add(printer.name)
        }
        console.dir(printerKeys);
    }
//Set(3)
//size: 3
//<entries>
//0: "HP"
//1: "Xerox"
//2: "Brother"
```

#### (06:25:11) clean that thing up first

```js
const inventoryRecords = [
    {
        name: "HP",
        quantity: 3,
        amount: 300
    },
    {
        name: "Xerox",
        quantity: 5,
        amount: 750
    },
    ///...

]
let inventoryKeys = new Set();
function extractInventoryKeys() {
    for (let inventory of inventoryRecords) {
        if (!inventoryKeys.has(inventory.name)) {
            inventoryKeys.add(inventory.name)
        }
    }

}
function aggregateInventory(inventoryRecords) {    
    extractInventoryKeys(); /
}
aggregateInventory(inventoryRecords);           //program starts here and the stack builds from here
```

### STEP-3 aggregate on those keys
* is not the time for the nested for of ? 
* go through printer.name
    * take "HP"
        * go through the set [HP, Xerox, Brother]
            * if you find the match, the first match as there can't be more
            * dump the contents there
            * meaning, the set should also create a templated object ? 
            * it should do just 1 thing I am telling you
            * so, you should have another function that would create a template
* you should be using either just an object structure as this can be passed JSON, right ? 
* the ideal object should look like

```js
inventory = {
    key:{
        quantity: int
        amount: int
    }

}
```

#### (06:55:59) aggregation issues
* of couse you need to get there
* you need to map the keys properly
* and you need to increment the current values
* so the question is how, do you make it a key from set member. this is a key-value pair structure, understand ?
* this should be done already in the second function
* the problem here is that if you have keys in a set, and you have values in an array of objects, how do you go about mapping those and create a new object right ?
* what have you been doing ? well, not aggregating in any way, previously, and you can't increment to something that does not exist
* so it would seem you need to initialize those properties to zero and then increment it properly, right ?
* if undefined, initialize ? but that init would have to be to 0, as these are integers
* is there another way as you are realizing that you, I guess need to have this ansd realizing that you are not the first one that is having these issue
* the question being how to increment to non-existing properies, right ? 
* i am being constrained only by the fact that I don't want to initalize that thing, but initially I could do that as to make that work  

#### (07:26:46) BREAKTHROUGH on step-3
* we are in the running-state now with three large steps
    * key-extraction
    * object-initiation to 0 values so that they can be incremented
    * value-aggregation/incrementation to the initialized objects with nested for-of-loops

```js
const inventoryRecords = [
    {
        name: "HP",
        quantity: 3,
        amount: 300
    },
    {
        name: "Xerox",
        quantity: 5,
        amount: 750
    },
    {
        name: "Brother",
        quantity: 1,
        amount: 130
    },
    {
        name: "Brother",
        quantity: 3,
        amount: 390
    },
    {
        name: "Brother",
        quantity: 10,
        amount: 1300
    },
    {
        name: "Xerox",
        quantity: 8,
        amount: 900
    },
    {
        name: "HP",
        quantity: 7,
        amount: 1000
    },

]
let inventoryKeys = new Set();
let inventoryAggregate = {}; 

function extractInventoryKeys() {
    for (let record of inventoryRecords) {
        if (!inventoryKeys.has(record.name)) {
            inventoryKeys.add(record.name)
        }
        //console.log(inventoryKeys);
    }
    for (let key of inventoryKeys) {
        inventoryAggregate[key] = {quantity:0, amount: 0}
        
    }
}


function aggregateInventory(inventoryRecords) {    
    extractInventoryKeys();
    for (record of inventoryRecords) {
        for (let key of inventoryKeys) {
            if(record.name === key) {
                inventoryAggregate[key].amount += record.amount
                inventoryAggregate[key].quantity += record.quantity
            }
        }
    }
    console.log(inventoryAggregate);
}
aggregateInventory(inventoryRecords);
```

```js
Brother:Object {quantity: 14, amount: 1820}
HP:Object {quantity: 10, amount: 1300}
Xerox:Object {quantity: 13, amount: 1650}
__proto__:Object {constructor: , __defineGetter__: , __defineSetter__: , …}
```

#### (07:33:07) clearing up by method-extraction
* the function should o 1 thing, therefore I am breakin up the function into two 
* start the execution at the bottom of the sourcefile and mimic the stack formation as you go up to in function calls

```js
//INITS
const inventoryRecords = [
    {
        name: "HP",
        quantity: 3,
        amount: 300
    },
    {
        name: "Xerox",
        quantity: 5,
        amount: 750
    },
    {
        name: "Brother",
        quantity: 1,
        amount: 130
    },
    {
        name: "Brother",
        quantity: 3,
        amount: 390
    },
    {
        name: "Brother",
        quantity: 10,
        amount: 1300
    },
    {
        name: "Xerox",
        quantity: 8,
        amount: 900
    },
    {
        name: "HP",
        quantity: 7,
        amount: 1000
    },

]
let inventoryKeys = new Set();//TEMP SET FOR STORING THE KEYS
let inventoryAggregate = {}; 

//SUB-FUNCTIONS FOR KEY EXTRACTION AND OBJECT INITIALIZATION
function aggregateInitialization() {
    for (let key of inventoryKeys) {
        inventoryAggregate[key] = {quantity:0, amount: 0}   
    }
    return inventoryAggregate;
}

function extractInventoryKeys() {
    for (let record of inventoryRecords) {
        if (!inventoryKeys.has(record.name)) {
            inventoryKeys.add(record.name)
        }
    }
    return inventoryKeys;
}

//MAIN FUNCTION
function aggregateInventory(inventoryRecords) {    
    extractInventoryKeys();                     //SUB-FUNCTION 1
    aggregateInitialization();                  //SUB-FUNCTION 2
    for (record of inventoryRecords) {
        for (let key of inventoryKeys) {
            if(record.name === key) {
                inventoryAggregate[key].amount += record.amount
                inventoryAggregate[key].quantity += record.quantity
            }
        }
    }
    console.log(inventoryAggregate);
    return inventoryAggregate;
}

//CALL OF THE MAIN FUNCTION
aggregateInventory(inventoryRecords);
```

### sources
* [Set - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
* [Set Theory: the Method To Database Madness - basecs - Medium](https://medium.com/basecs/set-theory-the-method-to-database-madness-5ec4b4f05d79)
* [Object.prototype.propertyIsEnumerable() - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
* [Accessing Nested Objects in JavaScript - By](https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f)