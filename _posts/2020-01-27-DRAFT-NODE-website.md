---
layout: post
title: NODE > Server-Side App without 3rd party 
---
## the case	
the question is, how to build a simple Node Front-end without using any third-party framework that does so much of the heavy-lifting

## toc
<!-- TOC -->

- [create a node web server](#create-a-node-web-server)
- [sources](#sources)

<!-- /TOC -->

## findings
### create a node web server

```js
const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);
```

### sources
* [How do I create a HTTP server? - Node.js](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/)