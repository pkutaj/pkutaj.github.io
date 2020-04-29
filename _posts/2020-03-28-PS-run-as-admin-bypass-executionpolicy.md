---
layout: post
title: powershell > run as admin, bypass executionpolicy
categories: [powershell]
---
## the case	
* the question is, how to ensure scripts will run when sent as zipped packages of a `.ps1` and `.bat` file 


## toc
<!-- TOC -->

- [documenting execution-policy](#documenting-execution-policy)
- [on execution policy](#on-execution-policy)
- [sources](#sources)

<!-- /TOC -->

## findings
* the below example of for the `force-addin-load` script overriding the outlook resiliency policy that may auto-disable it

CODE                                                     | COMMENT
---------------------------------------------------------|------------------------------------------------------------------------------------------------
1. `md c:\tools\`                                        | create a new directory. when running as admin, the location is changed to `c:\windows\system32`
2. `copy force-addin-load.ps1 c:\tools\`                 | copy the `.ps1` to the new directory
3. `copy force-addin-load.bat c:\tools\`                 | copy the `.bat` to the new directory
4. `powershell.exe -ExecutionPolicy ByPass ...`          | run powershell bypassing the execution policy in the session
5. `-Command Start-Process PowerShell -ArgumentList...`  | the powershell session starts another powershellsession with the following argumentlist
6. `'-File "C:\tools\force-addin-load.ps1"' -Verb RunAs` | define the absolute filepath and the instruction to execute as admin

```bat
md c:\tools\                        
copy force-addin-load.ps1 c:\tools\ 
copy force-addin-load.bat c:\tools\ 
powershell.exe -ExecutionPolicy ByPass -Command Start-Process PowerShell -ArgumentList '-File "C:\tools\force-addin-load.ps1"' -Verb RunAs
pause
```

### documenting execution-policy
* running without Bypass on a machine with **RESTRICTED** policy

```
.\force-addin-load.ps1 : File C:\pivotalTools\force-addin-load.ps1 cannot be loaded because running scripts is
disabled on this system. For more information, see about_Execution_Policies at
http://go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ .\force-addin-load.ps1
+ ~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

* activating the Bypass within a session

```
PS C:\pivotalTools> Get-ExecutionPolicy
Restricted
PS C:\pivotalTools> powershell -ExecutionPolicy Bypass
Windows PowerShell
Copyright (C) 2014 Microsoft Corporation. All rights reserved.

PS C:\pivotalTools> Get-ExecutionPolicy
Bypass
PS C:\pivotalTools>
```
### on execution policy
* safety feature
* execution policy controls how windows loads config files and run scripts
* should prevent running malicious code
* stored in the **REGISTRY** for the local computer
* for the session, it is stored **IN MEMORY**
* **IT IS NOT SECURITY SYSTEM** ➔ you can **BYPASS** that by typing the script content at the command line when you cannot run the script
* the aim is o set **BASIC RULES AND PREVENT UNINTENTIONAL VIOLATION**

### sources
* [2020-03-24-PS-force-enable-outlook-addin]({% post_url 2020-03-24-PS-force-enable-outlook-addin %})
