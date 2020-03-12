---
layout: post
title: JavaScript > REACT > NEXT > Get me today's EUR rates, server-side, please
---

## the case	
the question is to write a server-side-rendered app using react and next.js that should print today's rates of EUR 

![demo_look_what_I_get]({{ site.url }}/assets/2020-02-15-curcon.gif)


## toc
<!-- TOC -->

- [STEP-1 REACT: replace DOM manipulation methods to first React elements](#step-1-react-replace-dom-manipulation-methods-to-first-react-elements)
- [STEP-2 REACT: create functional component](#step-2-react-create-functional-component)
- [STEP-3 REACT: pass props to a functional component](#step-3-react-pass-props-to-a-functional-component)
- [STEP-4 REACT:  converting a functional component into a class component](#step-4-react--converting-a-functional-component-into-a-class-component)
    - [STEP 4.1 add a constructor](#step-41-add-a-constructor)
- [STEP-5 REACT: JSX](#step-5-react-jsx)
    - [on JSX](#on-jsx)
- [STEP-6 Enter NEXT.JS](#step-6-enter-nextjs)
    - [STEP-6.1 installation](#step-61-installation)
    - [STEP-6.2 `packages.json`](#step-62-packagesjson)
    - [STEP-6.3 pages directory](#step-63-pages-directory)
- [STEP-7 NEXT: integrate CSS](#step-7-next-integrate-css)
    - [STEP 7.1 install @zeit/next-css and add to the next.config.js](#step-71-install-zeitnext-css-and-add-to-the-nextconfigjs)
    - [STEP-7.2 create a folder for css file](#step-72-create-a-folder-for-css-file)
- [STEP-8 NEXT: REST CALLS](#step-8-next-rest-calls)
    - [STEP-8.1 axios](#step-81-axios)
    - [STEP-8.2 promise in getInitialProps](#step-82-promise-in-getinitialprops)
    - [STEP-8.3 replace the state settings of the constructor to the appropriate settings from getInitialProps()](#step-83-replace-the-state-settings-of-the-constructor-to-the-appropriate-settings-from-getinitialprops)
    - [STEP-8.4 print JSON with JSX: keys and maps](#step-84-print-json-with-jsx-keys-and-maps)
    - [STEP-8.5  Bonus: use vanilla JavaScript to create the promise](#step-85--bonus-use-vanilla-javascript-to-create-the-promise)

<!-- /TOC -->

## findings
### STEP-1 REACT: replace DOM manipulation methods to first React elements
* add the following references to the HTML body

```html
<body>
    <div id="app"></div>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="app.js" type="application/ecmascript"></Script>
</body>
```

* start creating react elements from `app.js`
    * the `.css` is not part of the code here

```js
//const rootElement = document.getElementById('app');
// const myElement = document.createElement('h1');
// myElement.className = "orange";
// myElement.innerText = 'Hello From Pluralsight';


const myReactElement = React.createElement('h1',
    {className: 'orange'},
    'Hello From Pluralsight and React');

ReactDOM.render(
    myReactElement,
    document.getElementById('app')
);
```

### STEP-2 REACT: create functional component
* instead of rendering a react element such as `h1` it is possible to create an own **functional component** 
* render that

CODE                                              | COMMENT
--------------------------------------------------|-----------------------------------------------------
1. `const helloElement = function(){...}`         | need a function to create a functional component
2. `return React.createElement('h1',{...},"text"` | function returns the new `h1` with style and content
3. `ReactDOM.render(...)`                         | the render method with two parameters
4. `React.createElement(helloElement,{}, null),`  | param1 of the render method
5. `document.getElementById('app')`               | param2 of the render method

```js
const helloElement = function(){            //1.
return React.createElement('h1',            //2.
    {className: 'orange'},
    'Hello From Pluralsight and React')};

ReactDOM.render(                            //3.
    React.createElement(helloElement,{}, null), //4.
    document.getElementById('app')              //5.
);
```

### STEP-3 REACT: pass props to a functional component
* **React props** are parameters just get passed into react functional components or class components that we'll talk about next to have special functionality

![pass_react_props_into_functional_components]({{ site.url }}/assets/img000452.png)

```js
const Hello = (props) => {
    return React.createElement('h1',
        {className: 'orange'},
        'Welcome to the The Exchange Desk for ' + props.time);
};

ReactDOM.render(
    React.createElement(Hello, {time: new Date().toDateString()}, null),
    document.getElementById('app')
);
```

* HTML does not change

![state_after_using_react_props]({{ site.url }}/assets/img000453.png)


### STEP-4 REACT:  converting a functional component into a class component
* the exact same functionality can be created with a class component
* **benefit:** **the class component can track state**
* instead of having a definition of a function create a class definition
* unlike **props** passed into the component, **state** is something that can change within a component
    * **state changes make the component itself re-render**
* any change to state will cause the `render()` to be called again
* **note:** this does not automatically mean the DOM is actually updated
    * there is a virtual DOM compared to real DOM and is no changes are identified, nothing happens

```js
class forex extends React.Component
```

* afterwards run `render()` which is that the class is expected to see and there render the react component

#### STEP 4.1 add a constructor
* in the constructor, set a state, setting it to the object where the first attribute is time which is now
* in React, once a class component **mounts** (is loaded), there is a method `componentDidMount`
    * here, e's create a timer using the `setInternal()` of vanilla JS calling the function `tick()` every second
* you are constantly replacing the state with a new state, which is a new time accounced every second


```js

class forex extends React.Component {

     constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString()
        }
    }

    tick() {
        this.setState(() => {
            return ({
                time: new Date().toLocaleString()
            });
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        return React.createElement('h1',
            {className: 'orange'},
            `Welcome to the Currency Exchange Desk: ${this.state.time}`);
    }
}

ReactDOM.render(
    React.createElement(forex, {time: new Date().toLocaleTimeString()}, null),
    document.getElementById('app')
);
```

![change_state_every_second]({{ site.url }}/assets/2020-02-12-02.gif)

### STEP-5 REACT: JSX
#### on JSX
* XLM-like syntax
* input data passed into the component can be accessed by `render()` via `this.props`

![jsx_illustration_from_reactjs_homepage]({{ site.url }}/assets/2020-02-12-01.gif)

* comment: for years, there was a dogma of separation of concerns when it comes to structure, behavior and style (html, js and css) and it seems like this is what's happening here
    * that is done with frameworks anyway, however and JSX is only making this more elegant
 
 ![jsx_preprocessor_explaining_functionality]({{ site.url }}/assets/img000457.png)

 * there needs to be a build step that processes the sourcecode into html with tools like **browserify, webpack, babel** or some combination if necessary
 

###  STEP-6 Enter NEXT.JS
* simple as a big advantage
    * quire prescriptive as to where files need to be, because as a framework (as every framework), it's looking for files in certain places
    * specifically, it wants main pages in a directory called `pages` 
* the simplest possible process
    * 6.1 install react and next.js
    * 6.2 update `packages.json`
    * 6.3 create pages directory
    * 6.4 add `index.js`
    * 6.5 run server-side app

#### STEP-6.1 installation
* initialize node by taking in all the defaults by running `npm init -y`
* install react, react-dom and next by `npm install react react-dom next --save`
    * install it and update `package.json` which is part of the Node appliation

![folder_structure_after_next_setup]({{ site.url }}/assets/img000458.png)

#### STEP-6.2 `packages.json`
* open `packages.json`
* add 3 more scripts: `dev, build and start` 

```json
//packages.json
{
  "name": "MyApp",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "next": "^7.0.3",
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  },
  "description": ""
}
```

#### STEP-6.3 pages directory
* move the component class there
* reference the react library `import React from "react";`
* at the bottom, `export default Index;`

```js
import React from "react";

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString()
        }
    }

    tick() {
        this.setState(() => {
            return ({
                time: new Date().toLocaleString()
            });
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        return <h1>Welcome to the Currency Exchange Desk:
        {this.state.time}</h1>
    }
}

export default Index;
```

![running_next_with_npm_run_dev]({{ site.url }}/assets/2020-02-12-02.gif)

* another proof that server side rendering is working is the source-code

![static-side-rendered-code]({{ site.url }}/assets/img000459.png)

* in comparison, the `html` of a client-side-rendered application would look like 

![client-side-rendered-code-with-just-js-references]({{ site.url }}/assets/img000460.png)

* note, there is no `index.html` file in the next application, just a `.js` files that does all the work 

### STEP-7 NEXT: integrate CSS
* there are many choices, and this is a point of contention in react-projects
    * JSX inclusions
    * react modules
    * typical `css` stylesheet file, typically

#### STEP 7.1 install @zeit/next-css and add to the next.config.js
* ... since there is no `index.html` in the next project
* we need to have a custom webpack loaded or import that from our javascript component into our web pages
* the webpack configuration, however, is hidden from us by next framework
* we need to use one of the entry points that are left available 
* create the file `next.config.js` in the root of our app
* install a respective css module with `npm install @zeit/next-css --save` from the `MyApp` folder

```js
//next.config.js
const withCSS = require("@zeit/next-css");
module.exports = withCSS();
```

#### STEP-7.2 create a folder for css file
* all components will be in that `src` folder

![create_src_directory_in_myApp_add_css_there]({{ site.url }}/assets/img000461.png)

### STEP-8 NEXT: REST CALLS
> ? what is the way to handle a REST call and get some actual data and then display it without disturbing the asyc control flow of the stack ?
* use a static method `getInitialProps` to do the work before server-side-rendering begins
    * after completed ➔ pass the data into the constructor
    * component can render will all that data
* as such you won't get conflicts between client-side and server-side rendering

#### STEP-8.1 axios
* this is a Node library that lets you process REST calls very easily
* run `npm install axios --save` in the project folder
* insert `import axios from "axios";` in the top of the `index.js`



#### STEP-8.2 promise in getInitialProps

CODE                                                                                 | COMMENT
-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------
`static`                                                                             | static global method used for the initialization of the method before any rendering occurs to have the data ready
`async`                                                                              | the keyword notates that it's an async method that is delegated to the node c++ api and will return via event loop
`getInitialProps()`                                                                  | method name, default for next.js, called before the class is instantiated
`const promise = axios.get("https://api.exchangeratesapi.io/latest?base=EUR").{...}` | the syntax from axios to make the creation of JS promise as easy as possible

```js
    static async getInitialProps() {
        const promise = axios.get("https://api.exchangeratesapi.io/latest?base=EUR").
        then(response => {
            return {
                hasErrored: false, 
                curconData = response.data
            };
        })
        .catch(error => {
            return {
                hasErrored: true, 
                message: error.message
            };
        });

        return promise;

    }
```

#### STEP-8.3 replace the state settings of the constructor to the appropriate settings from getInitialProps()

* assume `getInitialProps()` is works

CODE                              | COMMENT
----------------------------------|-------------------------------------------------------------------------------------------
1. `constructor(props)`           | default, instantiates a new class component with properties passed into it to define state
2. `super(props);`                | default, inherits props of `React.Component`
3. `this.state = {`               | default, the opening statement for the state of a current class
4. `hasErrored: props.hasErrored` | passed the data promise about the error-state
5. `message: props.message,`      | error message in case the promise has not been fulfilled
6. `curconData: props.curconData` | data delivered by the fulfilled promise

```js
class Index extends React.Component {

    static async getInitialProps() {
        const promise = axios.get("https://api.exchangeratesapi.io/latest?base=EUR").
            then(response => {
                return {
                    hasErrored: false,
                    curconData: response.data
                };
            })
            .catch(error => {
                return {
                    hasErrored: true,
                    message: error.message
                };
            });

        return promise;

    }

    constructor(props) {                  //1.
        super(props);                     //2.
        this.state = {                    //3.
            hasErrored: props.hasErrored, //4.
            message: props.message,       //5.
            curconData: props.curconData  //6.
        }
        
    }
```

#### STEP-8.4 print JSON with JSX: keys and maps
> how to you print the whole parsed object onto a page with JSX ? 
* try `map()`
* in JSX, use the inheritet `.keys()` which turns object keys into an array

```js
Object.keys({ GBP: '', CZK: ''}) // ['GBP', 'CZK']
```

* when yo call `array.map` the function takes 2 arguments
    1. the item
    2. the index

* this works  

```js
{this.state.curconData.rates.CAD} //1.4406
```

* how to print tne first key, and next to it the value of that key
* use ` {Object.keys(this.state.curconData)}` to get `ratesbasedate` rendered

CODE                                       | COMMENT
-------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------
` <ul>...</ul>`                            | JSX syntax
`Object.keys(this.state.curconData.rates)` | `Object.keys()` returns an array of keys within the object, which were the list of currencies `[CZK, GBP, ...]`
`.map(currency, i) =>`                     | `.map` method takes a parametrized name for the keys of an array, with a parametrized name for an index, to be able to map them
`li key={i}`                               | the list item element is passed the index number
`{currency}`                               | template literal printing the mapped name of the key
`{this.state.curconData.rates[currency]}`  | remember for in loops, there has be a bracket notation to evaluate the parameter, which is mapped to the index number thus returning the value of the key

```js
    render() {
        return (
            <ul>
                {
                    Object.keys(this.state.curconData.rates).map(
                        (currency, i) => (
                            <li key={i}>{currency}: {this.state.curconData.rates[currency]}
                            </li>
                        ))
                }
            </ul>
                )
                }
}
```

* result

```
CAD: 1.4406
HKD: 8.4398
ISK: 137.7
PHP: 54.863
DKK: 7.4721
HUF: 337.12
CZK: 24.835
AUD: 1.6138
RON: 4.7645
SEK: 10.4823
```

#### STEP-8.5  Bonus: use vanilla JavaScript to create the promise
* this is very wordy, compared to the oneliner that axios gave us, but sometimes it is good to open-up the basic concept, mainly when its depedent on an external package
* to compare, this is axios...

```js
static async getInitialProps() {
        const promise = axios.get("https://api.exchangeratesapi.io/latest?base=EUR").
            then(response => {...
```

* ...this is all the manual labor done with the vanilla
    * you touch HTTP and the inner workings of the protocol here, which is legit 
    * the concept is explained in {% post_url 2020-01-22-NODE-GEPARD-api-call %}

```js
static async getInitialProps() {
        const exchangeRatesTodayPromise = new Promise((resolve, reject) => {
            const connectionURL = `https://api.exchangeratesapi.io/latest?base=EUR`
            const request = https.get(connectionURL, response => {
                if (response.statusCode === 200) {
                    let responsePayload = "";
                    response.on("data", chunk => {
                        responsePayload += chunk.toString();
                    })
                    response.on("end", () => {
                        try {
                            const finalResult = JSON.parse(responsePayload);
                            resolve(finalResult);
                        } catch (parseError) {
                            handleErrors(parseError)
                        }
                    })
                } else {
                    const currentStatusCode = response.statusCode;
                    const HTTPStatus = `${currentStatusCode}: ${http.STATUS_CODES.currentStatusCode}`;
                    const HTTPStatusCodeError = new Error(`There was an HTTP ${HTTPStatus} error)`);
                    handleErrors(HTTPStatusCodeError);
                }
            }
            )
            request.on("error", error => {
                reject("error", error);
            });

        }).then(response => {...}
```