---
layout: post
title: ExtJS > JS objects and design patterns (singleton, iife)
last_modified_at: 
---

## toc
<!-- TOC -->

- [Class Orientation](#class-orientation)
- [What is a Singleton](#what-is-a-singleton)
    - [IIFE: Immediatelly Invoked Function Expression](#iife-immediatelly-invoked-function-expression)
    - [ExtJS, the Big Singleton](#extjs-the-big-singleton)

<!-- /TOC -->

## findings
### Class Orientation
* Javascript is not class oriented, because it does not support inheritance
* ExtJS is very much class oriented in how it is desiges

### What is a Singleton
* Singleton Pattern is a common design pattern used in Javascript
    * one of the 23 well-known Gang-of-Four patterns
* in JS, singleton object is used to keep from polluting the global namespace
    * from the singleton object our objects hang that compose 
    * 1 singleton JS object and  from that hanf all our other objects that compose the library 
* the JS Singleton can be created using IIFE

#### IIFE: Immediatelly Invoked Function Expression
* aka **Self-Executing Anonymous Function**
* function that runs as soon as it is defined
* this is a design pattern

CODE                        | COMMENT
----------------------------|----------------------------------------------------------------------
1. `(...)`                  | grouping operator, preventing accessing variables within IIFE
2. `function(){statements}` | anonymous function
3. `()`                     | immediatelly invoked function expression making JS directly interpret

```js
(                   //1. 
    function () {   //2. 
    statements
})();               //3.
```
* The example below creates a singleton by using the IIFE pattern by executing the function and leaving the object behind

CODE                                   | COMMENT
---------------------------------------|-------------------------------------------------------------------------------
1. `(function() {...})();`             | IIFE pattern
2. `if (typeof MyExt === 'undefined')` | validation checking if MyExt has not been defined - only 1 singleton can exist
3. `this.MyExt = {...}`                | Object definition with `this` selecting the current execution context
4. `add: function(a,b) {...}`          | Method definition of the object MyExt
5. `alert(MyExt.add(3,4));`            | the built-in alert prompt calling the `MyExt.add` method returning **7**

```js
(function() {                           //1. 
  if (typeof MyExt === 'undefined') {   //2. 
    this.MyExt = {                      //3. 
      add: function(a,b) {              //4. 
           return a + b;
      }
    };
  }
  })();

alert(MyExt.add(3,4));
```

#### ExtJS, the Big Singleton
* like `$` in jQuery
* the entire Ext is creatied using the IIEF pattern
* upon the initiation, the `EXT` static object is created and can be used
 
## sources
* [IIFE - MDN Web Docs Glossary: Definitions of Web-related terms](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)