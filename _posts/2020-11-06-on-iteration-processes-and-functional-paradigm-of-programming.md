---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the part of the SICP [1B: Procedures and Processes; Substitution Model](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/video-lectures/1b-procedures-and-processes-substitution-model/) delving into the essence of iterative processes, enriched with the [uncle bob's take on functional programming](https://youtu.be/ya1xDCCMh7g?t=4808)

<!-- TOC -->

- [1. CODE](#1-code)
- [2. the dimensions of shape: time and space](#2-the-dimensions-of-shape-time-and-space)
- [3. state within iteration](#3-state-within-iteration)
- [4. functional paradigm](#4-functional-paradigm)

<!-- /TOC -->

### 1. CODE
* this is done with powershell instead of clojure
* it is a procedure to print the sum of two integers

```powershell
# definition
function addIteratively ($x, $y) {
    for ($x -lt 1; $x--) {
        $y++
    }
    return Write-Host $y
}

# call
addIteratively 3 4
7
```

### 2. the dimensions of shape: time and space
* the function procedure above translates into the process using the substition model

```
3 4 |
2 5 | time dimension of the process
1 6 |
0 7 V
----> space dimension of the process
```

* both time and space dimensions have their **COMPLEXITY**
* the time complexity of an iterative is proportional to the input argument `x` in some proportionality
* this is expressed as `time = O(x)`
* the space complexity is constant, the memory the machine needs in each moment is the same
* this is expressed as `space = O(1)`

### 3. state within iteration
* all of the state of this process is in its explicit variables
* you can see this in debugger — there is nothing hidden

### 4. functional paradigm
* note the **FUNCTIONAL PARADIGM** of programming is in immutability achieved by the **ABSENCE OF VARIABLE ASSIGNMENT**
* to assign bindings  is something you usually `begin` function definiton
* something I have treated like the definition of your characters within the play; could not think of a drama without them
* the only characters allowed here are inputs and you transform them and return them transformed

```powershell
function addIteratively ($x, $y) {
    for ($x -lt 1; $x--) {
        $y++
    }
    return Write-Host $y
}
```
