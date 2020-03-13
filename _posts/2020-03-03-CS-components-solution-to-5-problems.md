---
layout: post
title: JavaScript > Web Components as a solution to 5 problems
categories: [javascript]
---
## the case	of 5 problems, 1 solution
* the question is, what do web components address. also, the rule is **learn foundations/standards first** before abstractions. you are stuck if abstraction leaks

## toc
<!-- TOC -->

- [(1) markup: undescriptive](#1-markup-undescriptive)
- [(2) style: conflicting](#2-style-conflicting)
- [(3) native templates](#3-native-templates)
- [(4) bundling](#4-bundling)
- [(5) standards](#5-standards)

<!-- /TOC -->

## findings
* component size and complexity tends to grow as industries mature and industries grow by utilizing ever more powerfull abstractions
* we were using html, css and js initially
* then we started to use jQuery and extJS
* **reuse across manufacturers requires standard  p s**

### (1) markup: undescriptive
* markup is generic
* there are layers of `divs` usually
* they only say this element is a `block` nothing else
* we need more descriptive markup, not **div soups**
* the generic `div` conveys no meaning about what is inside

### (2) style: conflicting 
* there is a giant-centralized-style-sheet
* you run into style conflicts if there is no policies
* there is no way to encapsulate style for a given element
* we bloat css and markup up and use hacks like `!important` to force styles
* no guarantee that other styles won't conflict with ours

### (3) native templates
* html template solutions are clunky
* no inert HTML-import supported by design
* there are hacks
    * slap HTML in `<script type = "text/html>`
    * 3rd party libraries inventig their own script type without native DOM
    * store HTML and hidden DOM elements and manually extract the markup as necessary
        * styling struggles and hiding methods to hide markup from the view
    * iframes are utilized

### (4) bundling
* no way to bundle dependencies together into a single call
* if css, js and html used together, you need to refer dependencies in a proper logical order
* example: bootstrap: at least 5 references

![bootstrap_bundling]({{ site.url }}/assets/img000531.png)

* aim: request all of these items aas a names re-usale bundle on a single line

### (5) standards
* there seem to be no standard at the moment of making this course

![many_framework_no_standard]({{ site.url }}/assets/img000532.png)

* no standards for components with html, css and js
* many approaches for components, so to use more framework is a struggle
    * own API
    * propriatory approach
* changing vendors means learning
* components are utilizing highly specific stylesheet

![path_to_standard_components_1995_2020]({{ site.url }}/assets/img000534.png)