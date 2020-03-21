---
layout: post
title: javascript > Web components templates
categories: [javascript]
---
## the case	
* the question is, what are templated solutions in the context of web components
* there is an html `<template>` to use reusable markup in the native HTML

## toc
<!-- TOC -->

- [(1) existing template strategies](#1-existing-template-strategies)
    - [(1.1) problem illustration](#11-problem-illustration)
        - [(1.1.1) HTML in Script Tags](#111-html-in-script-tags)
        - [(1.1.2) Hidden DOM elements](#112-hidden-dom-elements)
    - [(1.2) enter `<template>` tag](#12-enter-template-tag)
- [(2) template attributes](#2-template-attributes)
    - [(2.1) inert](#21-inert)
    - [(2.2) unselectable](#22-unselectable)
    - [(2.2) flexible placement](#22-flexible-placement)
- [(3) activation: DRIA](#3-activation-dria)
    - [(3.1) STEP-1 DEFINE](#31-step-1-define)
    - [(3.2) STEP-2 REFER](#32-step-2-refer)
    - [(3.3) STEP-3 IMPORT](#33-step-3-import)
    - [(3.4) STEP-4 APPEND](#34-step-4-append)
    - [(3.5) DEMO: Hello World](#35-demo-hello-world)

<!-- /TOC -->

## findings
### (1) existing template strategies
* template define a **preset format** for reuse
* examples
    * ruby ➔ HAML
    * .NET ➔ razor
    * python ➔ django
    * node ➔  jade
* huge number of server-side solutions for templating
* what if we render the UI on the client
    * up until now, no standardized support for templates parsed on the client

#### (1.1) problem illustration
* you have parts that need to be repeated on the page

![simple_template_of_table_row]({{ site.url }}/assets/img000535.png)

* usually 2 ways to work-around this problem
* we need
    * template contents to be inert until instantiated
    * instantiated templates to be easily traversed and cloned as part of DOM

##### (1.1.1) HTML in Script Tags
* stuffing markup inside `<script>` with a custom type attribute
* popular, because nothing inside runs or renders
* the proprietory values for the type is not recognized by the browser, it is ignored
* **disadvangate:** this is not recognized as DOM
* you are using `.innerHTML` and templates are strings
* e.g. **handlebars** or **kendo ui**

![handlebars_create_custom_type_templates]({{ site.url }}/assets/img000536.png)

##### (1.1.2) Hidden DOM elements
* advantage: easy and safe to clone
* no `.innerHTML`
* disadvantage: everything hidden still runs
    * may throw 404, `<script>` runs, etc.
    
#### (1.2) enter `<template>` tag
* declares chunks of HTML not affecting the rendering 
* it can be cloned to use in any way

### (2) template attributes

#### (2.1) inert
* the markup is inert, it does not render, any script does not run, it does nothing...
    * `<img>` with bad path would not throw `404`
    * javascript won't run; video won't play
* ...until its **CLONED FOR USE**

#### (2.2) unselectable
* the content of `<template>` is hidden from traditional selection techniques
    * see SML 

![document.getElementById_not_working]({{ site.url }}/assets/img000573.png)

* JS or CSS selectors won't work
* elements are not traversed until cloned and activated (instantiated )
* this design is compliant with inert nature of templates (classes); you are not able to manipulate

#### (2.2) flexible placement
* `<template>` can be located in the `<head>`, in the `<body>`, or even in a `<frameset>`
* ... it can be a child of a table

### (3) activation: DRIA
* 3 steps of activation

#### (3.1) STEP-1 DEFINE
* use the `<template>` tag with a proper `id` 
* put the content of the template inside

```html
 <template id="templateHelloWorld">
    <p>Hello World</p>
</template>
```

#### (3.2) STEP-2 REFER
* refer by selection
* you can't manipulate by selection
* but you can refer by selection as an init for instantiation

```js
var template = document.querySelector("#mytemplate")
```

#### (3.3) STEP-3 IMPORT
* importNode
* this is basically an instantiation of the blueprint
* pass the content of a template into `importNode()` of a document object
* the `content` property returns everything within `<template></template>`
* this is essential, the content of the template is under the **CONTENT** property which keeps us from accidentally accessing it
* the second parameter is important (`true` below)
    * decides whether or not to do a deep copy
    * whether the descendants will be copied

```js
var clone = document.importNode(template.content, true);
```

#### (3.4) STEP-4 APPEND
* append the binding to the body of HTML by 

```js
document.body.appendChild(clone)
```

#### (3.5) DEMO: Hello World 

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!-- 1. DEFINE -->
    <template id="templateHelloWorld">
        <p>Hello World</p>
    </template>

    <script>
        /* 2. REFER */
        var templateHelloWorld = document.querySelector("#templateHelloWorld");
        /* 3. INSTANTIATE */
        var clone = document.importNode(templateHelloWorld.content, true)
        var clone2 = document.importNode(templateHelloWorld.content, true)
        /* 4. APPEND */
        document.body.appendChild(clone)
        document.body.appendChild(clone2)

    </script>
</body>

</html>
```

![hello_world_for_templates]({{ site.url }}/assets/img000575.png)