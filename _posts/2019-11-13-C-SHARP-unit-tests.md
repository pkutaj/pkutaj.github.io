---
layout: post
title: C# > unit tests
last_modified_at: 2019-11-14
---
# THE UNIT TEST PUZZLE 
## THE CASE	
the puzzle (used in interviews quite a lot) is the essence of unit testing

## SOLUTION
lorem ipsum

### toc

<!-- TOC -->

- [toc](#toc)
- [terminology](#terminology)
- [TEST RUNNER](#test-runner)
- [UNIT TEST PROJECT CREATION](#unit-test-project-creation)
    - [ADDITIONAL LIBRARIES](#additional-libraries)
- [SYNTAX](#syntax)
    - [ATTRIBUTES IN C#](#attributes-in-c)
- [WHERE IS THE TEST RUNNER](#where-is-the-test-runner)
- [ASSERT CLASS](#assert-class)
- [THE TRIPLE-A STRUCTURE](#the-triple-a-structure)
- [NAMING CONVENTION](#naming-convention)
- [REFERENCES](#references)
- [BENEFITS](#benefits)
- [REFACTORING FOR TESTABILITY](#refactoring-for-testability)
    - [Class "Secession"](#class-secession)

<!-- /TOC -->

### terminology 

* all bits off
* attribute
* edge conditions
* executable statements
* happy day scenario
* proper abstraction
    * good name
* separate project 
* state association
* statement of fact
* test discovery
* test execution
* test runner
* unit test libraries
* unit test project
* xUnit.net

</details>
<details>

<!-- SOURCES -->
<summary>sources</summary>

* lorem ipsum

</details>

## NOTES
### TEST RUNNER 
* finds all unit tests writte
* executes each test
* gives you a report to tell if it passed or if anything failed

### UNIT TEST PROJECT CREATION
* conventionally in `.net`, you write your unit tests in a **separate project / folder**
* navigate to the directory and create a new dotnet project

![dotnet_new_overview](img/img000246.png)


* create a folder with corresponding name to the project with `.Tests` in the name ➔ `GradeBook.Tests`
* create a unit test project there

```powershell
cd test
dotnet new xnunit
```
#### ADDITIONAL LIBRARIES
* xunit is not part of .net core ➔ additional libraries are needed ➔ package references already added to `.csproj` file

### SYNTAX
* every testing framework has its own syntax and can work a bit differently 
* `xUnit` namespace is needed
* you run executable statements of c# code

```c#
using System;
using Xunit; // TESTING NAMESPACE WITH APIs AND TYPES

namespace Gradebook.Tests
{
    public class UnitTest1 //CLASS
    {
        [Fact] // ATTRIBUTE
        public void Test1() //METHOD
        {

        }
    }
}
```

* `[FACT]` is an attribute

#### ATTRIBUTES IN C#
* little pieces of data attached to symbols that follows it
* `[FACT]` is attached to the method `Test1()`
* works like a "decoration" that you hang on something like a method

### WHERE IS THE TEST RUNNER
* integrated in IDEs 
* there is an extension for VS CODE
* dotnet CLI contains a test runner

### ASSERT CLASS
* API we are going to use is an API provided by a class names `Assert` from the xUnit namespace
* `Assert` contains a list of static methods that test the given parameter as per its nature
```c#
using System;
using Xunit;

namespace Gradebook.Tests
{
    public class UnitTest1
    {
        [Fact]
        public void Test1() // PRIMITIVE UNIT TEST
        {
            var x = 2;
            var y = 5;

            var expected = 7;
            var actual = x * y;

            Assert.Equal(expected, // ASSERT.EQUAL METHOD
                         actual);
        }
    }
}
```
* result is below
```plaintext
dotnet test
Test run for C:\Users\Admin\Documents\workspace\c#\gradebook\test\Gradebook.Tests\bin\Debug\netcoreapp3.0\Gradebook.Tests.dll(.NETCoreApp,Version=v3.0)
Microsoft (R) Test Execution Command Line Tool Version 16.3.0
Copyright (c) Microsoft Corporation.  All rights reserved.

Starting test execution, please wait...

A total of 1 test files matched the specified pattern.
[xUnit.net 00:00:00.51]     Gradebook.Tests.UnitTest1.Test1 [FAIL]
  X Gradebook.Tests.UnitTest1.Test1 [7ms]
  Error Message:
   Assert.Equal() Failure
Expected: 7 
Actual:   10
  Stack Trace:
     at Gradebook.Tests.UnitTest1.Test1() in C:\Users\Admin\Documents\workspace\c#\gradebook\test\Gradebook.Tests\UnitTest1.cs:line 17

Test Run Failed.
Total tests: 1
     Failed: 1
 Total time: 1.1700 Seconds
```

### THE TRIPLE-A STRUCTURE
* usually 3-part structure:
    1. Arrange ➔ put together test data 
    2. Act ➔ Invoke a method to perform a calculation to perform a result
    3. Assert ➔ Assert something about the value that was computed inside of act

```C#
public void Test1()
        {
            // 1. ARRANGE
            var x = 2;
            var y = 5;

            // 2. ACT
            var expected = 7;
            var actual = x + y;

            //3. ASSERT
            Assert.Equal(expected,
                         actual);
        }
```

### NAMING CONVENTION
* proper abstraction rely on good naming
* conventionally
    * test class name reflexts the tested class name with `tests` suffix ➔ `BookTests` for the `Book` class
    * test file name reflects the tested file name with `tests` suffix as well ➔ `BookTests.cs` reflects `Book.cs`
* name of the test should reflect the statement of fact you want to make about your software
* example: the default...

```c#
        [Fact]
        public void Test1()
```

* ... is renamed to

```c#
        [Fact]
        public void BookCalculatesAnAverageGrate()
```


### REFERENCES
* you have access to to classes within that project 
* but: testing project is another project ➔ you need to give access to the object of test
* how ? 
    * define the reference
        * right-click in VS
        * dotnet cli ➔ `dotnet add` allowing adding either a package reference or project-to-project reference 
* this modifies the `.csproj` file
```plaintext
 dotnet add reference ..\..\src\GradeBook\GradeBook.csproj
```
* result of the `.csproj` file
```c#
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.0</TargetFramework>

    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.2.0" />
    <PackageReference Include="xunit" Version="2.4.0" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.4.0" />
    <PackageReference Include="coverlet.collector" Version="1.0.1" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\..\src\GradeBook\GradeBook.csproj" />
  </ItemGroup>

</Project>

```

### BENEFITS
* Unit Tests force you to have better software design
* Maintainable
* Extensible

### REFACTORING FOR TESTABILITY
* the original method
```c#
 public void GetStats()
        {
            foreach (var number in grades)
            {
                highGrade = Math.Max(number, highGrade);
                lowGrade = Math.Min(number, lowGrade);
                sum += number;
            };
            averageGrade = sum / grades.Count;
            Console.WriteLine($"The highest grade is {highGrade}");
            Console.WriteLine($"The lowest grade is {lowGrade}");
            Console.WriteLine($"The average grade is {averageGrade:N1}");
        }
```
* Found that `GetStats()` is doing too many things and needs to be broken up 
    * design smell: if in description there is conjunction  
    * single responsibility principle
    * it computes highest grade **and** it computes lowest grade **and** it computes an average **and** it prints the results
* When writing unit tests you want to **separate deciding from the doing**
    * separate calculating from displaying
    * vastly different responsibilities
* `void` means this method should not return anything
* we need to construct an object with a **state associated with it**
    * average state, high state, low state
    * you construct an object from a class definition
    * the single responsibility of this class is to transport and carry the result of statistical calculations

#### Class "Secession"
* separate a class definition from the old method
* create a new file `statistics.cs`
* create a new public class with the identical name
```c#
namespace GradeBook
{
    public class stats
    {
        public double averageGrade;
        public double highGrade;
        public double lowGrade;

    }
}
```
* this is it — the object will only contain these fields associated with it (**return type ???**)
* but `statistics` from the class definition as a return type for the class `getStats`
```c#
  public stats GetStats() //define stats as a return type
        {
            stats result = new stats(); //construct result binding as object of type stats
//...
//...
//...
```
* above, you don't have to initialize the values, the .NET runtime does it automatically ➔ **all bits off**