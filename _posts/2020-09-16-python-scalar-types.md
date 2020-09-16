---
layout: post
title: python > on scalar types in general, and 4 scalars of python
categories: [python]
---
## abstract
The concern is documenting the meaning and personal appropriation (wrapping my head around) the term "scalar" encountered in an intro course for Python.

## contents
<!-- TOC -->

- [1. On scalars](#1-on-scalars)
    - [1.1. define](#11-define)
    - [1.2. compare](#12-compare)
    - [1.3. find-origins](#13-find-origins)
- [2. the illustration of python scalars: int, float, none, bool](#2-the-illustration-of-python-scalars-int-float-none-bool)
    - [2.1. init](#21-init)
    - [2.2. float](#22-float)
    - [2.3. None](#23-none)
    - [2.4. Bool](#24-bool)
- [3. sources](#3-sources)

<!-- /TOC -->
### 1. On scalars

#### 1.1. define
> The term "scalar" comes from linear algebra, where it is used to differentiate a single number from a VECTOR or MATRIX. 
> The meaning in computing is similar. 
> It distinguishes a single value like an integer or float from a data structure like an array. 
> This distinction is very prominent in Perl
> In Perl, the $ sigil (which resembles an 's') is used to denote a scalar variable — while @ sigil (which resembles an 'a') denotes an array
> It doesn't have anything to do with the type of the element itself. 
> It could be a number, character, string, or object
> What matters to be called a scalar is that there is ONE OF THEM.

— From <https://softwareengineering.stackexchange.com/questions/238033/what-does-it-mean-when-data-is-scalar> 

#### 1.2. compare
* in Javascript, scalar types - types that only scale — are called primitives; and the opposite is called objects
* in Perl, you have the opposite of scalars `$` and arrays `@`
* in Python the opposite of a scalar is not an array, nor a vector, but a collection
* in SQL, a scalar value is 1-value result & a scalar subquery expression is a subquery that returns exactly oe column value from one row 

#### 1.3. find-origins
* etymologically it seems to came from "scala" — a ladder in latin and the first usage in English as per Wiki is

> came with W. R. Hamilton in 1846, referring to the real part of a quaternion:
> "The algebraically real part may receive, according to the question in which it occurs, all values contained on the one scale of progression of numbers from negative to positive infinity; we shall call it therefore the scalar part."

* to me than scalar means the constraint of modification for this type — it only _"scales"_ and each binding is _immutable_; you can't modify one of its parts

### 2. the illustration of python scalars: int, float, none, bool
#### 2.1. init
* unlimited precision signed int
* in REPL, can be 
    * decimal
    * binary with `0b` prefix
    * octal with `0o` prefix
    * hex with `0x` prefix
* rounding is always towards 0

```python
>>> int(-3.5)
-3
>>> int(3.5)
3
>>>   
```

* the int constructor also converts strings to ints

```python
>>> int("365")
365
``` 

#### 2.2. float
* implemented as IEEE-754 double-precision with 53-bits of binary precision
* between 15-16 significant digits 
* decimal point defines float
* scientific notation can be used

```python
>>> 3e8
300000000.0
```

* use float constructor to cast into float
* every calculation between float and an int is promoted to a float

#### 2.3. None

![noRepl_and_bindable]({{ site.url }}/assets/img001528.png)

#### 2.4. Bool
* True
* False
* Bool constructor for casting truthy and falsy values into a bool

### 3. sources
* [Scalar (mathematics) - Wikipedia](https://en.wikipedia.org/wiki/Scalar_(mathematics))
