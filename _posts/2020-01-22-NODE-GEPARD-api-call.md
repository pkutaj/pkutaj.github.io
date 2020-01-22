---
layout: post
title: NODE > GEPARD; the personal pattern of working with data requested via API call 
---
## the case	
the question is, how to write a small Node app that would call the API of a user profile from the REST API endpoint `https://teamtreehouse.com/pavolkutaj3.json` and to derive a design pattern for the further usage.

The solution is "encapsulated" (no pun intended:) in the personal GEPARD (see the steps for initial letters). So, meet GEPARD the API caller running through Node. 

![gepard]({{ site.url }}/assets/2020-01-22-geparp.jpg)

## toc
<!-- TOC -->

- [STEP-1 G — get response:  API URL](#step-1-g--get-response--api-url)
- [STEP-2 E — extract payload](#step-2-e--extract-payload)
    - [STEP-2.1. data handler](#step-21-data-handler)
    - [STEP-2.2 convert packages: parse the Buffer type with ToString method](#step-22-convert-packages-parse-the-buffer-type-with-tostring-method)
    - [STEP-2.3 concatenate packages: merge responses into a single binding](#step-23-concatenate-packages-merge-responses-into-a-single-binding)
    - [STEP-2.4 end handler](#step-24-end-handler)
- [STEP-3 PAR — parse-programmatically](#step-3-par--parse-programmatically)
- [STEP-4 D — do the work. Here, print the requested data](#step-4-d--do-the-work-here-print-the-requested-data)
- [Extra STEP-5 query the users from the command line](#extra-step-5-query-the-users-from-the-command-line)
- [sources](#sources)

<!-- /TOC -->

## findings
### STEP-1 G — get response:  API URL
* From the [Node documentation](https://nodejs.org/docs/latest-v10.x/api/https.html#https_https_get_options_callback), use the `https.get()`

CODE                                          | COMMENT
----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------
1.1 `const https = require('https');`         | bind `https` object via `require` method to the `https` variable
1.2 `https.get(...`                           | call `get()` method of the object, it takes 2 parameters
1.3 `'https://teamtreehouse.com/${userName}'` | parameter 1 of type <string> is the url, here with a template literal parsing a `${userName}` declared in the init section of the code
1.4 `response => {...`                        | parameter 2 is an anonymous arrow function taking 1 parameter (therefore no parenthesis required)
1.5 `console.dir(response)`                   | the object is output into the console

```js
//STEP-1 connect and get API URL
const https = require('https');                         //1. 
const request = https.get(`https://teamtreehouse.com/${userName}`, response => {
    console.dir(response); 
});;
```

### STEP-2 E — extract payload
#### STEP-2.1. data handler
* in the documentation, it says that the response object contains also a data event that gets emitted when the response package comes in and it 

CODE                     | COMMENT
-------------------------|----------------------------------------------------------------------------------------------
2.1.1 `response.on(...)` | call the event `emitter.on(eventName, listener)`, see documentation
2.1.2 `"data"`           | the `eventName` acceptable for this type of object/interface (here stream, see f12 in vscode)
2.1.3 `data =>`          | the parameter 1 of `listener<Function>` passing in the response payload (body)
2.1.4 `=> {...}`         | the body of the data handler / event listener


```js

//STEP-1 connect and get API URL
const https = require("https");
const request = https.get(`https://teamtreehouse.com/${userName}`, response => {
//STEP-1 END

    //STEP-2 extract the payload
    response.on("data", data => {               //2.1.1-2.1.3 
    console.log("the dwarves returned!")        //2.1.4 
        console.log(data)
    });
    //STEP-2 END
}); 
```

* the console **does not** 
    * return the payload in a readble format
        * see the message `the dwarves returned` logged for every message
    * return a single response
        * see the numeric buffer type

```
Buffer(14937) [60, 33, 68, 79, 67, 84, 89, 80, …]
app.js:31
the dwarves returned!
app.js:30
Buffer(9781) [95, 118, 105, 101, 119, 95, 116, 105, …]
app.js:31
the dwarves returned!
app.js:30
Buffer(16384) [100, 51, 55, 99, 57, 54, 52, 50, …]
app.js:31
[0..9999]
[10000..16383]
the dwarves returned!
```

* the `<Buffer>` is a common Node type emitted by network and file events
* payload is sent in packets of information
* Node uses streams to implement its nonblocking features so that application is free to do other things while data is being transfered (due to its single-threaded nature)
* in order to convert the `<Buffer>` to `<String>`, call the `toString()` on the `<Buffer>`

#### STEP-2.2 convert packages: parse the Buffer type with ToString method
* apply the `toString()` to convert the `<Buffer>` to a readable payload

CODE                                  | COMMENT
--------------------------------------|------------------------------------------------------------------
2.2.1 `console.log(data.toString());` | the response payload is converted from `<Buffer>` into `<String>`

```js
//STEP-1. connect to API URL
const https = require("https");
const request = https.get(`https://teamtreehouse.com/${userName}`, response => {
    //STEP-2 extract the payload
    response.on("data", data => {
        console.log("the dwarves returned!")
        console.log(data.toString());
    });
}); 
```
* you still get an HTML file proper

```html
app.js:20
the dwarves returned!
app.js:30
{"name":"Pavol Kutaj","profile_name":"pavolkutaj3","profile_url":"https://teamtreehouse.com/pavolkutaj3","gravatar_url":"https://secure.gravatar.com/avatar/0f2fdafa2eaae5d2b74b2d6cf9eb4e50?s=400\u0026d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png\u0026r=pg",
```

#### STEP-2.3 concatenate packages: merge responses into a single binding
CODE                                     | COMMENT
-----------------------------------------|--------------------------------------------------------------------------------
2.3.1 `let responseBody = "";`           | declare a binding outside of `.on()` emitter that will bind the merged packages
2.3.2 `responseBody += data.toString();` | concatenate each converted payload to the binding

```js
//STEP-1. connect to API URL
const https = require("https");
const request = https.get(`https://teamtreehouse.com/${userName}`, response => {
    //STEP-2 extract the payload
    let responseBody = "";                     //2.3.1
    response.on("data", data => {         //2.1.1-2.1.3 
        responseBody += data.toString();  //2.2.1, 2.3.2
        console.log(responseBody); 
    });
}); 
```

#### STEP-2.4 end handler 
* types containing `"data"` event also contain an `"end"` event
* the end event is emitted when the reading of the data is finished and **only then** operate on the payload

CODE                          | COMMENT
------------------------------|------------------------------------------------------------------------------------
`response.on("end", () => {}` | pass the `"end"` event into the `.on()` emitter of the `<stream>` `response` object
`console.log(responseBody)`   | end-event handler logging the complete payload into the console


```js
//STEP-1. connect to API URL
const https = require("https");
const request = https.get(`https://teamtreehouse.com/${userName}.json`, response => {
    //STEP-2 extract the payload
    let responseBody = "";                                   //2.3.1
    response.on("data", data => {                       //2.1 
        responseBody += data.toString();                //2.3.2, 2.2.1
    });
    response.on("end", () => console.log(responseBody)); //2.4.1—2.4.2
}); 
```

### STEP-3 PAR — parse-programmatically
* the returned `.json` string has to be converted into an object
* parsing is the process of converting a string into a data-structure
* `json` is a native object and as such it's not found in the node documentation, but inside mdn 
    * see [JSON - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

CODE                                                         | COMMENT
-------------------------------------------------------------|------------------------------------------------------------------------------------------------------
3.1 `const parsedResponsePayload = JSON.parse(responseBody)` | use the `JSON` native object and its `parse` parse the passed `responseBody` and bind to the variable

```js
 //STEP-1. connect to API URL
const https = require("https");
const request = https.get(`https://teamtreehouse.com/${userName}.json`, response => {
    //STEP-2 extract the payload
    let responseBody = "";                              //2.3.1
    response.on("data", data => {                       //2.1 
        responseBody += data.toString();                //2.3.2, 2.2.1
    });
    response.on("end", () => {                          //2.4.1—2.4.2
    //STEP-3 parse the payload
        const parsedResponsePayload = JSON.parse(responseBody) //3.1
    }; 
}); 
```
### STEP-4 D — do the work. Here, print the requested data

CODE                                                                                           | COMMENT
-----------------------------------------------------------------------------------------------|-----------------------------------------------------------
4.1 `printUserProfile(...);`                                                                   | call the function defined in the init section
4.2 `(userName, parsedResponsePayload.badges.length, parsedResponsePayload.points.JavaScript)` | pass the argument by properly querying object's properties

```js
//STEP-1. connect to API URL
const https = require("https");
const request = https.get(`https://teamtreehouse.com/${userName}.json`, response => {
    //STEP-2 extract the payload
    let responseBody = "";                              //2.3.1
    response.on("data", data => {                       //2.1 
        responseBody += data.toString();                //2.3.2, 2.2.1
    });
    response.on("end", () => {                          //2.4.1—2.4.2
    //STEP-3 parse the payload
        const parsedResponsePayload = JSON.parse(responseBody) //3.1
    }; 
    /* STEP-4. print the data */
        printUserProfile(userName, parsedResponsePayload.badges.length, parsedResponsePayload.points.JavaScript);
}); 

```

### Extra STEP-5 query the users from the command line
* See [How to parse command line arguments - Node.js](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)
* `argv` is short for argument values and is an array with the first two items being the path of node and the present working directory
* this is common for all C and C-related environments
* since this is an array, use `Array.prototype.slice()` to remove the first 2 items of the array

CODE                                               | COMMENT
---------------------------------------------------|----------------------------------------
5.1 `const userNames = process.argv.slice(2);`     | bind the >= third item from the console
5.2 `userNames.forEach(userNameArrayItem => {...}` | run STEPS-1 to STEP-4 for each username

```js
const userNames = process.argv.slice(2);                    //5.1
function printUserProfile(userName, badgeCount, points) {
    ...}
userNames.forEach(userNameArrayItem => {                    //5.2
    const httpsObject = require("https");
    const request = httpsObject.get(`https://teamtreehouse.com/${userNameArrayItem}.json`, response => {
        ...}
});
```

### sources
* [HTTPS - Node.js v10.18.1 Documentation](https://nodejs.org/docs/latest-v10.x/api/https.html#https_https_get_options_callback)
* [JSON - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
* [How to parse command line arguments - Node.js](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)
* [Array.prototype.slice() - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)