---
layout: post
title: programming > unit testing foundations
categories: [programming]
---
## the case	of the unit test
the question is, what is the definition and opposition of unit tests, where is it coming from and what is the structure

> From my own experience over many companies and teams over the years, most people who try to unit test their code either give up at some point or don’t actually perform unit tests. They waste a lot of time writing problematic tests and then give up when they have to waste a lot of time maintaining them or worse, not TRUSTING their results.

— [1 The basics of unit testing - The Art of Unit Testing, Third Edition MEAP V02](https://livebook.manning.com/book/the-art-of-unit-testing-third-edition/chapter-1/v-2/118)

> Think of the unit test suite as a parachute. How many holes do you want to have in your parachute? 

— Robert C. Martin

## toc
<!-- TOC -->

- [the origins: (1970s), KENT BECK, smalltalk](#the-origins-1970s-kent-beck-smalltalk)
- [what is a unit ?](#what-is-a-unit-)
- [definition](#definition)
- [attributes](#attributes)
- [exit point types](#exit-point-types)
    - [(1) direct-outputs: return values — query](#1-direct-outputs-return-values--query)
    - [(2) indirect-outputs: state change — command](#2-indirect-outputs-state-change--command)
    - [(3) indirect-output: callout](#3-indirect-output-callout)
- [difference: integration tests](#difference-integration-tests)
- [sources](#sources)

<!-- /TOC -->

## findings
### the origins: (1970s), KENT BECK, smalltalk
* in the 1970s, KENT BECK (TDD, Extreme Programming) created the idea of the **UNIT TEST** in Smalltalk

### what is a unit ?
* unit of **WORK** 🠊 system's **USE CASE** containing
    * **1 ENTRY POINT**
    * **1 or more EXIT POINTS**

![unit_of_work_with_entry_exit_points]({{ site.url }}/assets/img000820.png)

* it can be
    * single function
    * multiple functions
    * multiple modules

### definition
* A unit test is a piece of code that 
    1. invokes a unit of work 
    2. checks **ONE SPECIFIC EXIT POINT** as an end result of that unit of work. 
    3. If the assumptions on the end result turn out to be wrong, the unit test has failed. 

* A unit test’s scope can span as little as a function or as much as multiple modules or components depending on how many functions and modules are used between the entry point and the exit point.

### attributes
- [x] fast
- [x] consistent in results
- [x] you have **FULL CONTROL** of the code under test
- [x] isolated (other tests do not affect it)
- [x] runs in memory without any dependency (system files, network, dbs)
- [x] almost always written with a **UNIT TESTING FRAMEWORK**

* It should be fully isolated (runs independently of other tests).
* It should run in memory without requiring system files, networks, databases It should be as synchronous and linear as possible when it makes sense. (no parallel threads if we can help it)

### exit point types
#### (1) direct-outputs: return values — query
* return a useful value (not `undefined`)
* in OOP, this is `public, non-void` function
* 🠊 simplest unit tests

#### (2) indirect-outputs: state change — command
* **noticeable** state-change 
* 🠊 unit tests need more work

#### (3) indirect-output: callout
* test has no control over the callout
* example: calling a third-party logging system not written by me
* 🠊 most complicated testing

### difference: integration tests
* if the test uses the **REAL** network, the **REAL** rest APIs, **REAL** system time, the **REAL** filesystem, or a **REAL** database, it has stepped into the realm of **INTEGRATION TESTING**

### sources
* [1 The basics of unit testing - The Art of Unit Testing, Third Edition MEAP V02](https://livebook.manning.com/book/the-art-of-unit-testing-third-edition/chapter-1/v-2/118)