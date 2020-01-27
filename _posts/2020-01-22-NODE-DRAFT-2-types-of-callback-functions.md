---
layout: post
title: NODE > 2 types of callbacks (user and system)
---
## the case	
the question is, 

## toc
<!-- TOC -->

- [User Events](#user-events)
- [System Events](#system-events)
    - [System Event Example: emitter.on(eventName, listener)](#system-event-example-emitteroneventname-listener)
- [sources](#sources)

<!-- /TOC -->

## findings
### User Events
* such as click

### System Events
* such as `setTimeout()`
* or  `readyStateChange()` of an Ajax request
    * the handler gets triggered when it gets to the different state of the request
    * this is why status codes matter immensely
* Node.Js has a plethora of system events
    * data events
    * completion events
    * error events

>Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.
-- [Events - Node.js v10.18.1 Documentation](https://nodejs.org/docs/latest-v10.x/api/events.html#events_events)

#### System Event Example: emitter.on(eventName, listener)
CODE                     | COMMENT
-------------------------|----------------------------------------------------------------------------------
1. `server.on(...)`      | call the emitter object
2. `'connection'`        | named event
3. ` (stream) => {...};` | listener (event handler) for asynchronous execution waiting in the callback queue

```js
server.on('connection', (stream) => { //1. - 3. 
  console.log('someone connected!');  //3. continued
});
```

### sources