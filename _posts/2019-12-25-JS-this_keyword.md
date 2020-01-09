## the case	
the puzzle is, what actually **this** means in Javascript

## solution
**this** is a reference to the object inside a function, and this object was put there dynamically by an abstraction, and it can vary based in every execution

## sources
* [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

## terminology
* function's keyword
* non-strict mode
* runtime binding
* string mode

## changelog
### 2019-08-06 21:48:32   
* it is a **function's keyword**
* it is a **property of an execution context**
    * non-strict mode: always a reference to an object
    * strict mode: any value
* it is a runtime binding
* it cannot be set by assignment during execution
* it may be different each time the function is called
* as a DOM event handler
    * if a function is used as an to handle events, its **this** is set to the element the event fired from

```js
// When called as a listener, turns the related element blue
function bluify(e) {
  // Always true
  console.log(this === e.currentTarget);
  // true when currentTarget and target are the same object
  console.log(this === e.target);
  this.style.backgroundColor = '#A5D9F3';
}

// Get a list of every element in the document
var elements = document.getElementsByTagName('*');

// Add bluify as a click listener so when the
// element is clicked on, it turns blue
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', bluify, false);
}
```