---
layout: post
title: windows > handles and objects
categories: [windows]
---

| **THE CASE OF THE OBJECT MANAGER**                                                           |
|----------------------------------------------------------------------------------------------|
| **question**                                                                                 |
| how processes that are separated handle objects that actually interact with the system       |
| **thesis**                                                                                   |
| handled by **HANDLES**, with oversight of the **OBJECT MANAGER** living in the **EXECUTIVE** |

## toc
<!-- TOC -->

- [object manager](#object-manager)
- [user-mode clients](#user-mode-clients)
- [kernel-mode clients](#kernel-mode-clients)
- [WinObj](#winobj)
- [objects](#objects)
- [handles](#handles)
- [handles in procExp](#handles-in-procexp)
- [sources](#sources)

<!-- /TOC -->

## findings
### object manager
* object manager is part of the executive —  the upper layer of the kernel
- [x] creates **OBJECTS**
- [x] deletes **OBJECTS** 
- [x] tracks  **OBJECTS**
* objects are stored in a **TREE**
    * accessible with a tool called **WinObj** from SysInternals suite

### user-mode clients
* user-mode clients cannot get to the data structures that are loaded in memory
    * is in the kernel
    * you don't want user applications to be aware of the internal structure of objects
    * 🠊 use **HANDLES**

### kernel-mode clients
* kernel-mode clients can do either
    * use handles
    * work with objects directly

### WinObj

![win_obj_demo]({{ site.url }}/assets/img000841.png)

### objects
* structures instantiated and loaded in memory with some API
* windows is not object-oriented fully — does not support polymorphism directly, but is object-built system

![object_structure_2_owners]({{ site.url }}/assets/img000850.png)

| object manager owned   | comment                                                                             |
|------------------------|-------------------------------------------------------------------------------------|
| 1. object name         | just a string; not all objects are named                                            |
| 2. object directory    | logical placement within object manger's namespace                                  |
| 3. security descriptor | users and tokens that can access it and actions permitted (related to Win security) |
| 4. open handle count   | reference count - object is alive as long as it is referred to by handles           |
| 5. list of handles     | list of actual handles                                                              |
| 6. pointer count       | count of not handles, but of directly used pointers to the objecs                   |
| 7. object type         | pointing to the type of windows object itself                                       |

| executive owned  | comment |
|------------------|---------|
| 1. kernel object |         |

* the illustration of windows kernel objects types such as process or file
* objects expose particular methods to be used by user-mode processes 

![object_types_with_winObj]({{ site.url }}/assets/img000842.png)

![methods_exposed_object_types]({{ site.url }}/assets/img000843.png)


### handles
* when a process 
    * creates an object
    * opens an object

- [x]  it receives a **HANDLE** to the object
- [x]  **JUST A NUMBER** used as an opaque, indirect pointer to the underlying object
- [x] allows sharing object across processes via different handles
- [x] in .NET, used internally by types such as FileStream, Mutex, Semaphore, AutoResetEvent, etc.
* each process has a **PRIVATE HANDLE TABLE** 

### handles in procExp
* go to **VIEW** 🠊 **Show Unnamed Handles and Mappings** to access all handles in the lower pain

![handles_in_lower_pane]({{ site.url }}/assets/img000844.png)

* `CTRL-F` can be used to find a Handle or DLL substring
    * searches with currently used files, keys, dlls, etc. 

![find_handle_or_dll_substring]({{ site.url }}/assets/img000846.png)

* **TIP:** if a file cannot be deleted because it is used by a different file is to find the open handle to that file here

### sources
* [windows internals 2](https://www.pluralsight.com/courses/windows-internals2)