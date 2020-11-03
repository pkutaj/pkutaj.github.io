---
layout: post
title:
categories: []
---
## usecase
The concern is documenting terminology surrounding **if statements**

> it's important to get names for the part of things and expressions. one of the things that every sorcerer tell you that if you name of the spirit, you have power over it

— [SICP lecture 1B: Procedures and Processes; Substitution Model](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/video-lectures/1b-procedures-and-processes-substitution-model/)

<!-- TOC -->

- [1. predicate expression](#1-predicate-expression)
- [2. logical value](#2-logical-value)
- [example: powershell](#example-powershell)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. predicate expression
* To evaluate an IF expression:
    1. Evaluate the **predicate expression**
    2. If it yields `true` 
        * evaluate te **consequent expressions**
    3. Otherwise
        * evaluate the **alterative expression**

* a predicate is a linguistic (syntactical) concept and is, is the imperative/dynamic primitive of each proposition/sentence (subject being the declarative/categorical primitive)

### 2. logical value
* predicate expression contains a logical/truth value
    * true
    * false
* to bring this further, each language also assigns logical values to most of expressions that do not carry the direct logical value 
* this is **truthy** and **falsy**

### example: powershell 

* let's see truthy and falsy in powershell

```powershell
# CHROME runs, EDGE does not
▶ if(gps edge) {write-hose "truthy"} else {write-host "falsy"}
Get-Process: Cannot find a process with the name "edge". 
falsy

▶ if(gps chrome) {write-host "truthy"} else {write-host "falsy"}
truthy
```
* the expression `Get-Process edge` is a **predicate expression** but it is not straightforward `false`
* ...because that is a command, not an strict test

### 3. sources
* [Boolean Values and Operators — PowerShell](https://devblogs.microsoft.com/powershell/boolean-values-and-operators/)
* [Truthy - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)