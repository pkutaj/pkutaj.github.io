---
layout: post
title: C# > unit testing (draft)
last_modified_at: 2019-11-13
---
## the case	
the question is (used in interviews quite a lot) is the essence of unit testing

## toc
<!-- TOC -->

- [test runner](#test-runner)
- [unit test project creation](#unit-test-project-creation)
    - [additional libraries](#additional-libraries)
- [syntax](#syntax)
    - [attributes in c#](#attributes-in-c)
- [where is the test runner](#where-is-the-test-runner)
- [assert class](#assert-class)
- [the triple-a structure](#the-triple-a-structure)
- [naming convention](#naming-convention)
- [references](#references)
    - [solution file](#solution-file)
- [benefits](#benefits)
- [refactoring](#refactoring)
    - [class "secession"](#class-secession)

<!-- /TOC -->

## findings
### test runner 
* finds all unit tests writte
* executes each test
* gives you a report to tell if it passed or if anything failed

### unit test project creation
* conventionally in `.net`, you write your unit tests in a **separate project / folder**
* navigate to the directory and create a new dotnet project

![dotnet_new_overview](img/img000246.png)


* create a folder with corresponding name to the project with `.Tests` in the name ➔ `GradeBook.Tests`
* create a unit test project there

```powershell
cd test
dotnet new xnunit
```
#### additional libraries
* xunit is not part of .net core ➔ additional libraries are needed ➔ package references already added to `.csproj` file

### syntax
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

#### attributes in c#
* little pieces of data attached to symbols that follows it
* `[FACT]` is attached to the method `Test1()`
* works like a "decoration" that you hang on something like a method

### where is the test runner
* integrated in IDEs 
* there is an extension for VS CODE
* dotnet CLI contains a test runner

### assert class
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

### the triple-a structure
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

### naming convention
* proper abstraction rely on good naming
* conventionally
    * test class name reflexts the tested class name with `tests` suffix ➔ `BookTests` for the `Book` class
    * test file name reflects the tested file name with `tests` suffix as well ➔ `BookTests.cs` reflects `Book.cs`

### references
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

#### solution file
* `.sln` file is piece of metadata integrating the project `.csproj` files such as test and source code
* create ➔ `dotnet new sln`
* add ➔ `dotnet sln add src\gradebook\gradebook.csproj`
* from the TLD, build or test all projects added to the solution
```plaintext
PS C:\Users\Admin\Documents\workspace\c#\gradebook> dotnet build
Microsoft (R) Build Engine version 16.3.0+0f4c62fea for .NET Core
Copyright (C) Microsoft Corporation. All rights reserved.

  Restore completed in 16.24 ms for C:\Users\Admin\Documents\workspace\c#\gradebook\src\GradeBook\GradeBook.csproj.
  Restore completed in 26.11 ms for C:\Users\Admin\Documents\workspace\c#\gradebook\test\GradeBook.Test\GradeBook.Test.csproj.
  GradeBook -> C:\Users\Admin\Documents\workspace\c#\gradebook\src\GradeBook\bin\Debug\netcoreapp3.0\GradeBook.dll
  GradeBook.Test -> C:\Users\Admin\Documents\workspace\c#\gradebook\test\GradeBook.Test\bin\Debug\netcoreapp3.0\GradeBook.Test.dll

Build succeeded.
    0 Warning(s)
    0 Error(s)

Time Elapsed 00:00:01.27
```


### benefits
* Unit Tests force you to have better software design
* Maintainable
* Extensible

### refactoring
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

#### class "secession"
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

## terminology
* all bits off
* attribute
* edge conditions
* executable statements
* happy day scenario
* proper abstraction
    * good name
* separate project 
* state association
* test discovery
* test execution
* test runner
* unit test libraries
* unit test project
* xUnit.net
 
## sources


