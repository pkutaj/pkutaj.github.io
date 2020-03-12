---
layout: post
title: Windows > On Handles
---
## the case	
the question is, what are the handles and objects in windows

## toc
<!-- TOC -->

- [handle table](#handle-table)
- [sources](#sources)

<!-- /TOC -->

## findings
* Windows is an **object based system**
* Kernel exposes and manages objects and provides APIs to manipulate them
* Objects can be created dynamically depending on what we want to do
    * dozens of objects types such as process, mutex, event, desktop, file
* Objects reside in system memory space: **they can be accessed directly only by the kernel code**
* Kernel code can obtain a pointer to the actual instance memory and manipulate the instance and technically bypass the API provided for that particular type of object
* In user mode, there is no way to get to that object directly - system space is not accessible
* In order for user mode to get access to an object, it uses an **intermediary**, which is a **handle**
* handle is an index
    * table
    * ponting to a particular object in the kernel space
 * handle shields user code from directly accessing an object
    * object structure may change with OS versions, the API may change as well, but user code does not really notice becuase it uses a handle, an indirect refernce to that handle
    * security 
* objects are reference counted - handle can be closed
    * if the reference count === 0, the object deletes itself
    * objects can be reused in this way 
* there is a **processes handle table**
* this is the way kernel objects are managed
* in kernel, there is ObjectManager, responisible for creating, obtaining and otherwise manipulating 

### handle table
* every process has a handle table
* the handle table is private to a particular process
* handle is always a multiple of 5

![handle_table]({{ site.url }}/assets/img000439.png)

* some objects are named, some are unnamed
* filePath is created as a name
* more columns can be accesses in procexp
* Object address resided in kernel space, where the object resides
* Properties can be accesses

![handle_properties]({{ site.url }}/assets/img000440.png)

* it is possible to **close a handle**, which is possible using process explorer

### sources