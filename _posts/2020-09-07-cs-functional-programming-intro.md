---
layout: post
title: cs > meet functional programming
categories: [cs]
---
## usecase
The concern is documenting the most basic concept of functional programming used as a tissue for learning clojure. Here, three points are explained

1. FP as **PARADIGM**
2. FP approaching computing as (Math) Function **EVALUATION**
3. FP strategy in the **AVOIDANCE/CAREFULLNES OF STATE CHANGE** by the minimalism of data structures

<!-- TOC -->

- [1. Paradigm](#1-paradigm)
- [2. Computation as evaluation of Math functinos](#2-computation-as-evaluation-of-math-functinos)
    - [2.1. Diff to OOP & impure functions](#21-diff-to-oop--impure-functions)
- [3. State/Data changing](#3-statedata-changing)
    - [3.1. OOP example](#31-oop-example)
    - [3.2. FP example](#32-fp-example)
- [4. OOP vs FP in general](#4-oop-vs-fp-in-general)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. Paradigm
* programming paragadigm
    * next to OOP (C#/Java)
    * next to structural/procedural (C)
    * not language-specific (Java and C# incorporates functionoal, too)

### 2. Computation as evaluation of Math functinos
* computation is evaluation of **MATHEMATICAL FUNCTION**
* in math (🠋) functions output  is **ALWAYS/CERTAINLY** mapped **1:1** to input

![graph_matching_one_to_one]({{ site.url }}/assets/img001701.png)

* these are **PURE FUNCTIONS** that 
    * do not cause side effects
    * will always return the same result for a given input

#### 2.1. Diff to OOP & impure functions
* do your OOP-functions also **ALWAYS** return the same output given the same input
* ... not entirely
* the impure functions returns

```cpp
Math.random(); //0.03
Math.random(); //0.71
```

* you know the **IMPURE** function by passing no arguments
* other paradigms have pure functions, of course, but not only

```cpp
Math.sqt(81); //9
Math.sqt(81); //9
```

### 3. State/Data changing
* procedures **AVOID** state-changes
* procedures **AVOID** mutable data

#### 3.1. OOP example
* OOP example

```c#
shoppingCart.AddBook('You Are What You Love');
shoppingCart.AddBook('Sabbath Theater');
shoppingCart.AddBook('Dying Animal');
shoppingCart.AddBook('Lullaby');
shoppingCart.GetTotal(); //$108.69

public float GetTotal()
{
    return Items.sum(i => i.price)
}
```

* `Items` is an array of all added items
* Any time AddBook was called an item was added
* `AddBook` function changes the state of the `shoppingCart` object
* You have 1 method that changes the state (`AddBook`)
* You have 1 method that performs the calculation on the changed state (`GetTotal`)

#### 3.2. FP example

```c#
updatedCart = add(shoppingCart, 'You Are What You Love');
updatedCart = add(shoppingCart, 'Sabbath Theater');
updatedCart = add(shoppingCart, 'Dying Animal');
updatedCart = add(shoppingCart, 'Lullaby');
price = getTotal(updatedCart)
```

### 4. OOP vs FP in general

> I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times

— Bruce Lee

> It is better to have 100 functions operate on 1 data structure than 10 functions operate on 10 data structures

— Alan Perlis

* What matters is **QUALITY**
* Functional programming has **FEWER DATA STRUCTURES**

1. list `[]`
2. map `{}`

* the combination allows achieving a lot
* contrast this with OOP → new classes for new functionality

OOP                                 | FP
------------------------------------|----------------------------------
more data structures                | fewer data structures
fewer functions per data structure  | more functions per data structure
10 functions per 10 data structures | 100 functions on 1 data structure

* **THE MAJOR DIFFERENCE IS HOW DATA IS PROCESSED**

### 5. sources
* [Functional Programming: The Big Picture ~ Pluralsight](https://app.pluralsight.com/library/courses/functional-programming-big-picture/table-of-contents)
