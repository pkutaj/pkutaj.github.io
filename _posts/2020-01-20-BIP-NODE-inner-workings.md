---
layout: post
title: NODE > The inner workings
---
## the case	
the question is learning the foundations of Node

## toc
<!-- TOC -->

- [running the hello world](#running-the-hello-world)
- [the v8 engine](#the-v8-engine)
- [not just console.log](#not-just-consolelog)
- [JS without the browser](#js-without-the-browser)
- [sources](#sources)

<!-- /TOC -->

## findings
### running the hello world
* create `app.js` with `console.log('hello world');`
* navigate to the folder 
* run `node app.js`

### the v8 engine
* initially, js was supposed to run in the browser - node is the empowers JS and makes it hotn
* javascript engine converts the cource code into machine code
* `node.js` is written in c++
* the reason why is because it uses v8 engine written in c++
* v8 is running in chrome
    * can run standalone or be embedded into any c++ app

![javascript_engine]({{ site.url }}/assets/img000405.png)

### not just console.log
* also `console.error` and `console.dir` 

```js
console.log("hello from mr paul");
console.error("something went wrong");
console.dir({name: "Pavol", age:33});
```

### JS without the browser
* in browser the world is split into
    * native objects, available independent from the environment
        * string
        * array
        math
    * host objects, typical for browser only
        * Window
        * dowument
        * history
        * xmlhttprequest

### sources
