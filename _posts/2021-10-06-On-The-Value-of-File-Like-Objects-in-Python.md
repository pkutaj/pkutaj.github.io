## usecase
The aim of this page📝is to learn about **file-like objects** in python. This is a convenient and fairly informal description of _a set of expectations_ we can place on an object. These expectations are enabled by **duck typing**. It is therefore too simple to claim that

> file-like object: A synonym for file object.

— https://docs.python.org/3/glossary.html#term-file-like-object

Instead, it should be understood that this is the language feature enabling treatment of custom types of resources as if they were files with standard ways of file handling. 

https://gist.github.com/pkutaj/5c8cd1fcf2a8692a38049d1ba75f3087

```
# output
<class '_io.TextIOWrapper'>
[3, 9, 9, 3, 9, 9]
<class 'http.client.HTTPResponse'>
[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 7, 8, 14, 12, 8]
```

<!-- TOC -->

- [1. notes](#1-notes)
- [2. file object](#2-file-object)
- [3. links](#3-links)

<!-- /TOC -->

### 1. notes
* file-like objects that behave like files
* there is not a formal specific protocol such as a sequence/iterator protocol that a custom type would have to implement 
* but, thanks to polymorphism allowed by duck typing — the concept works well in practice
* reasons for the absence of exact protocol:
    - many types of data streams and devices have different capabilities/behavior/expectations
    - difficult to define a highly specific protocol
* it is here where [EAFP approach][#2] comes into its own for example:
    - try to perform `seek()` on a file-like object if you believe it allows random access (is not an iterator)
    - be prepared to fail if `seek()` is not supported

### 2. file object
* object exposing a file-oriented API with methods such as `read()` or `write()` to an underlying resource
* also `open()` & `close()` to open and close the resource
* also `seek()` & `tell()` to manipulate stream pointer

### 3. links
* [What is exactly a file-like object in Python? - Stack Overflow](https://stackoverflow.com/questions/4359495/what-is-exactly-a-file-like-object-in-python)
* [local: 2021-10-06-Deleting-files-with-EAFP-in-Python-vs-LBYL-in-C.md][#2]
[#2]: .\2021-10-06-Deleting-files-with-EAFP-in-Python-vs-LBYL-in-C.md
