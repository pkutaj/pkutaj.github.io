---
layout: post
title: WIN > debugging tools for windows (NTSD)
---
## toc
<!-- TOC -->

- [components of windows debug tools](#components-of-windows-debug-tools)
- [NTSD](#ntsd)
    - [Attach debugger to an existing process: Notepad example](#attach-debugger-to-an-existing-process-notepad-example)
    - [ON SYMBOLS](#on-symbols)
    - [Symbol types](#symbol-types)
    - [Use Symbols](#use-symbols)
    - [exploratory debugger commands](#exploratory-debugger-commands)
        - [threads](#threads)
        - [memory](#memory)
        - [code](#code)
- [ADPLUS](#adplus)

<!-- /TOC -->

### components of windows debug tools

COMPONENT    | DESCRIPTION
-------------|----------------------------------------------
`ntsd.exe`   | console based debugger with new console
`cdb.exe`    | console based debugger with existinng console
`windbg.exe` | gui based debug
`kb.exe`     | console based kernel mode debugger
`adplus.exe` | monitoring tool
`umdh.exe`   | memory leak detection tool
`remote.exe` | remote debugging tool

### NTSD
![NTSD_notepad](img/img000256.png)

#### Attach debugger to an existing process: Notepad example
* `ntsd notepad`
* `ctrl+c` ➔ stop execution; program freezes
* `g` ➔ resumes execution
* see the debuges side-to-side with the application

![2019-11-13-debugger-side-to-side-app]({{ site.url }}/assets/2019-11-13-debugger-side-to-side-app.gif)

* `~*k` ➔ get all the call stacks

#### ON SYMBOLS
* symbols is a crucial debugging concept
* think of symbols as **auxiliary metadata**
    * instead of looking at **code addresses** or **data addresses**
* symbol file with `.pdb` extension is introduced that maps those addresses to symbolic information 
* for MS products, there is **public symbol server**
* can be archived in a known location for your products ➔ this is a hassle to maintain
* create your own symbols server

#### Symbol types
1. Public ➔ slimmed down; used for sharing with external engineers
2. Private ➔ internal use and rich debug xp; easy reverse engineering if needed

#### Use Symbols
* `.symfix`
    * set the symbol path to the public MS symbols server
* `.sympath`
    * shows what the current symbols server address is
* `.sympath + <sympath>` 
    * common patterh ➔ `.symfix` + `sympath <your own server>`
* `reload`
* !chksym` make sure specified module is strictly matched to the desired csource 

#### exploratory debugger commands
##### threads
* whenever you debug, the debugger has a thread context
    * this is the currently selected thread
    * if there is a command requiring a thread, this is done on that thead
* `k` command **+** other ones
    * `kb`, `kn` ➔ shows a thread callstack in different flavors
    * `~*<command> ➔ for each thread perform a command
    * `!uniqstack` ➔ find unique stacks in the process
    * `dv` ➔ show local vars for the current frame
    * `.frame <number>` ➔ sets the current frame number
    * `~<thread number>s` ➔ switches to the thread number specified

##### memory
* `d` family of commands **+** other one
    * `dd` ➔ dumps raw memory in the speficied format
    * `dq` ➔ dumps raw memory in the speficied format
    * `du` ➔ dumps raw memory in the speficied format
    * `da` ➔ dumps raw memory in the speficied format
    * `dt` dumps data structures using symbol files
* `!address` ➔ shows detailed memory consumption / usage
* `!heap`➔ shows detailed heap memory soncumption / usage

##### code
* `u` ➔ disammbles code at current instruction pointer
* `ub` ➔ dissabmles code going backwards
* `uf`➔ dissambles an entire function


### ADPLUS
* attach to specific process and creates dumps when conditions are met
* generates crash dumps automatically
* used for postmortem debugging
* `.dmp` is conventional extension for crash dump file
* you need to use **NTSD** with `-z` extension to load up the dump file
* the debugger 
