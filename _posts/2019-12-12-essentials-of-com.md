---
layout: post
title:
last_modified_at: 
---
## the case	
the question is the basic concept of component object model

## toc
<!-- TOC -->

- [core](#core)
- [pillars](#pillars)
- [history](#history)

<!-- /TOC -->

## findings
* no dependence on runtime facilities
* steve balmer in 2000: 

> the work of the COM team was the only significant change in Windows API since the release of Windows 1.0 in 1985

* COM is an architecture for component reuse that allows dynamic and efficient composition of systems from independentlydeveloped binary components

### core
* at its heart only 2 things
    * IUnknown
    * C++ compiler
        * historically C++ started to bloom when component wars started
        * you could use C# compiler, but you need .NET framework and dll support
* what is not mentioned
    * Registry
    * Apartments and activation
    * DLL
    * Procies and marshaling
    * servers and security
    * VARIANT, BSTR, SAFERARRAY

### pillars
* Interfaces
* Classes
* Apartments
* Security 

### history
* before COM, something called OLE
* not the same
* OLE came first
* rooted in Office product line
* 1990 init
* OLE2, build on COM released in 1993
* OLE was a monolithic stack, difficult to abstract COM from there
* slowly, COM was fully documented and extracted from OLE
* Office
* Windows shell
* Microsoft Trasaction Server ➔ COM+ ➔ Core of Windows 2000
* COM+ is not COM
* COM+ is a set of services provided by the OS built on top of COM
* Windows runtime is built on top of COM
* DirectX
    * hugely successful API reliying only on COM interfaces