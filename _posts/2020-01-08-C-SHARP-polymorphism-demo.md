---
layout: post
title: C# > polymorphism demo (OOP essentials)
---
## the case	
the question is, how to demonstrate polymorphism as foundational pillar of OOP

## toc
<!-- TOC -->

- [abstract class](#abstract-class)
- [modifying the type hierarchy (insert a new base class)](#modifying-the-type-hierarchy-insert-a-new-base-class)

<!-- /TOC -->

## findings

### abstract class
* just like a regular class definition except for the `abstract` keyword
* the aim of the exercise is having **polymorphism**
* we create an **abstract base class** `BookBase`
* this is allowing its children to have **different implementations** of `AddGrade` method
    * anything derived from the abstract class should have a method `AddGrade`; the presence of this member is **required**
    * this method takes a `double` as a parameter type; the presence of this signature is also required
    * 1 child, however, may implement storing that grade in memory
    * another child  may save that grade in a file
    * another child, etc. etc. etc.
* next to the abstract base class, you also need to create a **corresponding abstract method** that allows polymorphic behavior
    * compiler is instructed that there is a required member (`AddGrade`) but at this level, there is **no implementation**

CODE                                             | COMMENT
-------------------------------------------------|-------------------------------------------------------------
1. `public abstract class BookBase`              | **abstract class** definition with via an `abstract` keyword
2. `public abstract void AddGrade(double grade)` | **abstract method** definition; one-liner; no implementation

```c# 
public abstract class BookBase                          //1. 
    {
        public abstract void AddGrade(double grade);    //2. 
    }
```

### modifying the type hierarchy (insert a new base class)
* until now, the `Book` class was a child from `NamedObject` class
* we need to insert `BookBase` class between them
    * the essential c# rule is **single-inheritance-only**, so the `Book` class cannot inherit from both the `BookBase` and the `NamedObject` class

CODE                                              | COMMENT
--------------------------------------------------|-----------------------------------------------------------------------
1. `public abstract class BookBase : NamedObject` | BookBase **is-a** NamedObject relationship, defined via the `:` symbol

* ➔ the error message that has appeared at `BookBase`

![error_message]({{ site.url }}/assets/img000390.png)

* fix by generating the constructor 

![generate_constructor]({{ site.url }}/assets/2020-01-08-generate-constructor-abstract-class.gif)

* ➔ the error message appeares at `Book` class

```
'Book' does not implement inherited abstract member 'BookBase.AddGrade(double)'
```

* fix by **overriding** whatever the base is providing by `override` keyword at the `AddGrade(double grade)` method

CODE                                             | COMMENT
-------------------------------------------------|----------------------------------------------------------------
1. `public override void AddGrade(double grade)` | `override` necessary to implement the abstract method inherited

```c#
public override void AddGrade(double grade) // 1. 
        {
            if (grade <= 100 && grade >= 0)
            {
                grades.Add(grade);
           /* ... 
            * implementation
            * ...
            */
        }
```

* by this **overriding**, the polymorph is born and polymorphism is achieved in c#
    * only abstract & virtual methods can be overriden