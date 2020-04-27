---
layout: post
title: windows > on subsystems
categories: [windows]
---
## the case	of windows subsystems
the question is the conceptualization of **SUBSYSTEM** in Windows 

![subsystem_dlls]({{ site.url }}/assets/img000807.png)

## toc
<!-- TOC -->

- [definition](#definition)
- [history: the 3 original subsystems of the original Windows NT](#history-the-3-original-subsystems-of-the-original-windows-nt)
- [mechanics](#mechanics)
- [registry](#registry)
- [subsystem DLLs](#subsystem-dlls)
- [ntdll.dll demo](#ntdlldll-demo)
    - [runtime functions](#runtime-functions)
    - [kernel-mode dispatchers](#kernel-mode-dispatchers)
- [notepad demo](#notepad-demo)
- [smss demo](#smss-demo)
- [sources](#sources)

<!-- /TOC -->

## findings
### definition
* subsystem is a **SPECIAL VIEW OF THE OS**
* you cannot call a kernel function directly from the user mode
* the only way to do that is via a dedicated **API**
* the role of the subsystem is to expose these services via **SUBSYSTEM DLLs**

### history: the 3 original subsystems of the original Windows NT
1. Win32 (Windows)
2. OS/2
3. POSIX 1003.1 (POSIX-1)

* you could run OS/2 and UNIX and WIN applications
* later in Windows XP, the support for OS/2 was dropped as OS/2 died
    * Windows 3.x killed OS/2
* an enhanced POSIX version is available with the **SERVICES FOR UNIX** product
* really, we are left with **1 MAJOR SUBSYSTEM**
* it has to be running all the time and cannot be killed without killing the system

### mechanics
* if a new subsystem is needed, it is defined in the header of the .exe

### registry 
* HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\SubSystems\
```
(default)    : mnmsrvc
Debug        :
Kmode        : \SystemRoot\System32\win32k.sys
Optional     : {}
Required     : {Debug, Windows}
Windows      : C:\WINDOWS\system32\csrss.exe ObjectDirectory=\Windows     
               SharedSection=1024,20480,768 Windows=On
               SubSystemType=Windows ServerDll=basesrv,1
               ServerDll=winsrv:UserServerDllInitialization,3 
               ServerDll=sxssrv,4 ProfileControl=Off MaxRequestThreads=16 
PSPath       : Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SYS 
               TEM\CurrentControlSet\Control\Session Manager\SubSystems\  
PSParentPath : Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SYS 
               TEM\CurrentControlSet\Control\Session Manager
PSChildName  : SubSystems
PSDrive      : HKLM
PSProvider   : Microsoft.PowerShell.Core\Registry
```

### subsystem DLLs
* every image belongs to exactly one subsystem2
* the value is stored in the image PE header
    * **PE** stands for portable executable
    * this allows **WINDOWS LOADER** to make correct decisions
* image has a particular subsystem
* image calls API functions
* API functions are exposed through subsystem libraries
    * `kernel21.dll`, `user32.dll`, etc. for the win subsystem
* most of these APIs are documented as they are **INTENDED** to be used with applications
* again: the kernel itself is not accessible directly as-is
* you are accessing it from a certain perspective, from a certain view
* some images **BELONG TO NO SUBSYSTEM**
    * native images
    * using **NATIVE API** part of `ntdll.dll`
    * this can be written only by Microsoft and is undocumented and can change between releases
    * this is the reason why `ntdll` contains functions from C runtime library

### ntdll.dll demo
#### runtime functions
* not really transitioning into kernel mode
* starting with `rtl`

![rtl_functions]({{ site.url }}/assets/img000749.png)

#### kernel-mode dispatchers
* starting with `Nt`

![kernel_dispatchers]({{ site.url }}/assets/img000750.png)

### notepad demo

![notepad_demo_depencency_walker]({{ site.url }}/assets/img000755.png)

### smss demo

![ssms_dependencies]({{ site.url }}/assets/img000756.png)

### sources
* [Microsoft Windows library files - Wikipedia](https://en.wikipedia.org/wiki/Microsoft_Windows_library_files)
* [Windows Internals ~ Pluralsight](https://app.pluralsight.com/library/courses/windows-internals/table-of-contents)