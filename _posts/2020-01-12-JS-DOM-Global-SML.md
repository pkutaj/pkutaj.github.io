---
layout: post
title: JS > global, SML, DOM 
---
## the case
the question is, how to conceptualize the global scope within JS / browser environment with the creation of the essential method of programming (SML, i.e. Select, Manipulate, Listen). And what is the role of Document Object Model ? 

## toc
<!-- TOC -->

- [global](#global)
- [SML](#sml)
- [DOM](#dom)
    - [DOM vs COM](#dom-vs-com)
- [sources](#sources)

<!-- /TOC -->

## findings
### global
* global vars are properties of a single global object call window
* there are functions and commands and method within a browser's global environment already

![global_environment_example]({{ site.url }}/assets/2020-01-12-1.png)

* `location.href` prints current URL in a console

![location.href]({{ site.url }}/assets/2020-01-12-2.png)

### SML 
* the common sequence is that you select & manipulate (or listen for action) — SML
* see the example below that **selects** the ID `myHeading` and **manipulates** its color to black

![manipulation_example]({{ site.url }}/assets/2020-01-12-3.png)

### DOM
* you select different part of the webpage by interacting with a **document**
* DOM is a map of a webpage that JS can use
* DOM is a tree data structure (hierarchy) and has a terminology connected with trees
    * root - document
    * branches - <body> <head>
    * leaves - deepest one
    * parents, siblings, childre
* in CS, trees are drawn like family trees - top-down

![DOM-tree]({{ site.url }}/assets/2020-01-12-4.png)

#### DOM vs COM
* The Document Object Model, despite its name, is not a competitor to the Component Object Model (COM). 
* COM is a **language independent way** to specify interfaces and objects
* DOM is a set of interfaces and objects designed for managing **HTML and XML documents**. 
    * You can implement DOM via COM (via language-independent systems, or via CORBA)
* For more, see [What is the Document Object Model?](https://www.w3.org/TR/WD-DOM/introduction.html)
 
### sources
* [A detailed look at global variables • Deep JavaScript](https://exploringjs.com/deep-js/ch_global-scope.html)
* [The Document Object Model (DOM)](https://flaviocopes.com/dom/)
* [Everything you need to know about tree data structures](https://www.freecodecamp.org/news/all-you-need-to-know-about-tree-data-structures-bceacb85490c/) 