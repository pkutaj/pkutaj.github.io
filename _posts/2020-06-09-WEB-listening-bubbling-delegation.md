---
layout: post
title: javascript > listening, bubbling & delegation
categories: [javascript]
---
### abstract
the question is handling events in a browser environment

## contents
<!-- TOC -->

- [abstract](#abstract)
- [bubbling](#bubbling)
    - [what element should be selected to add an effective handler](#what-element-should-be-selected-to-add-an-effective-handler)
- [callback function](#callback-function)
- [event object](#event-object)
    - [event.target](#eventtarget)
- [element.tagName](#elementtagname)
- [sources](#sources)

<!-- /TOC -->

## findings
### bubbling
* event triggered on a **child** item bubbles through the hierarchy all the way to the **root**, which the **document object**
 
![bubbling_through_tree]({{ site.url }}/assets/2020-03-05-01.png) 
 
* this concept allows writing much more powerful handlers
* example: 
    * when adding and removing list items `<li>`, just add a single handler to the parent-item `<ul>`
 
#### what element should be selected to add an effective handler
* select a **parent** (ancestor) **close** to the target for the **performance** reasons
* also, this method is performance-smart as there is no handler-assignment to each and every list items
 
### callback function
* eventlistener is a method with 2 params — if this happens (param 1 — action), do this (param 2 — callback)
    * action (click, touchbase, mouseon, mouseout)
    * callback function --> that is fired after the action
* callback functions are functions as parameters 🠊 functions (executable code) nested into another functions
* the parent-function calls back the function. but in a callback concept, I don't see how the passed-function called the parent, originally. the call after function name is making --> sense to me
* that callback can be synchronous (immediate?) or asynchronous (plenty of modern APIs depend on this way of doing things) 
* in this context, this is how it is with event listeners, where callback functions are executed asynchronously
 
### event object
* what is automatically passed into a callback function that is a part of a listener is (can be?) an **event object**
* this structure contains information about an element where the trigger was fired
 
![event-object]({{ site.url }}/assets/2020-03-05-02.png) 
 
* the object contains a set of properties and methods 
 
#### event.target
* event.target is one of the most used **properties** of the event object as target references the place where the event originated (target?)
* the target property of the event interface is a reference to the object that dispatched the event – I would call it the origin, the culprit, the perpetrator 
 
![target_property_of_event_object]({{ site.url }}/assets/2020-03-05-03.png) 
 
* clicking on the page with the code above logs the given event.target elements into the console. 
* the events bubble all the way to the root of the DOM-tree, which is the document object
 
![illustration]({{ site.url }}/assets/2020-03-05-04.png) 
 
 
### element.tagName
* you can utilize bubbling to modify the behavior of a specific restrained section of the DOM tree
* e.g. to list items within a specified list
* with the concept of bubbling, add an event listener to the parent-item
* inside of a callback function, put an if statement testing the event object's target + tagname properties 
* note: element.tagName in DOM is returned capitalized
 
![tagName_property_returns_capitalized]({{ site.url }}/assets/2020-03-05-05.png) 
 
* therefore, the code restricting the event-handler must contain the upper-cased condition (if you select by tagName)
 
![event_handlers_using_capitalzed]({{ site.url }}/assets/2020-03-05-06.png) 
 
### sources
* <https://en.wikipedia.org/wiki/Callback_(computer_programming)>
* <https://developer.mozilla.org/en-US/docs/Glossary/Callback_function>
* <https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName>