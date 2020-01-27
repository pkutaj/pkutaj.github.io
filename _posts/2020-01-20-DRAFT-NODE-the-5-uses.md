---
layout: post
title: The 5 uses of Node
---
## the case	
the question is the typical deployment of the **Node.Js**

## toc
<!-- TOC -->

- [microservices](#microservices)
- [cloud](#cloud)
- [CLI](#cli)
- [desktop](#desktop)
- [real-time services](#real-time-services)

<!-- /TOC -->

## findings
### microservices 
* and APIs
* there is no server to deploy the code to
* your code is the server  
* Node has an reputation to be lightweight and fast

CODE                                                     | COMMENT
---------------------------------------------------------|----------------------------------------------------------
1. `server.listen(port, hostname, () => {...`            | event listener. **not referred to an application server**
2. `const server = http.createServer((req, res) => {...` | callback function called when event fires

```js
/* there 11 lines is all it takes to create an API / Miscroservice */
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {                    //2. 
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {                               //1.
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### cloud
* mainly serverless functions
* dynamic language runtime
* fast startup
* low memory consumption
* the lambda function below is dwiddled to even smaller size than the `Hello World` example above
    * this is a JS functions that takes an event param and returns a response
    * supported with Google Cloud and MS Azure

![node_js_lambda_aws]({{ site.url }}/assets/img000399.png)
 
### CLI
* CLI tool used often by part of front-end development process
    * webpack
    * gulp
    * eslint
    * yeoman

### desktop
* electron framework, originating from github's atom project
* VSCODE is using this
    * skype
    * slack
    * hyper
    * ...
  
### real-time services
* utilizing web-sockets
* chatsroom, bots and alike