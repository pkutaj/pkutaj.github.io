---
layout: post
title: JS > immutability
---
## the case	
The question is the simple demonstration of the string immutability (leave numbers assige) that is a built-in feature of JS

## findings
* In JavaScript, string and number values are **immutable**, which means that they cannot be altered once created
* For example, the following code

```js
var myName = "Pavol";
myName[0] 				// "P", being a property of the String accessible via a bracket notation
/* Try to change "Pavol" to "Savol"  via changing the first letter only*/
myName[0] = S; 			// SyntaxError: redeclaration of let myName
```

* the state of myName cannot be altered, i.e. the string is immutable 
* Note that this does not mean that myName cannot be changed, just that **the individual characters of a string literal cannot be changed** 

```js
var myName = "Pavol";
myName = "Savol";
myName; 				// "Savol" ➔ only the redeclaration works
```

* strings are immutable, whereas Arrays are mutable ➔ alsi `myName.pop()` will not work !
