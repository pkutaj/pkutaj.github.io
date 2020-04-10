---
layout: post
title: windows > pseudo and system processes
categories: [windows]
---
## the case	of pseudo and system processes
* the question is, what is **RIGHT** when troubleshooting windows processes so that it can be investigated what is **WRONG**

## toc
<!-- TOC -->

- [pseudo-processes](#pseudo-processes)
    - [SYSTEM IDLE](#system-idle)
    - [SYSTEM](#system)
    - [INTERRUPTS](#interrupts)
    - [MEMORY COMPRESSION](#memory-compression)
- [system-processes](#system-processes)
    - [wininit.exe](#wininitexe)
    - [userinit.exe](#userinitexe)
    - [services.exe](#servicesexe)
    - [csrss.exe](#csrssexe)

<!-- /TOC -->

## findings
### pseudo-processes
####  SYSTEM IDLE
    * 1 thread per CPU
    * account for CPU idle time when Windows is not running any program code
    * no PID value

![thread_per_cpu]({{ site.url }}/assets/img000705.png)

#### SYSTEM
* 2.1 kernel itself ➔ `ntoskrnl.exe` 
* 2.2 device drivers

![system_process_hosting_device_drivers]({{ site.url }}/assets/img000707.png)

* `hal.dll`



* activity here that something is taking place in the kernel, often a buggy driver


#### INTERRUPTS
    * kernel mode time spent servicing interrupts and deferred procedure calls (DPC)
    * child process of system

#### MEMORY COMPRESSION
    * win10 is compressing pages
    * improving performance
    * saving SSD lifetime

![pseudo_system_processes]({{ site.url }}/assets/img000609.png)

### system-processes
#### wininit.exe
#### userinit.exe
#### services.exe
#### csrss.exe