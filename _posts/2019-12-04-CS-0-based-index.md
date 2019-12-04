---
layout: post
title: CS > 0-based indexing
last_modified_at: 
---

## toc
<!-- TOC -->

- [On 0-indexing](#on-0-indexing)

<!-- /TOC -->


### On 0-indexing
* Array indices should start at 0. This is not just an efficiency hack for ancient computers, or a reflection of the underlying memory model, or some other kind of historical accident—forget all of that. Zero-based indexing actually simplifies array-related math for the programmer, and simpler math leads to fewer bugs.

---
>...most programming languages are what's called "zero-indexed", meaning they start counting from 0. To understand the reason why, consider the following array filled with empty arrays:
>var arr = [ [], [] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ];
>If you haven't seen nested arrays yet, just know you can put anything in an array - even other arrays! Here I'm just using them to show empty slots.Suppose I want to put the value 3 in the 4th "box":
>var arr = [ [], [] ,[] ,[3] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ,[] ];
>So far so good, but now i want to use it for something, so I ask the computer to find for me the array holding my 3. How does the computer find it? This array is stored in memory, and the variable name "arr" points to where it starts, so the computer first goes to the start of the array, and doesn't find anything there, so then it goes to the next element, and the next, then one more element and finds it. It had to take 3 steps forwards from the start to get to the 4th element in the array. ...Nowadays higher level languages like javascript could hide this from us - it'd be very trivial to make it more "human friendly", but two things - firstly that you actually get used to zero-indexed very fast, so you expect other languages to use it; and secondly it's more accurate to how the computer is running.
---

## sources
* [Why do array indexes start with 0 (zero) in many programming languages? - Quora](https://www.quora.com/Why-do-array-indexes-start-with-0-zero-in-many-programming-languages)