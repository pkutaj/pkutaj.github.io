---
layout: post
title: windows > general architecture overview; 6 user-mode components; 5 kernel-mode components
categories: [windows]
---

## the case	of the architecture in high level
the question is, what are the main components in windows architecture

## toc
<!-- TOC -->

- [MODES](#modes)
- [MODE-1 USER MODE](#mode-1-user-mode)
    - [COMPONENT-1.1 user application](#component-11-user-application)
    - [COMPONENT-1.2 subsystem DLLs](#component-12-subsystem-dlls)
    - [COMPONENT-1.3 NTDLL.DLL](#component-13-ntdlldll)
    - [COMPONENT-1.4 environment subsystem](#component-14-environment-subsystem)
    - [COMPONENT-1.5 services](#component-15-services)
    - [COMPONENT-1.6 system processes](#component-16-system-processes)
- [MODE-2 KERNEL-MODE](#mode-2-kernel-mode)
    - [COMPONENT-2.1 executive](#component-21-executive)
    - [COMPONENT-2.2 device drivers](#component-22-device-drivers)
    - [COMPONENT-2.3 kernel](#component-23-kernel)
    - [COMPONENT-2.4 hal](#component-24-hal)
    - [COMPONENT-2.5 graphics (win32k)](#component-25-graphics-win32k)

<!-- /TOC -->

## findings
### MODES
* aka **THREAD ACCESS MODE**
* whenever code executes is has one of the modes associated with it
    * **USER MODE**
    * **KERNEL MODE**
* this is associated with the thread    

![general_architecture_overview_5_6]({{ site.url }}/assets/img000624.png)

### MODE-1 USER MODE
* less powerful mode
* **ONLY** access to non-OS system code and data
* **NO ACCESS TO HARDWARE**
* keeps user applications from crashing the system
* any exception is crashing the process only

#### COMPONENT-1.1 user application
* the purpose of OS is to run applications

#### COMPONENT-1.2 subsystem DLLs
* subsystem is a view into the OS and the most common...
* ...the most common is **WIN32** is a subsystem, the mainstream Windows as we know it
* user application calls a subsystem DLLs
* subsystem DLL need to create a file, but FileSystem is in kernel

#### COMPONENT-1.3 NTDLL.DLL
* subsystem DLL uses `ntdll.dll`the lowest `.dll` in user mode
    * responsible for transition from User mode into Kernel Mode of the thread executing right now
    * NTCreate file (undocumented function)
    * does something that transitions the application from user to gerel

#### COMPONENT-1.4 environment subsystem
* process managing a particular subsystem
* a view into the OS
    * win32, usually
    * others like POSIX for example
* for win32, the environment subsystem is `csrss.exe`

#### COMPONENT-1.5 services
* windows services
* win32 processes, running in user mode, using regular dlls from windows subsystem
* they can start when windows subsystem starts
* can run under special users
    * local service
    * network service
    * local system account
* they interact with service control manager, **SCM**
* example: 
    * IIS, listening on ports
    * SQL server, listening for some communication mechanisms like TCP port, named pipe, providing a service
* there is typically no UI
* we can start/stop using API

#### COMPONENT-1.6 system processes
* typically always running
* crashing some of them is fatal
* `csrss.exe`
* `services.exe`
* `ssmss.exe`

### MODE-2 KERNEL-MODE
* privileged mode for use by the kerneland device drivers
* allows access to **ALL SYSTEM RESOURCES**
* with that power comes great responsibility
* **BSOD**: blue screen of death is exception associated with kernel mode
* applications of course access kernel mode, thead can switch mode and return to user mode
* some things reside in **KERNEL MODE**
    * device drivers

#### COMPONENT-2.1 executive
* gets into **EXECUTIVE** ➔ upper layer of kernel
    * some checking like **SECURITY**
    * not actual implementation
* executive calls one of 2 components
    * drivers
    * kernel

#### COMPONENT-2.2 device drivers
* loadable kernel module
    * can be created by developers as well
    * `NTFS.SYS` is called to `CreateFile` with `FilePath`

#### COMPONENT-2.3 kernel
* thread scheduling
* handling interrupts

#### COMPONENT-2.4 hal
* Hardware Abstraction Layer isolates hardware from software and isolates hardware-specifics
* most of the time drivers and kernel go through the **HAL**

#### COMPONENT-2.5 graphics (win32k)
* Graphics `win32k.sys` implements the GDI (graphics device interface) and the windowing system
    * component working on the UI
    * kernel can work without any UI (in embedded systems, for example)