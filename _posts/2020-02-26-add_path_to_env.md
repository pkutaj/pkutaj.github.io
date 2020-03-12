---
layout: post
title: PowerShell > update path environmental variables on the fly
---
## the case	
the question is, how to update enviromental variables with this script that it going to be put in the script folder to be called immediatelly from the console

## toc
<!-- TOC -->

- [validation attributes](#validation-attributes)
- [splitting the long string with -split](#splitting-the-long-string-with--split)
- [CODE](#code)
- [DEMO](#demo)
- [sources](#sources)

<!-- /TOC -->

## findings

### validation attributes
* there is a whole family of cmdlets for input validation
* [validateScript attribute]([about_Functions_Advanced_Parameters - PowerShell, Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced_parameters?view=powershell-7#validatescript-validation-attribute)) specifies a script used to validate the parameter
* example from MS docs
* note that the parameter `()` passed is a function in a code block `{}`, i.e. `[ValidateScript({script})]`

CODE                                       | COMMENT
-------------------------------------------|--------------------------------------------------------
1. `[ValidateScript({$_ -ge (Get-Date)})]` | test if passed parameter is equal of greater-than today

```powershell
Param(
    [Parameter(Mandatory=$true)]
    [ValidateScript({$_ -ge (Get-Date)})] #1
    [DateTime]
    $EventDate
)
```

### splitting the long string with -split
* as a form of immediate confirmation, the script should print the long `$env:path` and split it with each `;`
* the output is a long string

```
$env:path
C:\Ruby26-x64\bin;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\OpenSSH\;C:\Program Files\Git\cmd;C:\Program Files\nodejs\;C:\Program Files\Microsoft SQL Server\Client SDK\ODBC\130\Tools\Binn\;
```

* use `-split` parameter 

```
 $env:path -split ";"
C:\Ruby26-x64\bin
C:\Windows\system32
C:\Windows
C:\Windows\System32\Wbem
C:\Windows\System32\WindowsPowerShell\v1.0\
C:\Windows\System32\OpenSSH\
C:\Program Files\Git\cmd
C:\Program Files\nodejs\
C:\Program Files\Microsoft SQL Server\Client SDK\ODBC\130\Tools\Binn\
C:\Program Files (x86)\Microsoft SQL Server\140\Tools\Binn\
C:\Program Files\Microsoft SQL Server\140\Tools\Binn\
C:\Program Files\Microsoft SQL Server\140\DTS\Binn\
C:\Program Files (x86)\Microsoft SQL Server\150\DTS\Binn\
c:\Users\Admin\tools\
c:\Users\Admin\tools\
C:\Users\Admin\AppData\Local\Google\Chrome\Application\
C:\Program Files\dotnet\
C:\Program Files\Microsoft SQL Server\130\Tools\Binn\
C:\Program Files\Microsoft SQL Server\Client SDK\ODBC\170\Tools\Binn\
C:\Program Files\PowerShell\6\
```

* split the long string into an array based on a delimiter

CODE                                                             | COMMENT
-----------------------------------------------------------------|----------------------------------------------------------
1. `$updatedEnvPath = $env:path.Split(";")`                      | split the long string into an array
2. `$updatedEnvPath | % { write-host $_ -ForegroundColor cyan }` | print each item of an array into a console with new color

```powershell
Param (
    [Parameter (Mandatory = $true)]
    [ValidateScript ( { Test-Path $_ })]
    $NewPath
)
Begin {
    Clear-Host
} 
Process {
    Clear-Host
    $Reg = "Registry::HKLM\System\CurrentControlSet\Control\Session Manager\Environment"
    $OldPath = (Get-ItemProperty -Path "$Reg" -Name PATH).Path
    $EnvPath = $OldPath + ’;’ + $NewPath
    Set-ItemProperty -Path "$Reg" -Name PATH –Value $EnvPath -Confirm
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
    #START
    $updatedEnvPath = $env:path.Split(";")                      #1.
    $updatedEnvPath | % { write-host $_ -ForegroundColor cyan } #2.
    #END
} 

```

### CODE

```powershell
Param (
    [Parameter (Mandatory = $true)]
    [ValidateScript ( { Test-Path $_ })]
    $NewPath
)
Begin {
    Clear-Host
} 
Process {
    Clear-Host
    $Reg = "Registry::HKLM\System\CurrentControlSet\Control\Session Manager\Environment"
    $OldPath = (Get-ItemProperty -Path "$Reg" -Name PATH).Path
    $EnvPath = $OldPath + ’;’ + $NewPath
    Set-ItemProperty -Path "$Reg" -Name PATH –Value $EnvPath -Confirm
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
    $updatedEnvPath = $env:path.Split(";")
    write-host @"
you should find the new path below
———————————————————————————————————
"@ -ForegroundColor green
    $updatedEnvPath | % { write-host $_ -ForegroundColor cyan }
} 
``` 

### DEMO
![demoing_add_env_variable_to_path]({{ site.url }}/assets/2020-02-26-env-to-path.gif)

### sources
* [source_code]({{ site.url }}/assets/2020-02-26-add_path_to_env.ps1)
* [powershell - Validate file path parameter - Stack Overflow](https://stackoverflow.com/questions/33687756/validate-file-path-parameter)
* [How to update Windows PowerShell session environment variables from registry? - Stack Overflow](https://stackoverflow.com/questions/14381650/how-to-update-windows-powershell-session-environment-variables-from-registry)
* [PowerShell Basics: $Env:Path Environmental Variable -# Code Examples](https://www.computerperformance.co.uk/powershell/env-path/)
* [PowerTip: Use Here-Strings with PowerShell, Scripting Blog](https://devblogs.microsoft.com/scripting/powertip-use-here-strings-with-powershell/)
* [Using PowerShell to split a string into an array](https://www.sqlshack.com/powershell-split-a-string-into-an-array/)