---
layout: post
title: javascript > components > data injection and nesting
categories: [javascript]
---
## the case	
the question is, what steps are needed to perform data injection into HTML templates (part of the native web components suite)

## toc
<!-- TOC -->

- [DATA INJECTION](#data-injection)
    - [STEP-1 DEFINE](#step-1-define)
    - [STEP-2 REFER](#step-2-refer)
    - [STEP-3 IMPORT](#step-3-import)
    - [STEP-4 INJECT](#step-4-inject)
    - [STEP-5 APPEND](#step-5-append)
    - [DEMO: HELLO MR.](#demo-hello-mr)
    - [DEMO: HELLO MR. WITH A BUTTON](#demo-hello-mr-with-a-button)

<!-- /TOC -->

## findings
### DATA INJECTION
* dynamic data are injected into templates before cloning

#### STEP-1 DEFINE
* example: inline injection with `<span class = "foo">` 

```html
<!-- HTML -->
   <template id="templateHelloWorld">
        <p>Hello Mr <span class="name"></span>!</p>
    </template>
```

#### STEP-2 REFER

```js
/* JS */
var templateHelloWorld = document.querySelector("#templateHelloWorld");
```

#### STEP-3 IMPORT

```js
/* JS */
var clone = document.importNode(templateHelloWorld.content, true)
```

#### STEP-4 INJECT
* change placeholders within the template
* if there is a `<span class="verb">` in the template, it would be replaced by word `awesome`

```js
/* JS */
clone.querySelector(".name").textContent = "Paul";
```

#### STEP-5 APPEND

```js
/* JS */
document.body.appendChild(clone)
```

#### DEMO: HELLO MR.

![hello_mr]({{ site.url }}/assets/img000583.png)

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
        <p>Hello Mr <span class="name"></span>!</p>
    </template>

    <script>
        /* 2. REFER */
        var templateHelloWorld = document.querySelector("#templateHelloWorld");
        /* 3. INSTANTIATE */
        var clone = document.importNode(templateHelloWorld.content, true)
        /* 4. INJECT */
        clone.querySelector(".name").textContent = "Paul";
        /* 5. APPEND */
        document.body.appendChild(clone)

    </script>
</body>

</html>
```

#### DEMO: HELLO MR. WITH A BUTTON
* this is the first time using **PRE-INCREMENT**
    * you want to perform an incrementation before displaying the value
    * to do this you could either

```javascript
numberOfCopies++;
clone.querySelector(".number-of-copies").textContent = numberOfCopies;
```

...or

```javascript
clone.querySelector(".number-of-copies").textContent = ++numberOfCopies;
```

... it's the same thing. thanks to [JavaScript — Back to Basics: Prefix vs. Postfix - By](https://hackernoon.com/javascript-back-to-basics-prefix-vs-postfix-8da5256223d2)


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
        <p>Hello Mr <span class="name"></span>!</p>
        <p>This template has been copied <span class="number-of-copies"></span>times</p>
    </template>
    <button onclick="copyTemplate()">Copy Template</button>
    <script>
        let numberOfCopies = 0;
        function copyTemplate() {
            /* 2. REFER */
            var templateHelloWorld = document.querySelector("#templateHelloWorld");
            /* 3. INSTANTIATE */
            var clone = document.importNode(templateHelloWorld.content, true)
            /* 4. INJECT */
            clone.querySelector(".name").textContent = "Paul";
            clone.querySelector(".number-of-copies").textContent = ++numberOfCopies
            /* 5. APPEND */
            document.body.appendChild(clone)
        }
    </script>
</body> 

</html>
```