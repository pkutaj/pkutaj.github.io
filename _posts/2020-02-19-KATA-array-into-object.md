---
layout: post
title: KATA > JavaScript > Aggregate an inventory (array-of-objects key extraction and value aggregation)
categories: [powershell]
---
## the case	
* the example is utilizing printers but could be used on other sorts of inventories as well
* the solution is actually the exercise of **for-loops** and **set-theory** (see sources)
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

```js
{ HP: { quantity: 10, amount: 1300 },
  Xerox: { quantity: 13, amount: 1650 },
  Brother: { quantity: 14, amount: 1820 } }
```

## toc
<!-- TOC -->

- [CODE](#code)
- [Sources](#sources)

<!-- /TOC -->

## findings
### CODE
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


function aggregateInventory(inventoryRecords) {    
    extractInventoryKeys();
    aggregateInitialization();
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

aggregateInventory(inventoryRecords);
```

### Sources
* [source_code]({{ site.url }}/assets/2020-02-19-KATA-array-into-object.js)
* [Set - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
* [Set Theory: the Method To Database Madness - basecs - Medium](https://medium.com/basecs/set-theory-the-method-to-database-madness-5ec4b4f05d79)
* [Object.prototype.propertyIsEnumerable() - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
* [Accessing Nested Objects in JavaScript - By](https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f)
