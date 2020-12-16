---
layout: post
title: SICP 01.03; 2 purposes of black box abstraction — suppress details, abstract methods 
categories: []
---

## usecase

the aim is grasping the portion of the first SICP lecture — the part illustrating techniques for managing complexity

<!-- TOC -->

- [1. black box abstraction](#1-black-box-abstraction)
    - [1.1. why? a) suppressing details](#11-why-a-suppressing-details)
    - [1.2. why? b) abstracting methodologies](#12-why-b-abstracting-methodologies)
        - [1.2.1. applied method example](#121-applied-method-example)
        - [1.2.2. general method example](#122-general-method-example)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. black box abstraction
* this is used in all kinds of engineering 
* take something and build a box around it to create a **module**
* the user does not have to **look inside**

![black_box]({{ site.url }}/assets/img002356.png)

* instead of implementation you just deal with an abstraction that
    * consumes input
    * produces output
* from the user's perspective, the **internals of the module are irrelevant**

#### 1.1. why? a) suppressing details 
* to suppress details → to reduce complexity → to enable the building of larger modules

#### 1.2. why? b) abstracting methodologies
* you want to say that your way of doing something — your how-to method — is an instance of an even more general thing 
* you then have
    * applied method
    * general method

##### 1.2.1. applied method example
* language-agnostic old-way of finding a square root of a number

![square_root_method]({{ site.url }}/assets/img002363.png)

* but this belongs to the **family of methods**
* ... it is an application of general strategy
* the question can also be: **what general strategies exist that can give me a particular procedure to solve my problem**
    * there can be more of these general methods

##### 1.2.2. general method example
* finding a square root by approximation and keeping improving the guess in a certain way is an example of finding a **fixed point of something**

![general_method_fixed_point]({{ site.url }}/assets/img002364.png)

### 2. sources
* [Black box - Wikipedia](https://en.wikipedia.org/wiki/Black_box)
