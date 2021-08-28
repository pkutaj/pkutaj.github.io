## the case	
The question is, how to attach debugger to a powershell session as

* I needed the test if setting the executionpolicy for the session was done correctly 
* I needed to debug a longer script called from the shell with aliasing

## toc
<!-- TOC -->

- [on debugging PowerShell from VSCODE](#on-debugging-powershell-from-vscode)

<!-- /TOC -->

### on debugging PowerShell from VSCODE
* make sure there is a running powershell session in vsc
* add configuration **powershell attach to host process**
* set a **breakpoint** in the script
* start a powershell **session** (not necessarily an integrated session in vscode)
* get the `pid` with running `$pid` command
* press `f5` to start the debugger
* select the correct `pid` from the dropdown
* run the script from the selected terminal → it should break at the set breakpoint
* you can use the debug console to fool around if necessary 
    
