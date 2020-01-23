---
layout: post
title: JS > for-in loop
---
## the case	
the question is the basic syntax and use of **the for-in loop** when working with JS objects

## findings
* for loop is great to iterate through items of array with their org principle (ordered list, you can do incremental counting to list through them --> this is 'exhaustive enumeration' )
* there is a dedicated loop for objects: for in loop
	* it iterates through each key in object
* **dot notation does not work in for in loop**
	* because it is not a literal name of a property
	* it is an identifier for a set of all keys inside your object

![for-in-loop]({{ site.url }}/assets/2020-01-22-for-in-loop.png)