---
layout: post
title: windows > symbols for sysinternals (procmon and procexp)
categories: [windows]
---
## the case	of symbols
the question is how to properly load the default symbols that come with windows debuggers into sysinternals — both process monitor and process explorer

* something like...

![procmon_symbols_loaded]({{ site.url }}/assets/2020-04-09-symbols-loaded.gif)


## toc
<!-- TOC -->

- [sources](#sources)

<!-- /TOC -->

## findings
* Install the debugging tools as a standalone component from the [Windows Software Development Kit (SDK)]([Windows 10 SDK - Windows app development](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk/)).

![standalone_component_of_SDK]({{ site.url }}/assets/img000701.png)

* Create a directory in which to store your debugging symbols (e.g., `c:\symbols` or `d:\symbols`)
* Go to Process Explorer ➔ Options ➔ Configure Symbols
* Initially, you will get

![default_symbols_path_process_explorer]({{ site.url }}/assets/img000703.png)

* We need to replace it with the following (**NOTE:** need to have the Debugger tools installed at this point)

![process_symbols_setup]({{ site.url }}/assets/img000702.png)

* The `Dbghelp.dll` is located at

```
C:\Program Files (x86)\Windows Kits\10\Debuggers\x64\dbghelp.dll
```

* Create `c:\symbols` as the temporary folder for storing the symbols since they can be loaded ad hoc during the runtimes

```
srv*c:\symbols*https://msdl.microsoft.com/download/symbols
```

### sources
* <https://www.xitalogy.com/windows-internals/2019/08/14/windows-internals-how-to-configure-symbols-in-sysinternals-process-explorer.html>