---
layout: post
title: JavaScript > data types, literals & value- vs reference-assignment
---
## the case
the question is the difference of binding a value and binding a reference to a variable and it's mapping to various data types in javascript

## toc
<!-- TOC -->

- [types](#types)
- [literals](#literals)
- [data types: objects vs primitives, reference types vs value types](#data-types-objects-vs-primitives-reference-types-vs-value-types)
- [sources](#sources)

<!-- /TOC -->

## findings
### 6 types
* these values are of various kind and these elements are called data types and there is 6+1
* **6 primitives** - they have no properties
    * boolean
    * string
    * number
    * undefined
    * null
    * symbol
* **1 object**
* this works differenty all the way down to the physical layer, i.e. memory alocation
* object is special - it is manipulated by reference

### 7 literals
* all values are represented as so called **literals** and there is 7 kinds: 
    * array literal - and this is a structure already
    * boolean literal
    * floting-point literal
    * integer literal 
    * object literal - and this is a structure already
    * regexp literal - and this is a structure already
    * string literal 

### data types: objects vs primitives, reference types vs value types

![value-vs-reference]({{ site.url }}/assets/2020-01-10-1.png)

* See [C# difference between value and reference types](http://pavol.kutaj.com/2019/11/13/C-SHARP-reference-value-types.html)
* Not a 100% analogy, but as an Excel-fan I think of an assignment of a value with another variable as **paste as value** command, not linking the fields of my sheet
* On the other hand assigning the existing object to a variable is to create a **field with an address to another field**, thus making it automatically change with the referred one
* The problem here is that (as shown in the red field) the original field in JS is also an address and you store the actual objects somewhere else. 

### sources
* [Multi-Line JavaScript Strings](https://davidwalsh.name/multiline-javascript-strings)
* [Converting strings to numbers with vanilla JavaScript - Go Make Things](https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/)