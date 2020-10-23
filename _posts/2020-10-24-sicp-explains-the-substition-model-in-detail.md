---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the contemplation over the substition model as explained in SICP

<!-- TOC -->

- [1. aim: method for mapping procedures to processes](#1-aim-method-for-mapping-procedures-to-processes)
- [2. the substition rule](#2-the-substition-rule)
- [3. illustration: reduction step](#3-illustration-reduction-step)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. aim: method for mapping procedures to processes
* how do procedures map to the way the process behaves

>Though this model gets us very far, it only works for 'pure' functions. The SICP text always uses the term 'procedure' for clarity to avoid confusing them with mathematical functions. I have referred to things created with fn as functions here as the usage is pretty common, I will refer to pure functions if they have this property.

* this is the simplest model to create processes from procedures

### 2. the substition rule
>  And I warn you that this is not a perfect description of what the computer does. 
> But it's a good enough description for the problems that we're going to have
> you should think about this religiously. 

* this is a very simple rule
* To evaluate an application
    1. evaluate the **OPERATOR**    → get → **PROCEDURE** (add, substract, divide, multiply, etc.)
    2. evaluate the **OPERANDS**    → get → **ARGUMENTS** (operands === formal parameters) ➔ **before you do the operation**
    3. apply the **PROCEDURE**      → to the → **ARGUMENTS**
* Copy the body of the procedure → **SUBSTITUTE HAPPENS HERE** the arguments supplied for the formal parameters of the procedure
* Evaluate the resulting new body

### 3. illustration: reduction step
* i run this with powershell instead of with clojure / lisp
* sum of squares 3 and 4
* substitution 3 with y and 4 with x
* if call

```powershell
function square ($num) { $num * $num }
function sos ($a, $b) {square($a) + square($b)}
```
* this is the demo of the process

```powershell
sos 2 3
square 2 + square 3 # reduction step
4 + square 3        # substitio 1
4 + 9               # substitio 2
13                  # result
```

### 4. sources
* [1B: Procedures and Processes; Substitution Model | Video Lectures | Structure and Interpretation of Computer Programs | Electrical Engineering and Computer Science | MIT OpenCourseWare](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/video-lectures/1b-procedures-and-processes-substitution-model/)
