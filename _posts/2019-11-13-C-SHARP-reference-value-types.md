---
layout: post
title:  C# > reference types vs value types
last_modified_at: 2019-11-22
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
- [strings in c#: a special case; inconsistency tripping up the newcomers](#strings-in-c-a-special-case-inconsistency-tripping-up-the-newcomers)
    - [note: stack is an implementation detail](#note-stack-is-an-implementation-detail)
    - [javascript comparison](#javascript-comparison)
- [taking advantage of garbage collection2019-11-22](#taking-advantage-of-garbage-collection2019-11-22)

<!-- /TOC -->

## findings

### reference types and value types
* the concept is general, best explained in the [parable of the fridge](https://stackoverflow.com/a/13268731)

### type test
* create a new file / new class for type tests
* create a binding that invokes a method accepting a name of the object
    * this private method (no keyword needed, private is default) constructs the object
    * no fact attribute on that method

![type-tests-method-creation]({{ site.url }}/assets/2019-11-14-typetests.gif)

* return type `object` is default on a new method
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
            var book1 = GetBook("Book 1");                      //1. Pass the name "Book 1" into a getter that constructs
            GetBookSetName(ref book1, "New Name");              //4. Pass the reference to book 1 with new name into a getter that renames

            Assert.Equal("New Name", book1.Name);

        }
        
        private void GetBookSetName(ref Book book, string name)  //5. Accepts class references (not literals)
        {
            book = new Book(name);                               //6. Overwrites that is passed by ref / reconstruct with new name
        }
        
        Book GetBook(string name)                                //2. Assign the passed literal to the name parameter
        {
            return new Book(name);                               //3. Return constructed object with the passed-in literal
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
    * typically very small (int; float; DateTime)
    * struct is an abbreviation of structure, data structure that is
    * just grouping a number of fields as opposed to class with methods
* this can be much more efficient for certain scenarios, but this has to be understood properly

```c#
public struct foo {

    // bindings created here are values
}
```

* there are types within the .NET framework that are struct based
    * you need to be able to tell, because when invoking a method and passing along a parameter that is a reference type, it is possible to make changes to fields inside of that object if that is a reference type
* to make sure what type are you working with, press `f12` when on that type ➔ **metadata view of the type**
    * note: `int` is an alias for `Int32`; `double` for the actual `Double`; `DateTime` has no available aliases

![metadata-type-view-f12]({{ site.url }}/assets/2019-11-21-metadata-type.gif)

### strings in c#: a special case; inconsistency tripping up the newcomers
* strings in c# is always a reference type
* but it **often behaves like a value type**
* strings are reference types, but they are immutable. You cannot modify an existing string once created, only replace it
* the following test is a fail

```c#
   [Fact]
        public void StringsBehaveLikeValueTypes()
        {
            string name = "Pavol";          //1. assing "Pavol" to reference type string
            MakeUppercase(name);            //2. pass string into a method
            Assert.Equal("PAVOL", name);    //5. failed test
        }

        private void MakeUppercase(string parameterToUpper) //3. assign the value of the argument's reference to the parameter
        {
            parameterToUpper.ToUpper();                     //4. run the capitalization method on the parameter (no effect!)
        }
```

![debug-string-unit-test]({{ site.url }}/assets/2019-11-22-debug-string-test.gif)

* none of the methods you can perform on a string will manipulate the existing string. They all return a new string with desired attributes
* to make the test pass the following changes are necessary

```c#
       [Fact]
        public void StringsBehaveLikeValueTypes()
        {
            string name = "Pavol";
            string nameToUpper = MakeUppercase(name); // 1. bind the returned value to a new string binding
            Assert.Equal("PAVOL", nameToUpper);
        }

        private string MakeUppercase(string parameterToUpper) // 2. change the return type from void to string
        {
            return parameterToUpper.ToUpper(); // 3. return the capitalized copy of the parameter
        }
```

#### note: stack is an implementation detail
* from [The Stack Is An Implementation Detail, Part One – Fabulous Adventures In Coding](https://blogs.msdn.microsoft.com/ericlippert/2009/04/27/the-stack-is-an-implementation-detail-part-one/)

```plaintext
I find this characterization of a value type based on its implementation details rather than its observable characteristics to be both confusing and unfortunate. Surely the most relevant fact about value types is not the implementation detail of how they are allocated, but rather the by-design semantic meaning of “value type”, namely that they are always copied “by value”. If the relevant thing was their allocation details then we’d have called them “heap types” and “stack types”. But that’s not relevant most of the time. Most of the time the relevant thing is their copying and identity semantics.
```

#### javascript comparison
* In JavaScript, String values are **immutable**, which means that they cannot be altered once created.
* For example, the following code...

```js
var myStr = "Bob";
myStr[0] = "J";
```

* ... cannot change the value of myStr to "Job", because the contents of myStr cannot be altered. 
* Note that this does not mean that myStr cannot be changed, just that **the individual characters of a string literal cannot be changed**. The only way to change myStr would be to assign it with a new string, like this:

```js
var myStr = "Bob";
myStr = "Job";
```

* string has also properties accessible via bracket notation

```js
	var name = 'Pavol';
	name[0] // ➔ 'P'
```

* strings are immutable, whereas Arrays are mutable ➔ `name.pop()` will not work !!! 

### taking advantage of garbage collection2019-11-22
* this is managed language
* garbage collector run automatically, memory is managed automatically as well 

## terminology
* Assert
    * Assert.Equals()
    * Assert.Same()
    * Assert.True()
* GC
    * garbage collection
    * heap
* immutable
* managed language
* memory location 
    * memory cells
* object base class    
* stack
* struct
* type
    * reference type
    * value type
* type tests

## sources
* [JS primitives VS objects](https://stackoverflow.com/a/13268731)
* [C# Coding Standards and Naming Conventions](https://github.com/ktaranov/naming-convention/blob/master/C%23%20Coding%20Standards%20and%20Naming%20Conventions.md#c-coding-standards-and-naming-conventions)