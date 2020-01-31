---
layout: post
title: JS > What the heck is the event loop (lecture notes)
--- 

* [great lecture from the JSConf](https://youtu.be/8aGhZQkoFbQ)

## toc
<!-- TOC -->

- [what the heck is event loop anyway](#what-the-heck-is-event-loop-anyway)
    - [v8 engine](#v8-engine)
    - [web api](#web-api)
    - [single-threaded](#single-threaded)
    - [js call stack](#js-call-stack)
    - [on blowing the stack](#on-blowing-the-stack)
    - [blocking](#blocking)
    - [event loop async callbacks executed with the help of an event loop](#event-loop-async-callbacks-executed-with-the-help-of-an-event-loop)
    - [callback queue](#callback-queue)
    - [event loop](#event-loop)
        - [example: setTimeOut(function(),0)](#example-settimeoutfunction0)
- [sources](#sources)

<!-- /TOC -->

## findings
* Node's approach to handling incoming web requests is different
* Old
    * process-per-client ➔ running many processes pre requests
        * code running in each process is isolated and unaware of simultaneous
    * multi-threaded approach
        * single process has multiple threads
        * concurrency is handled on available threads
* this is **event-loop** and **"single-threaded"** model
    * JS code operates as though all incoming requests are handled in a single process and single thread
    * **no simultaneous access to memory**
    * all server same code same process same event loop
    * almost everything is centered on events handled by the loop
    * only **1 callback function** is running at **1 time**
    * many incoming HTTP functions mean that only 1 will be executing at the time
        * spend as little time in your own code, keeping it ready to receive the next event

> the fair treatment of clients if the responisibility of your appliciation

* the fair treatment is **not** handled by an abstraction or framework this is maintained in within the application 
    * typical stumbling block of on-boarding back-end dev

### what the heck is event loop anyway
* there are 3 major parts of javascript

#### v8 engine
* released with Chrome in 2008
* note that set timeout, dom, xhr requests are not in v8
* this is low-level
* functions / components
    * heap memory allocation
        * garbage collection (orinoco)
    * call stack execution context
        * web assembly (liftoff)
        * optimization compiler (turbofan)
        * JS interpreter (ignition)

![v8_engine]({{ site.url }}/assets/img000406.png)
![v8_engine_components]({{ site.url }}/assets/img000409.png)

#### web api
* extra things that browser provide and where the heavy-duty work is done

#### single-threaded
* means there is one thread
* means that there is one call stack
* means that there is one instruction executed at the time

#### js call stack
* structure recording where in the program you are with the LIFO dynamics

#### on blowing the stack
* if functions call themselves recursively, there is a limit to how tall the stack can be and the runtime kills the things for you

![blow-the-stack]({{ site.url }}/assets/2020-01-21-blowing-the-stack.gif)

* even browser prints the **stack trace**

![stack_trace]({{ site.url }}/assets/img000408.png)

#### blocking
* code that is slow on the stack
* what happens when things are slow
* if you make a network request, you have to wait until the request is done before you can continue
* you can't have blocking in browsers that depend on a fluid ui
* this is handled by **asynchronous callbacks**
    * run the code
    * give it a callback
    * run that later

![async_callback]({{ site.url }}/assets/img000407.png)

* what is the async callback doing to the call stack
* the call stack located in the engine is indeed single-tasking, but it is able to call the heavy-duty work later (with `SetTimeout()`)

![async_callback_in_action]({{ site.url }}/assets/2020-01-21-async-callback.gif)

#### event loop async callbacks executed with the help of an event loop
* it is true that **runtime** can **single-task** (single-thread, 1-thing at the time)
* **but** — there is more to it than just the **V8**
* **WebAPIs** are threads that you can make calls to and those pieces can execute
    * for Node, webAPI is replaced by C++ APIs, and threading happens in the C++ land 

#### callback queue
* queue is also a data structure — LIFO
    * stack is also a data structure — FIFO
* so there is a LIFO-call-stack and FIFO-callback-queue is a mechanism that 

#### event loop
* the simplest little piece in this whole equation with one very simple job
* it is listening to the stack
* if the stack is empty, it takes the first think from the callback queue (javascript land again)

##### example: setTimeOut(function(),0)
* the reason of running a function in 0 time is to defer something until the stack is clear (you run that through the webAPI and place it into the callback Queue)

 


### sources
* [What the heck is the event loop anyway? - Philip Roberts - JSConf EU - YouTube](https://youtu.be/8aGhZQkoFbQ)
* [What the heck is the event loop anyway? – Philip Roberts](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)
* [JavaScript V8 Engine Explained - By kadishay](https://hackernoon.com/javascript-v8-engine-explained-3f940148d4ef)