---
layout: post
title: powershell > debug by connecting to process
categories: [powershell]
---
## usecase
The concern is documenting debugging the module for publishing into jekyll
I don't want to `Launch Current File` because I would have to call the buggy function from that file
I want to set a breakpoint and have execution freeze at the moment of the exact simulation of the mishap. 

## contents
<!-- TOC -->

- [1. get pid of the calling shell](#1-get-pid-of-the-calling-shell)
- [2. requirement: running powershell session](#2-requirement-running-powershell-session)
- [3. attach to host process](#3-attach-to-host-process)
- [7. sources](#7-sources)

<!-- /TOC -->

### 1. get pid of the calling shell
* use `$pid` command to get the process id of the shell instance from where you'll call the function/module
* each terminal instance has it's own process ID, see the obtaining of the two various IDs from the VSC integrated terminal
* and separated terminal I use for most of the work

![get_pid]({{ site.url }}/assets/img001550.png)

### 2. requirement: running powershell session
* powershell extension has to be running (I keep disabling it for performance reasons)

![session_runs]({{ site.url }}/assets/{{ site.url }}/assets/img001552.png)

### 3. attach to host process
* in the debugger, select PowerShell Attach to Host Process
* select the retrieved ID of the terminal where you'll run the module

![pid_select]({{ site.url }}/assets/img001554.png)

### 7. sources
