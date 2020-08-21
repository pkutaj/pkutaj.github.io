---
layout: post
title: CS > SICP > higher order procedures
categories: [programming]
---

## TOC
<!-- TOC -->

- [1. complexity](#1-complexity)
    - [1.1. aim: obvious](#11-aim-obvious)
- [2. dry](#2-dry)
- [3. learning languages](#3-learning-languages)
- [4. lambda](#4-lambda)
- [example](#example)

<!-- /TOC -->

### 1. complexity

> if I know an easy case that I know the answer to, just write it down.
> otherwise, I'll reduce this problem to a simpler problem
> in this case, I'll make a subproblem

#### 1.1. aim: obvious
* it should be clear from the look at the method what its purpose is
    * look and see principle
* obvious is the way
* breaking down the problem into components
* write it down with necessary parameters so that is still readable
* worry about lambdas later
* `FIXED POINT` in the screenshot below is a function expression being called from within the method

![worry-about-lambas-later](img/img000187.png)

### 2. dry
* **RULE**: when you see yourself writing something more than once, there is something wrong with it. 
* the reason **IS NOT** that it's waste of time writing something more than once.

```text
  you have to come up with
    → AN ABSTRACTION ←
  to cover identical occurences
```

### 3. learning languages
1. syntax
2. idioms
    * aka common patterns of usage
    * aka design patterns
    * most of the time when learning a language you learn **idioms**
    * very common in German classes (Redewengunden)

### 4. lambda
* Procedure that is producing procedure as its value
* Not only taking function as a parameter
* But also returning a function ???

```lisp
(DEFINE AVERAGE-DAMP
    (λ(f)
        (λ(X) AVERAGE(f x) X))))
```

### example
* a function that sums the range of integers between a and b
* e.g. when 1 5 is passed → 1 + 2 + 3 + 4 + 5 = 15
* base case: if a > b return 0
* recurrent relation: 
    (sum-int a b) = (+ a (sum-int a+1 b)
    (sum-int 1 5) = (+ 1 (sum-int 2 5))

```clojure
(defn sum-integers [a b]
    "compute the sum of the integers from a through b"
    (if (> a b)
        0
        (+ a (sum-integers (inc a) b))
        )
```

```
sum(1 5)
1 + sum(2 5)
1 + (2 + sum(3 5))
1 + (2 + (3 + sum (4 5)))
1 + (2 + (3 + (4 + sum (5 5))))
1 + (2 + (3 + (4 + (5 + sum (6 5)))))
1 + (2 + (3 + (4 + (5 + 0))))
1 + (2 + (3 + (4 + 5)))
1 + (2 + (3 + 9))
1 + (2 + 12)
1 + 14
15
```
* you can do the same with the cube — clojure has a built in math operations
