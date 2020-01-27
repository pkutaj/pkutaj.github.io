---
layout: post
title: NODE > Error Handling
---

## the case	
the question is how to handle errors in node

## toc
<!-- TOC -->

- [Error TYPES: asynchronous, immediate](#error-types-asynchronous-immediate)
- [Error handling best practice: DRY & semantic](#error-handling-best-practice-dry--semantic)
- [TYPE-1: asynchronous errors (emmited errors)](#type-1-asynchronous-errors-emmited-errors)
    - [asynchronous error example: resource not found](#asynchronous-error-example-resource-not-found)
    - [STEP-1 define an error handler, put in into properly positioned listener](#step-1-define-an-error-handler-put-in-into-properly-positioned-listener)
- [TYPE-2 Immediatelly thrown errors (exceptions): the try—catch block](#type-2-immediatelly-thrown-errors-exceptions-the-trycatch-block)
    - [general exceptions](#general-exceptions)
    - [JSON parsing exceptions](#json-parsing-exceptions)
    - [HTTP status codes exceptions](#http-status-codes-exceptions)
        - [HTTP Status Codes Overview](#http-status-codes-overview)
        - [STEP-1 Test for 200 with if-else & .statusCode property](#step-1-test-for-200-with-if-else--statuscode-property)
        - [STEP-2 instantiate a new error to streamline it with the handleError()](#step-2-instantiate-a-new-error-to-streamline-it-with-the-handleerror)
        - [STEP-3 use StatusCode object of the HTTP Node Module containing text for the status code](#step-3-use-statuscode-object-of-the-http-node-module-containing-text-for-the-status-code)
- [sources](#sources)

<!-- /TOC -->

## findings
### Error TYPES: asynchronous, immediate
* there seem to be 2 major types of errors
    * TYPE-1: asynchronously thrown  — emmited as events from within the executed callback function and
    * TYPE-2: immediatelly thrown  — if bad arguments are passed

### Error handling best practice: DRY & semantic
* DRY, i.e. the don't repeat yourself rule states that **every piece of knowledge must have a single, unambiguous representation in the system**
* so if there is multiple `console.error(error.message)` this should be abstracted into a single representation which 
could be a function expression in the beginning of the code

```js
const handleError = error => console.error(`Hello, there is a problem: ${error.message}`);
```
* and then, the arguments would be semantically named in the respective pieces of the code
* example of the `try` — `catch` blocks handling possible errors of the JSON parsing
* in case of an error, the catch function is passed an error object and the `handleError` function uses the `.message` property to print the error to the console

```js
try {
    const parsedResponsePayload = JSON.parse(responsePayload);
    printUserProfile(userNameArrayItem, parsedResponsePayload.badges.length, parsedResponsePayload.points.JavaScript);
} catch (JSONparseError) {        // note the semantization of the argument to increase the readibility of code
    handleError(JSONparseError);
}
```

### TYPE-1: asynchronous errors (emmited errors)
* many async node.js apis provide an error event to listen to
    * these objects emit error events
* when using an object emitting an error, the rule is to **implement an error callback to be waiting in the callback queue**
* ... just in case an error event is fired

#### asynchronous error example: resource not found
* imagine a typo omitting `.` after `www`

```js
const request = httpsObject.get(`https://wwwteamtreehouse.com/${userNameArrayItem}.json`, response => {...
```

* the error is unhandled, but there is a clue already (see `Unhandled 'error' event`)

```log
events.js:174
      throw er; // Unhandled 'error' event
      ^
<!-- error message -->
Error: getaddrinfo ENOTFOUND wwwteamtreehouse.com wwwteamtreehouse.com:443
<!-- stack trace -->
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:56:26)
Emitted 'error' event at:
    at TLSSocket.socketErrorListener (_http_client.js:392:9)
    at TLSSocket.emit (events.js:198:13)
    at emitErrorNT (internal/streams/destroy.js:91:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:59:3)
    at process._tickCallback (internal/process/next_tick.js:63:19)
```



#### STEP-1 define an error handler, put in into properly positioned listener
* note the handler has to be positioned properly  (STEP-1.2)
* the convention is to put `e` as an error for property

CODE                                                                      | COMMENT
--------------------------------------------------------------------------|-----------------------------------------------------------------------------
1.1 `const handleErrors = error => console.error(`...${error.message}`);` | the minified function expression handling all errors
1.2 `request.on("error", handleErrors);`                                  | error handler, passing the `"error"` parameter into a callback defined above

```js
const handleErrors = error => console.error(`Hello, there is a problem with your request: ${error.message}`); //1.1
//...
const request = httpsObject.get(`https://wwwteamtreehouse.com/${userNameArrayItem}.json`, response => {//...DO THE WORK
}
    )
request.on("error", handleErrors); //1.2
```

* the console now returns a much friendlier error message without the stack trace

```log
Hello, there is a problem with your request: getaddrinfo ENOTFOUND wwwteamtreehouse.com wwwteamtreehouse.com:443
```

### TYPE-2 Immediatelly thrown errors (exceptions): the try—catch block
#### general exceptions
* example of an immediatelly-thrown error would be to pass an URL without the protocol 
* the following code, missing `https://` in the resource name will immediatelly crash

```js
 const request = httpsObject.get(`teamtreehouse.com/${userNameArrayItem}.json`, response => {//...
```
* ... throws an error immediatelly from the node c++ API, that is not being emitted by the interface doing the request

```log
https.js:274
      throw new ERR_INVALID_DOMAIN_NAME();
      ^

TypeError [ERR_INVALID_DOMAIN_NAME]: Unable to determine the domain name
    at request (https.js:274:13)
    at Object.get (https.js:293:15)
```

* wrap the code in the `try{}` block
* add `catch{}` block which executes with the access to the error message

CODE                            | COMMENT
--------------------------------|---------------------------------------------------------------
`try{...}`                      | the `try` block around code that may thrown an immediate error
`catch(mainBlockException)`     | error argument / parameter
`${mainBlockException.message}` | passing the `.message` property to be output

```js
try {
    userNames.forEach(userNameArrayItem => {//...DO THE WORK
    }
})
} catch(mainBlockException) {
handleErrors(mainBlockException);
};
};
```

#### JSON parsing exceptions
* scenario: requesting in the `.json` that does not exist ➔ the webserver returns `"Not found"` 

```log
undefined:1
Not found
^

SyntaxError: Unexpected token N in JSON at position 0
    at JSON.parse (<anonymous>)

```

* the solution

```js
try {
    const parsedResponsePayload = JSON.parse(responsePayload);
    printUserProfile(userNameArrayItem, parsedResponsePayload.badges.length, parsedResponsePayload.points.JavaScript);
} catch (JSONparseError) {        // note the semantization of the argument to increase the readibility of code
    handleError(JSONparseError);
}
```

#### HTTP status codes exceptions
* You can handle all status codes !== 200, i.e. those that are not succesful

##### HTTP Status Codes Overview
* See [Hypertext Transfer Protocol (HTTP) Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)

Code | Code-Name     | Code-Description
-----|---------------|------------------------------------------------------------------
100+ | Informational | The request was received, continuing process
200+ | Successful    | The request was successfully received, understood, and accepted
300+ | Redirection   | Further action needs to be taken in order to complete the request
400+ | Client error  | The request contains bad syntax or cannot be fulfilled
500+ | Server error  | The server failed to fulfill an apparently valid request

##### STEP-1 Test for 200 with if-else & .statusCode property
 
CODE                                                                  | COMMENT
----------------------------------------------------------------------|------------------------------------------------------------------------------
1. `if (response.statusCode === 200) {...`                            | the test is **the first instruction** during the anonymous callback execution
2. `else {console.error("there is a problem with the HTTP response")` | print the error

```js
try {
    userNames.forEach(userNameArrayItem => {
        const httpsObject = require("https");
        const request = httpsObject.get(`https://teamtreehouse.com/${userNameArrayItem}.json`, response => {
            if (response.statusCode === 200) {                                      //1. 
                //...DO THE WORK
                } else {console.error("there is a problem with the HTTP response")  //2. 
            }
        }
```

##### STEP-2 instantiate a new error to streamline it with the handleError()

CODE                                                           | COMMENT
---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------
1. `const HTTPStatusCodeError = new Error(string handleError)` | binding of a new Error object instantiated at the moment of failing the test and passing a specific HTTPStasus error
2. `handleError(HTTPStatusCodeError);`                         | function expression accepting the customized error object as a parameter, returning its specific error message

```js
try {
    userNames.forEach(userNameArrayItem => {
        const httpsObject = require("https");
        const request = httpsObject.get(`https://teamtreehouse.com/${userNameArrayItem}.json`, response => {
            if (response.statusCode === 200) {                                      
                //...DO THE WORK
                } else {
                const HTTPStatusCodeError = new Error(`There was an ${response.statusCode} error getting the profile for ${userNameArrayItem}`); //1.
                handleError(HTTPStatusCodeError);                                                                                               //2.
            }   
            }
        }
```

##### STEP-3 use StatusCode object of the HTTP Node Module containing text for the status code
* `http.STATUS_CODES`is an object that maps all the standard HTTP status codes to their short description

```js
http.STATUS_CODES
{ '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '103': 'Early Hints',
  '200': 'OK',
  '201': 'Created',
//...
```

* the `http` module is required for this to work properly
* to have the key:value pair printed in full, a for-in loop is necessary

CODE                                                                                                                             | COMMENT
---------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------
1. `const http = require('http');`                                                                                               | require the `http` module containing the required list
2. `let currentStatusCode = response.statusCode;`                                                                                | bind the status code from the response
3. `let HTTPStatusText = getHTTPStatusText(currentStatusCode, http)`                                                             | bind the returned value of the dedicated getHTTPStatusText function; pass both of the previous variables in
4. `const HTTPStatusCodeError = new Error(`There was an ${HTTPStatusText} error getting the profile for ${userNameArrayItem}`);` | create a new custom error object, pass the gained info
5. `handleError(HTTPStatusCodeError)`                                                                                            | pass the new error object `HTTPStatusCodeError` into the handleError error handler

```js
        const request = httpsObject.get(`https://teamtreehouse.com/${userNameArrayItem}.json`, response => {
            if (response.statusCode === 200) {//DO THE WORK
                        } else {
                const http = require('http');                                       //1.
                currentStatusCode = response.statusCode;                            //2.    
                let HTTPStatusText = getHTTPStatusText(currentStatusCode, http)     //3.     
                const HTTPStatusCodeError = new Error(                              //4. 
                    `There was an ${HTTPStatusText} error getting the profile for ${userNameArrayItem}`);
                handleError(HTTPStatusCodeError)                                   //5.
            }
        }
```

* the function extracting the full text of the HTTP status code is put in the init section of the code
    * note it is a function declaration, the interpretation happens only when called
    * note the for-in loop and the bracket notation, essential for the object manipulation in js
    
    
```js
function getHTTPStatusText(currentStatusCode, http) {
    for (statusCode in http.STATUS_CODES) {
        if (statusCode == currentStatusCode) {
            let HTTPStatusText = statusCode + ':' + http.STATUS_CODES[statusCode];
            return HTTPStatusText;
        }
    }
```

### sources
* [Console - Node.js v13.7.0 Documentation](https://nodejs.org/api/console.html#console_console_error_data_args)
* [try...catch - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
* [RFC 7231 - Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content](https://tools.ietf.org/html/rfc7231#section-6)
* [HTTP STATUS CODE - Node.js v13.7.0 Documentation](https://nodejs.org/api/http.html#http_http_status_codes)
* [Property accessors - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors)