---
layout: post
title: windows > system processes
categories: [windows]
---
## the case	
the question is, what system processes are running in windows

8x system processes are a major component of windows architecture, they are 1 of 6 components of the user mode

![windows_architecture_system_processes_highlighted]({{ site.url }}/assets/img000817.png)

## toc
<!-- TOC -->

- [PROCESS-1 idle](#process-1-idle)
- [PROCESS-2 system](#process-2-system)
- [PROCESS-3 smss.exe (session manager)](#process-3-smssexe-session-manager)
    - [SMSS concerns](#smss-concerns)
- [PROCESS-4 csrss.exe (windows subsystem)](#process-4-csrssexe-windows-subsystem)
- [PROCESS-5 winlogon.exe (logon process)](#process-5-winlogonexe-logon-process)
- [PROCESS-6 services.exe (service control manager)](#process-6-servicesexe-service-control-manager)
- [PROCESS-7 lsass.exe (local security authentication server)](#process-7-lsassexe-local-security-authentication-server)
- [PROCESS-8 lsm.exe (local session manager)](#process-8-lsmexe-local-session-manager)
- [sources](#sources)

<!-- /TOC -->

## findings
### PROCESS-1 idle
* always PID of 0
* not a real process
* not image, address space
* idle loop that CPU enters then it has nothing to run
* accounts for idle time

### PROCESS-2 system
* real process
* fixed PID which is **4**
* represents the **KERNEL ADDRESS SPACE** and resources
* hosts system threads
    * parts of the kernel for keeping the system healthy
    * device drivers threads
* number of threads not constant
    * 265 in the example below
    * **DO NOT LOOK FOR THE PARTICULAR NUMBER HERE**

![system_process]({{ site.url }}/assets/img000757.png)

* drivers can create system thread by a documented function `PsCreateSystemThread` kernel API 
    * documented in the WDK
* Allocate memory in system pools
* You can open **HANDLES** to access objects
* But most of the time **POINTERS** to the system space is used and not handles

![loaded_modules_mostly_drivers]({{ site.url }}/assets/2020-04-20-system-loaded-modules.gif)

### PROCESS-3 smss.exe (session manager)
* the **FIRST** user-mode process created by the system
* it is part of the boot process
* it is a **NATIVE IMAGE** ➔ using `ntdll.dll` only 

#### SMSS concerns
1. creating system environmental variables
2. launches the subsystem processes (normally just `csrss.exe`)
    * not just `csrss.exe`  
    * this is why it is called session manager
3. creates new sessions by launching an instance of itself in other sessions
    * session starts
    * `smss.exe` launches
    * loads `winlogon` and `csrss`
    * `smss.exe` terminates
* ➔ there is **ONLY 1** `smss.exe` in the system
* it is in **SESSION 0** which is the system session
    * `csrss.exe` and `winlogon` are per session
* other than that is **NOT MUCH**
    * it is listening, mostly
    * waiting for `csrss.exe` to terminate
    * if dies, creates the system
    * it is a protected and trusted OS process that can crash it
    * if it itself crashes, the system will crash as well (kernel watches this process)
    * waits for terminal services session creation requests

### PROCESS-4 csrss.exe (windows subsystem)
* See [2020-04-25-WIN-subsystems]({% post_url 2020-04-25-WIN-subsystems %}) for info on Windows subsystems, `csrss.exe` and `ntdll.dll` 


### PROCESS-5 winlogon.exe (logon process)
* `windows\system32\winlogon.exe`
* handles interactive logon and logoffs
* responsible for UI 
* if logon is terminated, it logs off 
* responsible for capturing **SECURE ATTENTION SEQUENCE**
    * `ctrl + alt + delete`
* when users need to enter credentials, launches a helper process `loginui.exe`
    * prior to Vista, it was responsible, but this was decoupled in order to keep it alive if problems arose in the credentials entering
    * sends captured username and password to `lsass`
    * if successfully authenticated, initiates the user session

### PROCESS-6 services.exe (service control manager)
* `windows\system32\services.exe`
* responsible for starting, stopping and interacting with **SERVICE PROCESSES**
* iis, sql server, etc.
* sends a request 
* communicates with services with **NAMED PIPE**
    * inter-process communication mechanism for windows
* similar to **DAEMON PROCESSES** known in unix
* normal windows executable interacting with **SCM**
* **NOT RUNNING IN KERNEL MODE**
* can start automatically or without an interactive login
* can run **UNDER SPECIAL ACCOUNT**
    * **LocalSystem** — most powerful local account
    * **NetworkService**
    * **LoCALsERVICE**
* is service is implemented as a library, you need to use `svchost.exe` because it is **NOT POSSIBLE TO USE AN EXE INSIDE AN EXE**
    * few processes in the system
    * you can't have dozens of processes is hosting services
    * **DOWNSIZE** if a single of these hosted services crashes, it brings down the whole process and all services crumble with it as well


![services_in_svchost.exe]({{ site.url }}/assets/img000758.png)

* but there may be other services that have its own executable and therefore do not need `svchost`
    * typical 3rd party services

![independent_executables]({{ site.url }}/assets/img000759.png)

* there are a bunch of APIs to communicate with svchost.exe done via SCM
    * you need to know how to write the service

### PROCESS-7 lsass.exe (local security authentication server)
* `windows\system32\lsass.exe`
* calls the appropriate authentication package
* authenticates the user once it gets the info from `winlogon`
    * locally
    * domain controller
* when done, returns the information to `winlogon` for further processing

### PROCESS-8 lsm.exe (local session manager)
* helper to `smss.exe`
* from win8, implemented in `\windows\system32\lsm.dll`
* managing terminal sessions on the local machine
* notified with various events related to logon/logoff, etc.

### sources
* [Windows Internals ~ Pluralsight](https://app.pluralsight.com/library/courses/windows-internals/table-of-contents)