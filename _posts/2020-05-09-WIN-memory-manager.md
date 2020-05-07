---
layout: post
title: windows > memory manager
categories: [windows]
---

| **THE CASE OF THE MANAGER OF MEMORY**                                                                                          |
|--------------------------------------------------------------------------------------------------------------------------------|
| **question**                                                                                                                   |
| what is the basic outline of memory management                                                                                 |
| **thesis**                                                                                                                     |
| unit of memory management is a **PAGE** (4KB) ~ there are **3 STATES**; **2 SPACES**; memory is **SHARED** as much as possible |

## toc
<!-- TOC -->

- [(3) functions of memory manager](#3-functions-of-memory-manager)
- [pages](#pages)
- [(3) states of a page](#3-states-of-a-page)
    - [STATE-1. Free](#state-1-free)
    - [STATE-2. Committed](#state-2-committed)
    - [STATE-3. Reserved](#state-3-reserved)
    - [demo (VmMap): memory types, page states](#demo-vmmap-memory-types-page-states)
- [sharing](#sharing)
    - [what is shared?](#what-is-shared)
    - [demo (process explorer)](#demo-process-explorer)
- [(2) spaces of virtual memory: user and system](#2-spaces-of-virtual-memory-user-and-system)
    - [(32-bit) space](#32-bit-space)
    - [(64-bit) space](#64-bit-space)
- [address translation](#address-translation)
- [sources](#sources)

<!-- /TOC -->

## findings
### (3) functions of memory manager
1. **MAPS** virtual addresses 🠊 physical addresses (done by the CPU)
2. **PAGE FILES** usage to back up pages that **CANNOT FIT** to physical memory
    * physical memory is limited and expensive
    * if you need to allocate more, you need to use the persistent storage (disk)
3. provide **MEMORY SERVICES** to other system components
    * allocate, free, reserve memory

### pages
* memory is not managed in bytes 🠊 that would cost much overhead
* memory is managed in larger chunks called **PAGES**
* page size is **DETERMINED ONLY BY CPU**, not by OS
* all memory services are **PER-PAGE-SERVICES** 🠊 you can't just allocate 10 bytes, you are allocated an entire page
* 2-page sizes are supported

![page_size_per_architecture]({{ site.url }}/assets/img000851.png)

### (3) states of a page
* if a 32-bit process starts and has 2GB of virtual address space that it can use to allocate inro

#### STATE-1. Free
* unallocated page
* any access to that page causes Access Violation exception 🠊 kills the process

#### STATE-2. Committed
* allocated page that can be accessed
* no Access Violation there
* Page may not be in physical memory, it may be paged out to the page file
* may have a backup on disk (pagefile, dll)

#### STATE-3. Reserved
* in-between
* technically un-allocated 🠊 if access, Access Violation
* but this address space will not be used by anything until released
* canonical use: thread stack. the stack is not allocated upfront. is reserved (1MB is reserved). Stack has to be contiguous in virtual memory. That reservation must be kept until done. 

#### demo (VmMap): memory types, page states
1. select process you want to look at
2. UI displays the virtual address space of that process

![VMMap_components_demo]({{ site.url }}/assets/img000852.png)

* see comments for some of the types used

TYPE        | COMMENT
------------|-----------------------------------------------
image       | files, usually DLLs, used by the process
mapped file | files mapped by **MEMORY-MAPPED FILE OBJECTS**
stacks      | see the image below

![vmMap_procexp_correspondence]({{ site.url }}/assets/img000853.png)

### sharing
* **RAM is the most precious resource**
* the address space per process is in TB, but this is enormous compared to the physical memory that we have
* my machine is running on 16GB of physical memory
* pages can be **SHARED** across processes — for the same code, referenced from the same virtual memory address
* example scenario: `kernel32.dll` can be shared across 100 processes as it is common to many processes 

![sharing_memory_across_processes]({{ site.url }}/assets/img000855.png)

#### what is shared?
- [x] code pages based on the same images (5 instances of `mspaint.exe`)
- [x] DLL code loaded in the same addresses
- [x] data pages (read/write) 
    * by default special protection called `copy-on-write` exception which copies data as a separate page for a process that wants to edit the data
- [x] data pages can be created without `copy-on-write`

#### demo (process explorer)
* find DLL view 🠊 show Base, Image Base columns
* `Base` displays the address that DLL is mapped into this particular processes address space
* find a common system .dll such as `kernel32.dll` 
* note the address **0x00007FFE4D810000** that that 64-bit dll shares accross processes, i.e. they are all sharing the chunk of the memory to use this system DLL

![identical_address_demo]({{ site.url }}/assets/2020-05-07-win-shared-address-space.gif)

* note also the difference between **BASE** and **IMAGE BASE**
    * Image Base: the address that the image would like to load into 🠊 **PREFERRED ADDRESS**
    * Base: the actual address used 
* if the are identical, it is optimal for performance, if they are different linking happened

 ![difference_base_image_base]({{ site.url }}/assets/img000857.png)

### (2) spaces of virtual memory: user and system
* each process has
    * own unique **PRIVATE ADDRESS SPACE** — similar as it has it private handle table
    * shared identical **SYSTEM ADDRESS SPACE** is part of the entire address space that is visible — but not accessible by the application (handles only)
* kernel is singleton 🠊 the higher ranges look the same for each process
* the layout depends on the **BITNESS** of the OS and the specific process
* in the space, there are say dedicated ranges 

#### (32-bit) space

![32_bit_system_virtual_address_space]({{ site.url }}/assets/img000859.png)

#### (64-bit) space

![virtual_address_space_layout]({{ site.url }}/assets/img000858.png)

* 64-bit architecture can reach to 2^64 🠊 16EB 🠊 unimaginable
* current CPU architectures only support 58 bits addressing 256 TB
* current kernel implementation can work with 16TB at most 🠊 windows 10 enterprise can work with 6TB

### address translation
* CPU is configured upfront to understand virtual addresses
* old CPUs like 8086 worked only with REAL mode
* starting with 386, CPU needs to go through translation
* CPU gets some information to do the translation
    1. page directory per process 
    2. bunch of page tables
    3. translation lookaside buffer 

![virtual_address_translation]({{ site.url }}/assets/img000860.png)

### sources
* [Windows Internals 2](https://www.pluralsight.com/courses/windows-internals2)