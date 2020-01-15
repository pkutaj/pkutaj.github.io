---
layout: post
title: C# > new class is needed
---
## the case	
the question is, what is the process for the creation of a new class. Another one, among many. Not first, not last. 

## toc
<!-- TOC -->

- [STEP-1 new file](#step-1-new-file)
- [STEP-2 usings & namespace](#step-2-usings--namespace)
- [STEP-3 name : parent, interfaces](#step-3-name--parent-interfaces)
- [STEP-4 constructor](#step-4-constructor)
- [STEP-5 list members of abstract class](#step-5-list-members-of-abstract-class)
- [STEP-6 write implementations](#step-6-write-implementations)

<!-- /TOC -->

## findings
### STEP-1 new file
* create a new file with the class matching name (pascal case)
* here: `DiskBook.cs`

### STEP-2 usings & namespace
* create a "shell" for the class with using directive and namespace
* define where does it belongs (namespace) and what it uses externally (using)
1. `using directive` allows the use of types within the namespace so it's not necessary to qualify the use of the type in that namespace
2. `namespace` keyword declares the scope containing a set of related object, which is the whole program in this case

```c#
using System;                       //1.
using System.Collections.Generic;   //1.

namespace GradeBook                 //2. 
{


}
```

### STEP-3 name : parent, interfaces
* self-explanatory
* again, single-inheritance, multiple-interfaces rule

CODE          | COMMENT
--------------|---------------------------------------------------------------
1. `public`   | access modifier
2. `class`    | `class` keyword declaring the class definition
3. `DiskBook` | class name
4. `:`        | operator defining that what follows are parents and interfaces
5. `Book`     | parent-class

```c#
    public class DiskBook : Book //1.-5.
```

### STEP-4 constructor
* define an explicit constructor
* taking complete control over the instantiation of an object
* explicit constructor actually appears in the class
* the explicit constructor runs before everything else.
* constructor has a class-matching name
* constructor is a method that has no return type
* `:base` keyword passes the given parameter to the constructor within the base class

CODE               | COMMENT
-------------------|-----------------------------------------------------
1. `public`        | access modifier
2. `DiskBook`      | class-matching constructor name
3. `(string name)` | parameter type
4. `:`             | inheritance operator
5. `base(name)`    | parameter implementation handled by the parent-class

```c#
   public class DiskBook : Book
    {   
        //1.-5. in the line below
        public DiskBook(string name) : base(name)   
        {
        }
    }
```

### STEP-5 list members of abstract class
* call abstract classes - list and override
* all mehods and properties from the parent (abstract) class needs an implementation here
* note the `override` keyword signalling that the abstract members in the parent class (that are just listed as requited members that children need to define) are indeed implemented here
* can be be automatized in VSCode

![2020-01-15-abstract-class-implementation]({{ site.url }}/assets/2020-01-15-abstract-class-implementation.gif)

### STEP-6 write implementations
* implement abstract classes one by one - the actual meat of the class
* here comes the actual implementation details, for example the attempt to call an `File.AppendText()` from the `System.IO` namespace

```c#
   public override void AddGrade(double grade)
        {
            var writer = File.AppendText($"{Name}.txt")
            writer.WriteLine(grade); 

        };
```
* ... but this is a different story, the shell of the class is ready

## sources
* [using directive - C# Reference | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-directive)