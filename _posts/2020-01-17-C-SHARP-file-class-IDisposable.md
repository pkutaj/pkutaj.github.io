---
layout: post
title: C# > the File class + using statement implementing IDisposable
---
## the case	
the question is the implementation of the method for adding an input into a newline of a file

## toc
<!-- TOC -->

- [STEP-1 Activate file manipulation](#step-1-activate-file-manipulation)
- [STEP-2 Create a streamwriter](#step-2-create-a-streamwriter)
- [STEP-3 Refactor with "using" implementing IDisposable](#step-3-refactor-with-using-implementing-idisposable)

<!-- /TOC -->

## findings
### STEP-1 Activate file manipulation
* add [`using System.IO`](https://docs.microsoft.com/en-us/dotnet/api/system.io?view=netframework-4.8) for making the [`File`](https://docs.microsoft.com/en-us/dotnet/api/system.io.file?view=netframework-4.8) class and its members available in the namespace for this file

```c#
using System.IO;
```

### STEP-2 Create a streamwriter
* In order to write into a file, it needs to be opened, editted and closed each iteration

CODE                                             | COMMENT
-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------
1. `public override void AddGrade(double grade)` | `override` the inherited abstract method
2. `var writerIntoFile`                          | declare a dynamically-typed binding (`var`)
3. `File.AppendText`                             | creates a StreamWriter that appends UTF-8 encoded text to an existing file, or to a new file if the specified file does not exist
4. `($"{Name}.txt")`                             | template literal passing the Name property of the book to create a book-matching text file
5. `writerIntoFile.WriteLine(grade);`            | `Writeline()` writes the input parameter `grade` into a newline in the opened file
5. `writerIntoFile.Close();`                     | close the file and make sure everything is written

```c#
public override void AddGrade(double grade)                         //1.
        {
            var writerIntoFile = File.AppendText($"{Name}.txt");    //2.-4. 
            writerIntoFile.WriteLine(grade);                        //5. 
            writerIntoFile.Close();                                 //6. 

        }
```

### STEP-3 Refactor with "using" implementing IDisposable 
* the code about is **vulnerable**
    * if `writerIntoFile.WriteLine(grade);` throws an exception, we would not close the file
* replace `Close()` with `Dispose()` which is a method that manually runs the garbage collector, to free the resource
    * in this case a file handle from the file system
* the way to go about this is a rather non-obvious pattern typical for c# programs — [Using objects that implement IDisposable](https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/using-objects)
* ➔ wrap the code implementing `IDisposable` interface with a `using` statement
    * this way of using `using` is **not bringing in a new namespace**
    * this way of using `using` as a way to make sure to clean things up when I use this object
        * the signal that the work is done in the iteration is the closing curly bracket: `}` 
    * the compiler creates a `try`-`finally` statement (so called **intermediate language**)
    * `using` implements `iDisposable` and `Dispose()` on a block that is wraps
* used when working with objects that have an underlying resource such as 
    * files
    * sockets
    * ...
* use `using` with the object-as-argument in () and define the work in the block of {}

CODE                                                      | COMMENT
----------------------------------------------------------|-----------------------------------------------------------------------------
1. `using`                                                | `using` keyword initializing the use of `IDisposable` on a compatible object
2. `(var writerIntoFile = File.AppendText($"{Name}.txt")` | object passed into the `using` statement that implements `IDisposable`
3. `{`                                                    | start of the code block
4. `writerIntoFile.WriteLine(grade);`                     | action done in the scope of that object
5. `}`                                                    | free up the resources and do the necessary memory management

```c#
      public override void AddGrade(double grade)
        {
            using (var writerIntoFile = File.AppendText($"{Name}.txt")) //1.–2.
            {                                                           //3. 
                writerIntoFile.WriteLine(grade);                        //4. 
            }                                                           //5. 

        }
```

## sources
* [System.IO Namespace - Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/api/system.io?view=netframework-4.8)
* [File Class (System.IO) - Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/api/system.io.file?view=netframework-4.8)
* [File.AppendText(String) Method (System.IO) - Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/api/system.io.file.appendtext?view=netframework-4.8#System_IO_File_AppendText_System_String_)
* [Using objects that implement IDisposable - Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/using-objects)