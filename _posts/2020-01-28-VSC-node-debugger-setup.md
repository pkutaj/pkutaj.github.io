---
layout: post
title: VSC > Node.js Debugger 
---
## the case	
the question is, how to setup node.js debugger in my way of using the Visual Studio Code.

## toc
<!-- TOC -->



<!-- /TOC -->

## findings
* [Debug Node.js Apps using Visual Studio Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
* using `${fileDirname}` global variable getting the present working directory instead of a workspace folder, as I currently prefer to have 1 workspace for all
* also I am prompting for the name of the current file and use the same binding as for the prompt of a c# project, seems to be working handily at the moment
```json
   "configurations": [
         {
            "type": "node",
            "request": "launch",
            "name": "Launch a Node.js program in debug mode",
            "program": "${fileDirname}\\${input:projOrfile}.js",
            "skipFiles": [
                "<node_internals>/**"
            ]
        }]
        //...
        "inputs": [
    {
        "id": "projOrfile",
        "description": "Enter the project(c#) or file(javascript) name",
        "type": "promptString"
    }
```