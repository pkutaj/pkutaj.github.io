---
layout: post
title: Windows > COM > On GUIDs and DLLs 
categories: [windows]
---
## the case	
the question is the terminology of DLLs and GUIDs within the context of COM / Windows internals 

## toc
<!-- TOC -->

- [GUIDs](#guids)
- [DLLs](#dlls)
- [sources](#sources)

<!-- /TOC -->

## findings
### GUIDs
* 128-bit value used by COM to identify various elements, also libraries
* there is no guarantee that other developer won't design an interface with the identical name
* unique indentifier is needed
* not invented by COM designers
* borrowed from RPC as many other subsystems in windows
* there is CLSID and IID, class ID and interface ID and UUID
    * CLSID identifies a COM Class Object
    * Example: `0006F03A-0000-0000-C000-000000000046` 
    
### DLLs
* Microsoft's equivalent od `*.jar` in Java — the implementation of shared library concept
* dynamically linked all is linked at runtime 
    * all external bindings get linked **at runtime**, not at **complie time**
    * means: you can go to **procmon** and watch the linking in realtime as it runs into registry and gets information about what library is being used there
    * the beauty is that you slow down when going into structs
* in the 80s you execute absolute binaries
* you compile .c file into .o files collect them and link all .o into .exe
    * `.c` source code
    * `.o` object code
    * `.exe` executables
    * `.h` header files
    * `makefile`
    * data files (any name)
* linking was the most effort
    * the linkers copies all object code into the executable file and then links all external references
    * disks were slow
* activeX
* and java, jar files and life is good - independently deployable parts of the system

### sources
* [Dynamic-link library - Wikipedia](https://en.wikipedia.org/wiki/Dynamic-link_library)
* [Coding a Better World Together - with Uncle Bob - Day 1 - YouTube](https://www.youtube.com/watch?v=SVRiktFlWxI&t=7640s)
* [language agnostic - Runtime vs. Compile time - Stack Overflow](https://stackoverflow.com/questions/846103/runtime-vs-compile-time)