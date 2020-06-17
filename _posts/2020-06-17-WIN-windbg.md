---
layout: post
title: windows > on windbg and  other debuggers
categories: [windows]
---

## the case	of the debugger
the question is, how to approach windbg and other debuggers

## findings
* **windbg** is part of the debugging family
* other members
    * ntsd
    * cdb 
    * kd
* they are similar in that they are built on 1 library/engine `DbgEng.dll`
    * moderately documented
    * rich API


### command overview

COMMAND       | COMMENT
--------------|-------------------------------------------
`k`           | call stack
`lm`          | loaded modules (check symbols)
`~`           | threads within the running process
`?`           | evaluate expression like a thread ID
`G`           | continue executing
`!analyze -v` | exception analysis for crash dump analysis

### ntsd & cdb: user mode debuggers
* quite idential
* **ntsd** opens a new console widow if launched from a console
* **cdb** uses the same console window


### kd: kernel debugger
* all the machine is paused, when paused
* powerful way of looking into machine
* help us understand better how windows works
* way to **debug device drivers**

### WinDbg
* all that follows is for **PROCESS DEBUGGING** — this is not **KERNEL DEBUGGING**
* allows both user and kernel mode
* ✔️ GUI 🠊wrapper around `DbgEng.dll`

#### step-1 initial breakpoint — K command
* use **K** command to look at the call stack

![initial_breakpoint]({{ site.url }}/assets/img000642.png)

```
0:000> k
 # Child-SP          RetAddr           Call Site
00 00000083`28ddf210 00007ff8`a15945df ntdll!LdrpDoDebuggerBreak+0x30
01 00000083`28ddf250 00007ff8`a1581df5 ntdll!LdrpInitializeProcess+0x1e57
02 00000083`28ddf690 00007ff8`a1531853 ntdll!_LdrpInitialize+0x50589
03 00000083`28ddf730 00007ff8`a15317fe ntdll!LdrpInitialize+0x3b
04 00000083`28ddf760 00000000`00000000 ntdll!LdrInitializeThunk+0xe
```

#### step-2 symbols — LM command
* make sure you have symbols if you want to understand what's going on
* run **LM** command to get the list of loaded modules and check if symbols are loaded correctly in the form of a `.pdb` file
    * is you see **exports only** ➔ symbols are bad and need fixing; and use
    * **DEFERRED** means that by default windbg is not loading symbols for modules it things is not necessary this time
        * as the callstack is not running the module, windbg is not loading symbols for that module

![check_symbols_load]({{ site.url }}/assets/img000643.png)


#### step-3 thread-analysis — tilde command
* **~** (tilde) command returns threads running

```
0:000> ~
.  0  Id: 203c.3dc0 Suspend: 1 Teb: 00000083`28f68000 Unfrozen
   1  Id: 203c.3ce0 Suspend: 1 Teb: 00000083`28f6a000 Unfrozen
   2  Id: 203c.9b8 Suspend: 1 Teb: 00000083`28f6c000 Unfrozen
   3  Id: 203c.b5c Suspend: 1 Teb: 00000083`28f6e000 Unfrozen
```

* `203c.3dc0` is the ID in HEX
    * `203c` being the **PROCESS ID** in HEX
    * `3dc0` **THREAD ID** in HEX

![map_process_thread_id_with_powershell]({{ site.url }}/assets/img000670.png)

#### step-4 continue execuring — G command
* resume execution with **G** command
* **NOTE** you cannot run commands during the runtime

![cannot_run_commands_when_debuggee_running]({{ site.url }}/assets/img000679.png)

* you  **NEED A BREAK** ➔ `CTRL+BREAK` (`FN + PAGEDOWN`)

![force_break_in_windbg]({{ site.url }}/assets/img000680.png)

#### step-5 noting the dot
* note the dot then running the tilde
* the dot indicates where you are executing the **K** stack command

![note_the_dot_stack_operates_there]({{ site.url }}/assets/img000682.png)

* you can switch threads by `tilde + index + s`, in this case `~0s` 

![illustrating_thread_index_change]({{ site.url }}/assets/img000683.png)

### sources
* [Download Debugging Tools for Windows - WinDbg - Windows drivers ~ Microsoft Docs](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/debugger-download-tools)