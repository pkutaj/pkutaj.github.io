---
layout: post
title: NODE > Run with debugger from the integrated VSC console
---
## the case	
the question is, how to run node from the integrated console to have debugger attached to it right away

## toc
<!-- TOC -->

- [sources](#sources)

<!-- /TOC -->

## findings
* Set the break-point
* Execute the VSC command **Debug: Toggle Auto-Attach**
* Run from the console with `node --inspect-brk program.js`
* The debugger starts!

### sources
* [Attaching to a process Debug Node.js Apps using Visual Studio Code](https://code.visualstudio.com/╬docs/nodejs/nodejs-debugging#_attaching-to-nodejs)