---
layout: post
title:  C# > reference types vs value types (draft)
last_modified_at: 2019-11-20
---

## the case	
the question is the difference between reference types and value types and how to prove the correct behavior of types

## toc

<!-- TOC -->

- [reference types and value types](#reference-types-and-value-types)
- [type test](#type-test)
- [test: can 2 different vars refer the same object ?](#test-can-2-different-vars-refer-the-same-object-)
- [test: prove you can change the name of a book](#test-prove-you-can-change-the-name-of-a-book)
- [passing parameters by reference](#passing-parameters-by-reference)
- [working with data types](#working-with-data-types)
- [question: differenciation between value and reference types](#question-differenciation-between-value-and-reference-types)

<!-- /TOC -->

## findings

### reference types and value types
* the concept is general, in javascript this is the difference between primivites and objects
* [the difference between reference and value types best explained in this post](https://stackoverflow.com/a/13268731)

### type test
* create a new file / new class for type tests
    * aim: instantiate the book object in various ways
* create a binding that invokes a method accepting a name of the object
* this private method (no keyword needed, private is default) constructs the object
* no fact attribute on that method

![type-tests-method-creation]({{ site.url }}/assets/2019-11-14-typetests.gif)

* return type object is default on a new method
    * this is lowest based type in .NET

```c#
  Book GetBook(string name) //private keyword skipped; return type Book
        {
            return new Book(name);
        }
```

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
    * the above test could be re-written as 

```C#
`Assert.True(Object.ReferenceEquals(book1, book2));` 
```

### test: prove you can change the name of a book
* proving that it is possible to change the name from the reference
* **note:** in languages, there are _types of passing a parameters into a method_ called also a) by reference; b) by value; in **c# a parameter itself is always passed by value**

```c#
      public void CanSetNameFromReference()
        {
            var book1 = GetBook("Book 1"); //1. instantiate an object
            SetName(book1, "New Name"); //2. copy the value inside of book 1

            Assert.Equal("New Name", book1.Name); //prove that that reference has change its field

        }

        private void SetName(Book book, string name) //3. paste the value of book 1 into the first parameter
        {
            book.Name = name;
        }

```

* the value that is passed is a pointer to a memory location (an address, a reference to a book object)
* you don't get to the pointer value even in a debugger, there is a barrier and practice considered to be unsafe
    * see [Creating a pointer type in C#](https://www.codeproject.com/Articles/1254502/Creating-a-pointer-type-in-Csharp)
* IF this runtime would pass parameters by reference, the book parameter in `SetName` method would not receive a pointer value, but a reference to the variable book1 ➔ there would be 2 references
    * reference of the parameter to book 1
    * reference within book 1 to the object
    * in this scenario it's possible to **make changes to the book1 binding itself from the other method** 
    * you cannot change that binding in pass by value scenario, ever

### passing parameters by reference
* the following method does not change the name of the book1
* the parameter `book1` passed into the `GetBookSetName` is different than the location it is pointing to

```c#
   [Fact]
        public void CSharpIsPassByValue()
        {
            var book1 = GetBook("Book 1"); // initialize as Book 1
            GetBookSetName(book1, "New Name"); // try to rename to New Name

            Assert.Equal("New Name", book1.Name); // validate success ➔ failure

        }
        private void GetBookSetName(Book book, string name) // value of reference is passed here (pointer to book1)
        {
            book = new Book(name);
            book.Name = name;
        }

          Book GetBook(string name)
        {
            return new Book(name);
        }
```

> and that's exactly what the designers of the c# language wanted. when you pass a variable to another method, you don't want that method to unexpectedly change the value or the reference that is inside of your variable. that would be an unexpected side effect

* **how to rename then?**
    * force to pass the parameter by reference instead of by value ➔ force to pass the whole object into the method and work on that 
    * use the **ref**

```c#
[Fact]
        public void CSharpCanPassByRef()
        {
            var book1 = GetBook("Book 1"); //init as Book 1
            GetBookSetName(ref book1, "New Name"); //rename by passing by reference the whole object, and the strng

            Assert.Equal("New Name", book1.Name);

        }
        
        private void GetBookSetName(ref Book book, string name) //accept by reference
        {
            book = new Book(name); //basically overwrite that is passed by ref / reconstruct with new name
        }
        
        Book GetBook(string name)
        {
            return new Book(name);
        }
```

* **ref** overwrites, reconstructs, allows to work on the existing object within the method where it's passed

![pass-by-ref]({{ site.url }}/assets/2019-11-19-pass-by-ref.gif)

* not much used (some APIs)
* there is also **out** keyword
    * difference: compiler assumes the binding has not been initialized

### working with data types
* the following **fails**

```c#
[Fact]
        public void Test1()
        {
            int test_binding = GetInt(); // 1. test_binding == 3
            SetInt(test_binding); // 2. pass value 3 into the setter

            Assert.Equal(42, test_binding); // 5. the test, perhaps as suprise, FAILS
        }

        private void SetInt(int test_parameter) // 3. assign the value 3 to test_parameter
        {
            test_parameter = 42; // 4. overwrite the memory location of test_parameter with the value of 43 ➔ NO CHANGE TO THE VALUE OF test_binding
        }

        private int GetInt()
        {
            return 3;
        }

```

* in order to **pass** the compiler has to be instructed to pass by reference explicitly with the **ref** keyword

```c#
    [Fact]
        public void TestDataTypes()
        {
            int test_binding = GetInt(); // 1. test_binding == 3
            SetInt(ref test_binding); // 2. pass the reference to the test_binding into the method

            Assert.Equal(42, test_binding); // 5. the test PASSES
        }

        private void SetInt(ref int test_parameter) // 3. accept only references to memory locations and not values ➔ assign the pointer to test_parameter
        {
            test_parameter = 42; // 4. the value of the reference (test_binding itself) will change to 42
        }

        private int GetInt()
        {
            return 3;
        }
```

### question: differenciation between value and reference types
* if working with any type defined **within a class** ➔ r e f e r e n c e t y p e 

```c#
public class foo {
    
    // all bindings created here are references
}

```

* working with classes is the bread and butter of day to day workk
* to work with a data type, use **struct**
    * needs to behave like a value type
    * typically very small
    * struct is an abbreviation of structure, data structure that is
    * just grouping a number of fields as opposed to class with methods
* this can be much more efficient for certain scenarios, but this has to be understood properly

```c#
public struct foo {

    // bindings created here are values
}
```
 

## terminology
* Assert
    * Assert.Equals()
    * Assert.Same()
    * Assert.True()
* managed language
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