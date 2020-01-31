---
layout: post
title: JS > DOM > SELECT element
---
## the case
* what if there are elements without an id

## toc
<!-- TOC -->

- [document.getElementsnuTagName() returns HTML collection](#documentgetelementsnutagname-returns-html-collection)
- [terminology](#terminology)

<!-- /TOC -->

## findings
* you keep using the `document` object and there for a selection from HTML you can select elements by
    * ID
    * CLASS
    * TAGNAME
* you'll get either an HTML element or HTML collection if > 1

###  document.getElementsnuTagName() returns HTML collection
* collection is like an array
* choose first by 

![2020-01-30-01.png]({{ site.url }}/assets/2020-01-30-01.png)

* or loop over the whole collection (like we do when working with JSONS) 

![2020-01-30-02.png]({{ site.url }}/assets/2020-01-30-02.png)


### terminology
* document.getElementsbyTagName()
* returns a collection
* style method