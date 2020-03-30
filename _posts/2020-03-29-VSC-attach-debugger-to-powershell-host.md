---
layout: post
title: vscode > powershell > attach debugger to a host session
categories: [vscode]
---
## the case	
* the question is, how to attach debugger to a powershell session
    * I needed the test if setting the executionpolicy for the session was done correctly
## toc
<!-- TOC -->

- [on debugging PowerShell from VSCODE](#on-debugging-powershell-from-vscode)
- [automatic variables](#automatic-variables)

<!-- /TOC -->

## findings
### on debugging PowerShell from VSCODE
* add configuration **POWERSHELL ATTACH TO HOST PROCESS**
* set a **BREAKPOINT**
* start a powershell **SESSION** (not necessarily an integrated session in VSCODE)
* attach the debugger to that process
* run the script and it should break at the set breakpoint
* you can use the debug console to fool around if necessary 
    
### automatic variables
* `$pid` returns the current process id, just in case it is necessary to distinguish between various powershell sessions