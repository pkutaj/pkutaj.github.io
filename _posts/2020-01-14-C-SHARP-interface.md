---
layout: post
title: C# > Interfaces (OOP essentials)
---
## the case
the question is: interfaces in OOP

## toc
<!-- TOC -->

- [interface vs class definition](#interface-vs-class-definition)
- [interface as a part of the encapsulation unit](#interface-as-a-part-of-the-encapsulation-unit)
- [syntax: intefrace definition](#syntax-intefrace-definition)
    - [STEP-1 define empty interface in the respective class](#step-1-define-empty-interface-in-the-respective-class)
    - [STEP-2 colonize with members](#step-2-colonize-with-members)
    - [STEP-3 implement into a class definition](#step-3-implement-into-a-class-definition)
        - [STEP-3.1 interface implemented into an abstract class](#step-31-interface-implemented-into-an-abstract-class)
            - [virtual keyword](#virtual-keyword)
    - [STEP-4 implement into a method signature](#step-4-implement-into-a-method-signature)

<!-- /TOC -->

## findings
* interface is a type
* interface is another way to achieve encapsulation and polymorphism and abstraction

### interface vs class definition
* it's a **"plug/wrap"** signalling what a **class** can do 
* it is a **pure definition** — it only lists members available on a specific type
    * ➔ there are **no implementation details** (there are exceptions to this)
* even abstract classes can casually contain actual methods and code
* interfaces are more important than abstract classes because they are far more common

### interface as a part of the encapsulation unit

![encapsulation_unit]({{ site.url }}/assets/2020-01-13-1.png)

* boundaries of software modules exist at 2 levels
    1. class_level
        * public interface makes members with public visibility accessible externally
    2. method_level 
        * within the class is also an unit by itself, allowing code_blocks and scopes available only from within the method itself. Method is a small action within the larger object (class instance)
* encapsulation units (class_level and method_level) are ascending and descending, are being created and destroyed, during the runtime 

### syntax: intefrace definition
* `interface` keyword
* name begins with an uppercase **"I"**
    * the name of an interface with an uppercase **I** such as `IBook` 

#### STEP-1 define empty interface in the respective class

CODE           | COMMENT
---------------|--------------------------------------------------------
1. `public`    | interfaces are public **by definition** (const)
2. `interface` | the interface keyword defines an interface type (const)
3. `IBook`     | in .NET, interfaces usually begin with an **I**

```c#
public interface IBook {    //1.–3. 

}
```

#### STEP-2 colonize with members
* add all members you want to make accessible by the interface
* there are **no access modifiers** when listing the members ➔ the assumption is that you have all members available in the class where an interface is being defined

CODE                             | COMMENT
---------------------------------|---------------------------------
1. `void AddGrade(double grade)` | note no access modifier (public)
2. `string Name {get;}`          | make getter accessible

```c#
    public interface IBook
    {
        void AddGrade(double grade);            //1.
        Stats GetStats();
        string Name { get; }                    //2. 
        event GradeAddedDelegate GradeAdded;
    }
```

#### STEP-3 implement into a class definition
* find the class that implements the interface and add interface in the list of its relatives (inheritances)
* c# is single-inheritance, multiple interface-implementation
* the interface that was implemented for the particular class needs to be added to it's definition

![interface_specification]({{ site.url }}/assets/2020-01-13-IBook-implementation.gif)

CODE                                         | COMMENT
---------------------------------------------|--------------------------------------------------------------
1. `public class InMemoryBook : Book, IBook` | specify `IBook` as an in interface that class is implementing

##### STEP-3.1 interface implemented into an abstract class
* if all children of an abstact class should inherit an interface, the abstract class has to contain all of the interface members
* the implementation of interface members can be abstract
* every `abstract` member within the abstract class needs a **corresponding** `override` when implemented

![interface_into_abstract_classe]({{ site.url }}/assets/2020-01-14-interface-into-abstract-class.gif)

###### virtual keyword
* if implementing an interface in an abstract class and not using abstract implementation, use virtual keyword
    * 1 in an abstract class
    * 1 in the class proper
* the `virtual` keyword gives a permission for a corresponding `override`

#### STEP-4 implement into a method signature
* instead of the particular class name inside a method signature, use the interface type
* this is the beauty of an intefrace
* interface can express exactly what you require in particular bits of code
* example for implementing interface for a method
    * **you don't care** about the ultimate type
    * **you don't care** how other methods behave
    * you care that members listed in the interface are available for that object 
* the parameter type can refer to any class that implements that interface

CODE                                                      | COMMENT
----------------------------------------------------------|---------------------------------------------------
1. `private static void EnterGrades(IBook bookParameter)` | require object that implements the IBook interface

```c#
 static void Main(string[] args)                                    //main program begins
        {
            Console.WriteLine("Enter a name for your Gradebook");   //announcement: give input
            var bookName = Console.ReadLine();                      //binding the input
            InMemoryBook book = new InMemoryBook(bookName);         //instantiate PARTICULAR type/class of Book - that implements an interface (STEP-3)!
            Console.WriteLine(book.Name);                           //announcement 
            book.GradeAdded += OnGradeAdded;                        //event listener
            EnterGrades(book);                                      //method call with the argument that is an object of type InMemoryBook

            //...the rest of execution
        }

        private static void EnterGrades(IBook bookParameter)        //method definition signed with ANY type of Book — that implements the interface !

```