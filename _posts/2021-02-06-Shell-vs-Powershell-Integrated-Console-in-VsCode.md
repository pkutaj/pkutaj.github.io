## usecase
* The aim of this explanation💡 is the difference between 1) and 2) 

![powershell_vs_integrated_console]({{ site.url }}/assets/img002555.jpg)

- Encountered while setting up Pester Unit Testing Framework in VSCode

<!-- TOC -->

- [1. Shell in the integrated terminal](#1-shell-in-the-integrated-terminal)
- [2. Powershell Integrated Console](#2-powershell-integrated-console)
- [3. Select Default shell for integrated console](#3-select-default-shell-for-integrated-console)
- [4. list used sources](#4-list-used-sources)

<!-- /TOC -->

### 1. Shell in the integrated terminal
* this **OS shell** that you can default to (pwsh, powershell, bash, ...)
* it has no special integration with the files being edited in the editor
* they show by their executable file name in the dropdown list in the integrated terminal's toolbar, e.g. `pwsh`

### 2. Powershell Integrated Console
* special shell that comes with **PowerShell extension**
* offers **integration** with the code being edited
* provides linting and debugging support

### 3. Select Default shell for integrated console
* Within Powershell Integrated Console you can choose what version of PowerShell you default to
    * Core 
    * Windows Powershell
* This config is not intuitive at all — my default profile takes ~5 seconds to load, not acceptable in for development there I need to restart sessions regularly when writing scripts

```
Use the following steps to choose the version:

* Open the Command Palette on Windows or Linux with Ctrl+Shift+P. On macOS, use Cmd+Shift+P.
* Search for Session.
* Click on PowerShell: Show Session Menu.
* Choose the version of PowerShell you want to use from the list, for example PowerShell Core.
```

![choose_default_integrated_console_version]({{ site.url }}/assets/img002571.jpg)

— From [Using Visual Studio Code for PowerShell Development - PowerShell @ Microsoft Docs](https://docs.microsoft.com/en-us/powershell/scripting/dev-cross-plat/vscode/using-vscode?view=powershell-7.1#choosing-a-version-of-powershell-to-use-with-the-extension)

### 4. list used sources
* <https://stackoverflow.com/a/60132705/11082684>
