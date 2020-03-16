---
layout: post
title: NODE > Separating concerns with required()
categories: [node]
---
## the case	
the question is, how to separate concerns in Node via the separation of code files and their interlinking.

* I go about this by **separate ➔ require ➔ export**

## toc
<!-- TOC -->

- [STEP-1 separate concerns into files](#step-1-separate-concerns-into-files)
- [STEP-2 require the file in the referring file](#step-2-require-the-file-in-the-referring-file)
- [STEP-3 export the module from the referred file](#step-3-export-the-module-from-the-referred-file)
- [sources](#sources)

<!-- /TOC -->

## findings
### STEP-1 separate concerns into files
* using the [Bulletproof node.js project architecture 🛡️ - DEV Community 👩‍💻👨‍💻](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf) which promotes the following folder structure for the DRY and SOLID Nodes
    * he is building REST API services

```
 │   app.js          # App entry point
  └───api             # Express route controllers for all the endpoints of the app
  └───config          # Environment variables and configuration related stuff
  └───jobs            # Jobs definitions for agenda.js
  └───loaders         # Split the startup process into modules
  └───models          # Database models
  └───services        # All the business logic is here
  └───subscribers     # Event handlers for async task
  └───types           # Type declaration files (d.ts) for Typescript

```

* for the simple example, just be aware that you need

```
C:.
├───curconverter
│       app.js       # the entry point
│       config.js    # connection strings for various external APIs
│       readme.md    # self-evident
│       service.js   # business logic
│       ui.js        # input handler
```

### STEP-2 require the file in the referring file
* example of the `require()` from the top of the `app.js`
* `./js` is not required
* `./` and the file path is required
```js
//app.js
const ui = require("./ui.js")
```

### STEP-3 export the module from the referred file
* use `module.exports.<object-identifier> = <object>`

```js
//ui.js
//... at the bottom of the file
module.exports.exchangeInput = createInputValues;
```

* the example with exporting functions

```js
function curConverter(amountExchanged, exchangeRate) {
    let finalResult = parseFloat(amountExchanged) * parseFloat(exchangeRate);
    return finalResult.toFixed(2);
}
module.exports.curConverter = curConverter;
```

### sources
* [On JSDOC - JavaScript Programming with Visual Studio Code](https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support)
* [Node.js: exports vs module.exports](https://www.hacksparrow.com/nodejs/exports-vs-module-exports.html)
* [Modules-exports Node.js Documentation](https://nodejs.org/api/modules.html#modules_module_exports)

