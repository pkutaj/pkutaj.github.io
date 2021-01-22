---
layout: post
title: 97.01 With-blocks
categories: [python]
---
## usecase
The concern is documenting the control flow structure known as **with-block** that replaces the need to pair each `open()` with

<!-- TOC -->

- [1. usual pattern](#1-usual-pattern)
- [2. enter with-block](#2-enter-with-block)
- [3. zen of python](#3-zen-of-python)
- [4. comparative linguistics: this is similar to using in c-sharp](#4-comparative-linguistics-this-is-similar-to-using-in-c-sharp)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. usual pattern
* the pattern of working with the files where you

```python
# 1. open a file
f = open(...)
# 2. work with the file
# ...
# 3. close a file
f.close()
```

* The close is important as it informs the operating system that the work with the file has been finished
* It closes the handle and releases the file for further use
* Also, it saves the changes - without closing, it is possible to lose data
    * there may be pending writes buffered up that may not get written completely
* Or, when opening lots of files, the system may run out of resources
* The mechanism that pairs `open()` with `close()` is similar to garbage collector mechanisms in languages without memory management

### 2. enter with-block
* any objects that supports he **context-manager protocol**  — file objects are one of them
* it exploits the context-protocol nature of the file object 
* it uses the with clause
* the aim is to get rid of the need to close the resource explicitly
* this is error-prone and even if it is not forgotten, one must use `try-catch-finallly` block to handle exceptions
* the with construct calls it for us

```
with EXP as VAR:
    BLOCK 
```

### 3. zen of python
* this also resonates with the first aphorism of the zen of python: _Beautiful is better than ugly_ which, here, is taking precedence over _Explicit is better than implicit_

![zen]({{ site.url }}/assets/img002475.jpg)

### 4. comparative linguistics: this is similar to using in c-sharp
* the `with-block` has similar function as `using` in C#
* see my KB entry on [C\# > the File class \+ using statement implementing IDisposable](https://github.com/pkutaj/kb/blob/master/c-sharp/2020-01-17-C-SHARP-file-class-IDisposable.md)


### 5. sources
* [What is the python keyword "with" used for? - Stack Overflow](https://stackoverflow.com/questions/1369526/what-is-the-python-keyword-with-used-for)
