---
layout: post
title: JavaScript > dot vs bracket notation
---
## the case
the question is the difference between dot and bracket object notation in JS

## toc
<!-- TOC -->

- [Compare arrays and object as data structures in JS ?](#compare-arrays-and-object-as-data-structures-in-js-)
- [Properties](#properties)
- [Evaluation of the bracket notation](#evaluation-of-the-bracket-notation)

<!-- /TOC -->

## findings
### Compare arrays and object as data structures in JS ?
* both store multiple values
* arrays: you use the **index number** to access the array item - their organizational principle is that they store values in an **ordered list**
* objects: you use **keys** to access object's properties - their organizational principle is that they store values in **key-value pairs**

### Properties
* there are 2 ways of accessing properties 
    * dot notation `.` - takes the input as a literal name of the property
    * square bracket notation `[]` - evaluates the input first and that evaluation is considered to be the name of the property
* you **can't** access array's items (= properties!) with dot notation only with `[]` notation 
* you **can** access object's items with `.` dot notation or with bracket notation with quotes around them

![arrays-vs-objects-notation]({{ site.url }}/assets/2020-01-22-bracket-notation2.png)

### Evaluation of the bracket notation
* property in the `[]` — unless in quotes — is interpreted as an identifier first
* you also need to use 
* evaluation means also that the property can be bound by a variable or a parameter in a [for-in loop]({% post_url 2019-11-10-JS-for-in-loop %})

![bracket_notation_example]({{ site.url }}/assets/2020-01-22-bracket-notation.png)

