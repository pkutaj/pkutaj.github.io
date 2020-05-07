---
layout: post
title: windows > 6x core system files
categories: [windows]
---
## the case	of the core system files
the question is, what is in the core of windows

## toc
<!-- TOC -->

- [(1) ntoskrnl.exe — kernel itself](#1-ntoskrnlexe--kernel-itself)
- [(2) hal.dll — hardware abstraction layer](#2-haldll--hardware-abstraction-layer)
- [(3) Win32k.sys](#3-win32ksys)
- [(4) NtDll.dll](#4-ntdlldll)
- [(5) intermediary Dlls for calling undocumented NtDll.dll](#5-intermediary-dlls-for-calling-undocumented-ntdlldll)
- [(6) csrss.exe — Client Server Runtime Subsystem](#6-csrssexe--client-server-runtime-subsystem)

<!-- /TOC -->

## findings
### (1) ntoskrnl.exe — kernel itself

FILE             | COMMENT
-----------------|--------------------------------------
`Ntoskrnl.exe`   | executive and kernel on 64-bit system
`NtoskrnlPa.exe` | executive and kernel on 32-bit system

* `.exe` is not significant; it is a convention
* it does not mean you can double-click that and expect something meaningful to happen
* the typical documentation for Windows Kernel Functions is **WINDOWS DRIVER KIT**
    * [Download the Windows Driver Kit (WDK) - Windows drivers from Microsoft Docs](https://docs.microsoft.com/en-us/windows-hardware/drivers/download-the-wdk)
* most of the kernel functions are undocumented
* when creating a driver, you use documented functions of the kernel
* can be checked with the dependency walker

### (2) hal.dll — hardware abstraction layer

FILE      | COMMENT
----------|---------------------------
`Hal.dll` | hardware abstraction layer


### (3) Win32k.sys

FILE         | COMMENT
-------------|-----------------------------------
`Win32k.sys` | handles windowing and GDI graphics

* kernel-mode component if **WINDOWS SUBSYSTEM**
* functions like create a window, etc... UI is not going through `ntdll.dll`


### (4) NtDll.dll

FILE        | COMMENT
------------|------------------------------------------------------------------------
`NtDll.dll` | system support routines and Native API dispatcher to executive services

* these functions are undocumented: we do not know what parameters they accept
* loaded by every process
* lower level of the user-mode space
* 2 sets of functions
    1. important: jumping into kernel mode
    2. simple functions similar to C runtime library

![c_runtime_library_functions_within_ntdll]({{ site.url }}/assets/img000709.png)


### (5) intermediary Dlls for calling undocumented NtDll.dll

FILE           | COMMENT
---------------|---------------------------------------------------------------------
`Kernel32.dll` | transition to `NtDll.dll` if needed or transition to kernel directly
`user32.dll`   | transition to `NtDll.dll` if needed or transition to kernel directly
`gdi32.dll`    | transition to `NtDll.dll` if needed or transition to kernel directly
`advapi32.dll` | transition to `NtDll.dll` if needed or transition to kernel directly

* necessary for applications calling kernel services and `NtDll.dll`
* but the native API is undocumented
* other, officially documented libraries are needed that correspond to a given subsystem


### (6) csrss.exe — Client Server Runtime Subsystem

FILE        | COMMENT
------------|---------------------------------------------------------------------
`CSRSS.exe` | transition to `NtDll.dll` if needed or transition to kernel directly

* `csrss.exe`
* **CLIENT SERVER RUNTIME SUBSYSTEM** is a misleading title, all subsystems are client-server in a sense
* this is the process **MANAGING WINDOWS SUBSYSTEM**
* essential and always running
* killing that causes the system to bluescreen 