---
layout: post
title: powershell > on cpu, htt, smt 
categories: [powershell]
---

## the case	of cpu info
* the question is, how to access cpu info with powershell, mainly such a simple information as how many cores does the CPU have, both physical and logical ones

## toc
<!-- TOC -->

- [wmi/cim in general](#wmicim-in-general)
- [on HTT and SMT in general](#on-htt-and-smt-in-general)
- [get-ciminstance -classname 'win32processor'](#get-ciminstance--classname-win32processor)
- [sources](#sources)

<!-- /TOC -->

## findings
### wmi/cim in general
* Windows Management Instrumentation (WMI) is a **CORE COMPONENT OF WINDOWS** that enables you to **MANAGE HOSTS** both locally and remotely. 
* Virtually every driver and OS subsystem/feature/role supports a WMI **INTERFACE**. 
* As WMI is **STANDARDS BASED**, it also interoperates with **OPEN SOURCE** systems that implement Open Management Instrumentation (OMI). 
* The **CIM cmdlets**, introduced with PowerShell v3, provide **A SUPERIOR MODULE** you can use to manage systems using WMI (both Windows systems and any host that implements OMI). 

### on HTT and SMT in general
* HTT ➔ hyperthreading
* SMT ➔ simultaneous multithreading
* The first mass market implementation came with **Pentium 4 in 2002**
* Physical cores are material cores within the CPU. 
* Logical cores are the abilities of a single physical core to run 2 or more threads simultaneously. 
* This grew out of the early Pentium 4 CPUs ability to do what was termed Hyper Threading (HTT)

### get-ciminstance -classname 'win32_processor'
* the following use of `get-ciminstance` will get you the number of physical cores in CPU
* use `Get-CimInstance -ClassName 'Win32_Processor'`

```
 Get-CimInstance -ClassName 'Win32_Processor'| Select-Object -Property 'DeviceID', 'Name', 'NumberOfCores';

DeviceID Name                                      NumberOfCores
-------- ----                                      -------------
CPU0     Intel(R) Core(TM) i7-4710MQ CPU @ 2.50GHz             4
```

* Physical cores are number of physical cores, actual hardware components.
* Logical cores are the number of physical cores times the number of threads that can run on each core through the use of hyperthreading.
* for example, my 4-core processor runs two threads per core, so I have 8 logical processors.

```
get-CimInstance -ClassName 'Win32_Processor' | select name, numberOfcores, NumberOfLogicalProcessors

name                                      numberOfcores NumberOfLogicalProcessors
----                                      ------------- -------------------------
Intel(R) Core(TM) i7-4710MQ CPU @ 2.50GHz             4                         8
```


### sources
* [multiprocessor - So what are logical cpu cores (as opposed to physical cpu cores)? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/88283/so-what-are-logical-cpu-cores-as-opposed-to-physical-cpu-cores)
* <https://app.pluralsight.com/library/courses/using-wmi-and-cim-powershell/table-of-contents>