---
layout: post
title: C# > Inheritance Demo (OOP Foundations)
---
## the case	
the question is addressing the inheritance pillar, being one of the 4 foundations of OOP

## toc
<!-- TOC -->

- [inheritance](#inheritance)
    - [system object](#system-object)
    - [demo](#demo)
        - [STEP-1 create a base class (location: file-specific)](#step-1-create-a-base-class-location-file-specific)
        - [STEP-2 define a constructor within the base class (location: line-specific)](#step-2-define-a-constructor-within-the-base-class-location-line-specific)
        - [STEP-3 define an inheritance relationship](#step-3-define-an-inheritance-relationship)
        - [STEP-4 chain constructors](#step-4-chain-constructors)

<!-- /TOC -->

## findings

### inheritance
* often **overrated** in solving your day-to-day problem
    * or, definitely **looses against encapsulation**
* in practice, inheritance hierarchies tend to be shallow (no limit, though) as the code is difficult to follow with deep hierarchies
* ability to reuse code
* offers you to define a base class and derive class
* members of a base class can be members of the derived class
* aim: reuse code, follow **DRY principle** 

#### system object
* in .NET, every class has a base class even if not defined explicitly 
* there is no limit in how deep the hierarchy should go
    * in practice, deep hierarchies are hard to follow
* in .NET, every class derives from **Object** class from the **System** namespace 
    * everything has methods such as `ToString()` because this is contained in the `System.Object` class
    * friendly keyword for `System.Object` is `object` with a lowercase o
        * same as `double` as `System.Double` or `int` as `System.Int` 

#### demo 
* simple property name can be in a number of classes within the application of a gradebook (students, groups, teachers, etc.)

##### STEP-1 create a base class (location: file-specific)
* the base class should be located in it's own dedicated file
    * if all other classes are derived from this one, you never have to write the following piece of code agai
    * ... just set the name of an object (or pass it into a constructor)
    
```c#
// STEP-1 create a base class
    public class NamedObject
    {
        public string Name
        {
            get;
            set;
        }
    }
```

##### STEP-2 define a constructor within the base class (location: line-specific)

![base_class_constructor]({{ site.url }}/assets/2019-12-20-base-class-constructor.gif)

##### STEP-3 define an inheritance relationship
* so that you don't have to write the name property in the derived class
* in the example below, `Book` **becomes** a `NamedObject`, a much more abstract base class

CODE                              | COMMENT
----------------------------------|---------------------------------------------------------------
`public class Book : NamedObject` | use `: BaseClass` notation to define the inheritance
`Name = name;`                    | this line within a constructor utilizes the inherited property

```c#
// STEP-3 define an inheritance relationship
    public class Book : NamedObject // 1

    {
        public Book(string name)
        {
            grades = new List<double>();
            Name = name; // 2 
        }
// ...
```

##### STEP-4 chain constructors
* when you construct a `Book`, you construct a `NamedObject` with an inheritance relationship (`Book` IS a `NamedObject`), so a `Book` contains everything that `NamedObject` has
* this has to be reflected also in the **chained constructors** utilizing a keyword **base**
    * this keywords is accessing the constructor of the base class 
* the property referred to by the `base` in the constructor is not defined in the created object, but in it's base class
* with the property, there are also methods inherited, even though none of this in the derived class 

CODE                                    | COMMENT
----------------------------------------|------------------------------------------------------------------------------------
`public Book(string name) : base(name)` | `:base` keyword passes the given parameter to the constructor within the base class

```c#
 public class Book : NamedObject
    { 
        // STEP-5: Chaining constructors
        public Book(string name) : base(name)  
        {
        // STEP-5 END
            grades = new List<double>();
            Name = name;
        }
```