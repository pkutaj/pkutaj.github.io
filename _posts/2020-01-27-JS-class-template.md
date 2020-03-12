---
layout: post
title: JavaScript > template for classes (CCSG)
---
## the case	
the question is, how to create a barebone class in JavaScript

## toc
<!-- TOC -->

- [STEP-1 class](#step-1-class)
- [STEP-2 constructor](#step-2-constructor)
- [STEP-3 getters](#step-3-getters)
- [STEP-4 setters](#step-4-setters)

<!-- /TOC -->

## findings
* prototype syntax is confusing
* ES2015 (ES6) came with a new way of writing classes, this is syntactic sugar and prototyping is still under the hood

### STEP-1 class
* convention like in an OOP language is to use capitals for names
* **note:** dynamic scripting languge; no types defines, no access modifiers for encapsulation. just a name... 

CODE         | COMMENT
-------------|--------------
1.1. `class` | class keyword
1.2. `Input` | class name

```js
class Input { //1.1.-1.2.
    
}
```

### STEP-2 constructor
* right after the class definition

CODE                                                   | COMMENT
-------------------------------------------------------|-------------------------------------------------------
2.1. `constructor() {...}`                             | `constructor` keyword
2.2. `(transactionCurrecy,...)`                        | required parameters defining the fields of the class
2.3. `this.transactionCurrency = transactionCurrency;` | passed parameter assigned to the property of the class

```js
class Input {
    constructor(transactionCurrency, counterCurrency, amountExchanged) { //2.1.-2.2.
        this.transactionCurrency = transactionCurrency; //2.3.
        this.counterCurrency = counterCurrency;
        this.amountExchanged = amountExchanged;
    }
}
```

### STEP-3 getters
* this is a **query function**, not changing the state of the system but returning an expression, possibly computed
    * see [michalorman.com/2015/03/commands-and-queries/](http://michalorman.com/2015/03/commands-and-queries/)
* dynamic values cannot be set in constructor methods
* getter method is used when accessing computed properties
* the value of that property is not passed into the constructor, but it is returned by the function defined in the body of the getter
* the value computer via a getter method is not updated or stored anywhere, it's created on-the-fly

CODE                          | COMMENT
------------------------------|-----------------------------------------------------------------------------------------------------
3.1. `get`                    | `get` keyword defining the special type of the method for reading of the classes computer properties
3.2. `activity()`             | name of the property function
3.3. `{... return "playing"}` | one of the possible properties based on the time of the day

```js
class Pet {
    constructor(animal, age, breed, sound) { //CONSTRUCTOR with fields
        this.animal = animal;
        this.age = age;
        this.breed = breed;
        this.sound = sound;
    }
    speak() {                                 //METHOD declaration
        console.log(this.sound);
    }
    get activity() {                                   //3.1.-3.2
        const today = new Date();
        const hour = today.getHours();
        if (hour > 8 && hour <= 20) { return "playing" } //3.3
        else { return "sleeping" }
    }
} 
```

### STEP-4 setters
* this is a **command function** changing the state of the system, not returning anything
* receives a parameter and can run a custom function if need be
* creates a new property or updates the existing one
* **rule:** always 1 parameter, the value of the property to be set
* **rule:** the name of the property cannot be identical with the name of the getter or setter method
    * cannot do `set owner(owner) {this.owner = owner}` ➔ this blows the stack
    * that syntax for setter is self-referencing and creates an infinite loop that blows the call stack
    * this is backing property
    * the convention for the backing property is to **use the name of the setter starting with an underscore**

CODE                           | COMMENT
-------------------------------|-----------------------------------------------------------------------
4.1. `set`                     | set keyword defining the special `set` method
4.2. `owner`                   | the name of the property to be set
4.3. `(ownerName)`             | the single-parameter possible passing the value to be set
4.4 `this._owner = ownerName;` | set the property value of a backing property to the passed value
4.5 `get owner() {...}`        | each setter needs a corresponding getter renaming the backing property
4.6 `return this._owner;`      | finally, the `owner` property is assigned from the backing `_owner`

```js
class Pet {
    constructor(animal, age, breed, sound) { //CONSTRUCTOR with fields
        this.animal = animal;
        this.age = age;
        this.breed = breed;
        this.sound = sound;
    }
    speak() {                                 //METHOD declaration
        console.log(this.sound);
    }
    get activity() {                          //SETTER declaration
        const today = new Date();
        const hour = today.getHours();
        if (hour > 8 && hour <= 20) { return "playing" }
        else { return "sleeping" }
    }

    set owner(ownerName) {          //4.1.-4.3.
        this._owner = ownerName;    //4.4    
    }

    get owner() {           
        return this._owner;
    }
} 
```