---
layout: post
title:  C# > reference types vs value types (draft)
last_modified_at: 2019-11-15
---

## the case	
the question is the difference between reference types and value types and how to prove the correct behavior of types

## toc

<!-- TOC -->

- [reference types and value types](#reference-types-and-value-types)
    - [example](#example)
- [type test](#type-test)
- [test: can 2 different vars refer the same object ?](#test-can-2-different-vars-refer-the-same-object-)

<!-- /TOC -->

## findings

### reference types and value types
* the concept is general, in javascript this is the difference between primivites and objects
* [the difference between reference and value types best explained in this post](https://stackoverflow.com/a/13268731)


#### example
```c#
 public stats GetStats()
        {
            stats result = new stats();             //new referenced-type binding
            result.averageGrade = 0.0;              // init to 0 
            result.highGrade = double.MinValue;     // init to MAX
            result.lowGrade = double.MaxValue;      // init to MIN
            foreach (var grade in grades)           // do the work
            {
                result.highGrade = Math.Max(grade, result.highGrade);
                result.lowGrade = Math.Min(grade, result.lowGrade);
                result.averageGrade += grade;
            };
            result.averageGrade = result.averageGrade / grades.Count;
            return result; // return stats to the caller
        }
```

### type test
* create a new file / new class for type tests
* create a binding that invokes a method accepting a name of the object
* this private method (no keyword needed, private is default) constructs the object
* no fact attribute on that method

![type-tests-method-creation]({{ site.url }}/assets/2019-11-14-typetests.gif)

* return type object is default on a new method
    * this is lowest based type in .NET ➔ we want a book

### test: can 2 different vars refer the same object ?
* Use `Assert.Same()`

```c#
   [Fact]
        public void TwoVarsReferSameObject()
        {
            var book1 = GetBook("Book 1");
            var book2 = book1;
            Assert.Same(book1, book2); //prove identity of the pointers for bindings
        }
```
* `Assert.Same()` in xunit is an abstraction of the .NET `Object.ReferenceEquals()`
    * everything in .NET derives from the `object` base class
    * the above test could be re-written as `Assert.True(Object.ReferenceEquals(book1, book2));` 

### test: prove you can change the name of a book
> under construction

{% details CODE %}
```c#
```
{% enddetails %}


## terminology
* Assert
    * Assert.Equals()
    * Assert.Same()
    * Assert.True()
* memory location 
    * memory cells
* object base class    
* type
    * reference type
    * value type
* type tests

## sources
* [JS primitives VS objects](https://stackoverflow.com/a/13268731)
* [C# Coding Standards and Naming Conventions](https://github.com/ktaranov/naming-convention/blob/master/C%23%20Coding%20Standards%20and%20Naming%20Conventions.md#c-coding-standards-and-naming-conventions)