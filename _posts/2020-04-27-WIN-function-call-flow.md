---
layout: post
title: windows > function call flow
categories: [windows]
---
## the case	of the call flow
the question is, how do functions call flow typically look like in Windows

...the thread goes to the kernel and back

![to_the_kernel_and_back]({{ site.url }}/assets/img000639.png)

## toc
<!-- TOC -->

- [(1) FROM USER MODE..](#1-from-user-mode)
    - [application — call the fread function](#application--call-the-fread-function)
    - [subsystem — Msvcrt.dll: call ReadFile](#subsystem--msvcrtdll-call-readfile)
    - [subsystem — Kernel32.dll: call NtReadFile return to caller](#subsystem--kernel32dll-call-ntreadfile-return-to-caller)
    - [NtDll.dll — sysenter / syscall return to caller](#ntdlldll--sysenter--syscall-return-to-caller)
- [(2)...TO THE KERNEL MODE...](#2to-the-kernel-mode)
    - [Executive — NtOskrnl.exe — call NTReadFile](#executive--ntoskrnlexe--call-ntreadfile)
    - [Executive — NtOskrnl.exe — call driver to return to the caller](#executive--ntoskrnlexe--call-driver-to-return-to-the-caller)
    - [Driver — driver.sys — initiate I/O return to the caller](#driver--driversys--initiate-io-return-to-the-caller)
- [(3)...AND BACK](#3and-back)
    - [sources](#sources)

<!-- /TOC -->

## findings


### (1) FROM USER MODE..
#### application — call the fread function
* `fread` reads a block of binary data from a stream

#### subsystem — Msvcrt.dll: call ReadFile
* `fread` is implemented on `win32` subsystem
* it is calling `ReadFile` API, part of `kernel32.dll`

#### subsystem — Kernel32.dll: call NtReadFile return to caller
* this is an undocumented function

#### NtDll.dll — sysenter / syscall return to caller
* native API
* completely undocumented
* never be used by application directly
* makes a transition to kernel mode
* specially instructs CPU with sysenter (32-bit) or syscall (64-bit)

### (2)...TO THE KERNEL MODE...
#### Executive — NtOskrnl.exe — call NTReadFile
* with previous instructions, thread jumped into the kernel mode
* it jumps into a predefined function called **SYSTEM SERVICE DISPATCHER**
* EAX CPU register is loaded with a **SYSTEM SERVICE NUMBER** indicative of the function `NtReadFile` to call
* this `NtReadFile` is not identical with the one that is part of `Kernel32.dll`
* this function looks at the **HANDLE** of the file given and then needs to call the appropriate driver to continue processing

#### Executive — NtOskrnl.exe — call driver to return to the caller

#### Driver — driver.sys — initiate I/O return to the caller
* it does not matter if the driver is from MS or 3rd party
* this is done by **I/O MANAGER**
* it creates something known as I/O regres packet that is passed to the driver
* kernel does not care anymore what happens with IRP
* operation on a driver or device is initiated
* thread afterward return to the user mode

### (3)...AND BACK

#### sources
* * [Windows Internals ~ Pluralsight](https://app.pluralsight.com/library/courses/windows-internals/table-of-contents)