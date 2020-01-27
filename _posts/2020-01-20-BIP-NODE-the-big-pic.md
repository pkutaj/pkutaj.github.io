> break into pieces
---
layout: post
title: BREAK INTO PIECES
---
## the case	
the question is, 

## toc
<!-- TOC -->

- [what is node](#what-is-node)
- [the uses of node](#the-uses-of-node)
- [what makes up Node.js](#what-makes-up-nodejs)
    - [node custom code](#node-custom-code)
    - [V8 rendering engine](#v8-rendering-engine)
    - [libuv](#libuv)
- [history of Node.js](#history-of-nodejs)
- [why-not Node](#why-not-node)
- [async nature and event loop](#async-nature-and-event-loop)
    - [what is an application from the async programming perspective](#what-is-an-application-from-the-async-programming-perspective)
    - [the christmas tree problem](#the-christmas-tree-problem)
- [sources](#sources)

<!-- /TOC -->

## findings
### what is node
* server-side javascript or, as the authors themselves put it `asynchronous, event-driven, JS runtime`

### the uses of node
* [the uses of node-OUT](2020-01-20-DRAFT-NODE-the-4-uses.md)

### what makes up Node.js
* the combination of the following 3 elements removes the browser incompatibilities and the need for polyfills
* the work is targetting only the V8 JS engine just like a recent Chrome
    * see [Node.js ES2015/ES6, ES2016 and ES2017 support](https://node.green/) for JS support accross prowses
    * no need to support multiple engines

#### node custom code
#### V8 rendering engine
* from chrome
* javascript support 
 
#### libuv
* asynchronous i/o
* event loop

### [history of Node.js](2020-01-20-DRAFT-history-of-node.js)
* 2009, Ryan Dalh runs a demo at jsconf.eu conference, ripping the V8 engine our of Chrome
* 2010, joyent sponsors Node.js (corporate backing)
* 2010, npm is released
* 2011, joyent & MS collaborates to bring it to Windows
    * intro of libuv, abstracting platform-dependent code used in supporting multiple OS
* 2014, frustration with Joyent governance causes a secession and **io.js** forks Node
    * this fork is commited to release more regularly, to follow the V8 releases
* 2015, nodejs foundation is created, **Node 4.0** is a **merge** of Node and io.js
    * new release every 6 months
    * semantic versioning

### why-not Node
* CPU-intensive Tasks ➔ code should not spend too much time doing anything else than I/O
    * event loop 
    * async 
* you don't like JS (dynamically typed languages)

### async nature and event loop
* [event-loop](2020-01-21-DRAFT-NODE-event-loop.md)



#### what is an application from the async programming perspective
* collection of functions that react to events
* this invokes work that causes future events to be fired, etc.
 
#### the christmas tree problem
* the async event-driven nature of writing code creates many indentation levels
* this can be hard to follow and is called **the christmas tree** problem

![christmat_tree_problem_in_node]({{ site.url }}/assets/img000401.png)

* the solution to the problem involve
    * promises concept

![promises_node]({{ site.url }}/assets/img000402.png)

    * Async/Await syntax

![async/await]({{ site.url }}/assets/img000404.png)

### sources
* asynchronous event-driven JavaScript runtime