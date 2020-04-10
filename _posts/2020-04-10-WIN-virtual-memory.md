---
layout: post
title: windows > virtual memory
categories: [windows]
---
## the case	
the question is the concept of **VIRTUAL MEMORY**

## toc
<!-- TOC -->

- [why virtual memory](#why-virtual-memory)
- [page](#page)
- [STEPS](#steps)
- [layout](#layout)
    - [(32-bit) address space](#32-bit-address-space)
    - [(64-bit) process](#64-bit-process)
- [DEMO](#demo)
    - [VMMAP for memory usage](#vmmap-for-memory-usage)
- [sources](#sources)

<!-- /TOC -->

## findings
* each process "sees" a **FLAT LINEAR MEMORY** that can be used for **WHATEVER** purpose
* memory is used to 
    1. load the image from the disk where `main()` resides
    2. other `.dll`s or modules are received from that memory
* that is **VIRTUAL MEMORY**

### why virtual memory
* it is an **EXTRA LAYER**
* it can
    * be mapped to **PHYSICAL MEMORY**
    * be stored on disk, e.g. **PAGE FILE**
* process access memory regardless of were it actually resides
* **MEMORY MANAGER** is managing/locating that memory
    * if **RAM** mapping is done from virtual address to physical address
    * if not physical memory, memory manager does what is needed to read that memory; changes the required mapping and tells CPU to require again (**PAGE FOLD**)
* process never uses actual physical memory

### page
* a page is a minimum chunk of memory managed by windows
* 4kb

### STEPS
* **RAM** is shared by all processes; all processes want to use as much RAM as they can
* every process has potentially very large address space, not all physical memory can satisfy that
* **RAM** is allocated by chunks known as pages and mapped to **VIRTUAL MEMORY**

![memory_pages_4kb_containers]({{ site.url }}/assets/img000617.png)

* some memory may be temporarily mapped to **DISK**
    * page file
    * executable can be back-up storage for code that does not naturally change
* same processes and .`dlls` can share the same **RAM** memory page

### layout

![virtual_memory_layout]({{ site.url }}/assets/img000618.png)

#### (32-bit) address space
* 2 GB **USER PROCESS SPACE**
    * per process
* 2 GB **SYSTEM SPACE**
    * same for whatever process

![32-bit_address_space]({{ site.url }}/assets/img000620.png)

#### (64-bit) process
* 128 TB **USER PROCESS SPACE** in win10 (8 TB before)
    * enormous
* 6657 GB **SYSTEM SPACE**

![64_bit_address_space]({{ site.url }}/assets/img000621.png)

### DEMO
* task manager displays **PRIVATE WORKING SET**
    * **WORKING SET:** term describing **PHYSICAL MEMORY**
    * **PRIVATE:** term describing the fact that this memory is not shared by other processes
* note that if `.dll` or .`NET` assembly is loaded, that is not private mode, that is **SHARABLE**

![private_working_set]({{ site.url }}/assets/img000619.png)

* **THIS IS NOT A GOOD COLUMN TO LOOK IF CHECKING WHAT IS MEMORY INTENSIVE**
    * you need to change the column ➔ look as **COMMIT SIZE** in task manager, or better, process explorer, or better VMMAP

#### VMMAP for memory usage
* also process explorer can be used
* this particular sysinternal tool is great for the investigation of memory usage for a particular process

### sources
* [Windows Process Memory Usage Demystified - DZone Performance](https://dzone.com/articles/windows-process-memory-usage-demystified)
* [Physical and Virtual Memory in Windows 10 - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/windows_10-performance/physical-and-virtual-memory-in-windows-10/e36fb5bc-9ac8-49af-951c-e7d39b979938)