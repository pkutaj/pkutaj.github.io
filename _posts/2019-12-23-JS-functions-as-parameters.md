---
layout: post
title: JS > Functions as Parameters
---
## the case	
* Historically, JS was created to listen for events and respond to them ! 

## toc

<!-- TOC -->

- [terminology](#terminology)
- [events and functions-as-parameters](#events-and-functions-as-parameters)
- [lambda expressions vs anonymous functions](#lambda-expressions-vs-anonymous-functions)
- [sources](#sources)

<!-- /TOC -->

### terminology

* function a8 parameter
* event
* fat arrow notation
* lambda expression
* listen
* handler
* mouse
* touch
* kbd
* load event

### events and functions-as-parameters 
* most common event is a click event, but there is much more
* to understand event-handling, one needs to understand the concept of functions as parameters
	* i.e., function can be treated as any other data-type in JS
		○ function can be an argument in another function

![function as parameter]({{ site.url }}/assets/img000144.png)

![function as parameter - basic syntax]({{ site.url }}/assets/img000145.png)

* you don't have to call the function as a parameter, as it was done for example when I was taking care of an event listener for both clicks and touches

![event handler example]({{ site.url }}/assets/img000146.png)

* you can pass an anonymous function declaration directly into another function as a parameter

![direct passing]({{ site.url }}/assets/img000147.png)

### lambda expressions vs anonymous functions
* lambda expressions can be named

```javascript
function traverseArray(arr,func){
	let result = '';
	for (const value of arr) {
		result += func(value) + ' ';
	}
	console.log(result);
}

const arr = [1, 2, 3, 4, 5];

traverseArray(arr, function doubler(value)) {
	return value * 2;
});
]
```

### sources

* [JavaScript Anonymous Functions](https://blog.scottlogic.com/2011/06/10/javascript-anonymous-functions.html)
* https://jaketrent.com/post/handling-touch-click-browser/
* [Lambda Functions Vs Anonymous Functions in JavaScript](https://medium.com/@chineketobenna/lambda-expressions-vs-anonymous-functions-in-javascript-3aa760c958ae)
