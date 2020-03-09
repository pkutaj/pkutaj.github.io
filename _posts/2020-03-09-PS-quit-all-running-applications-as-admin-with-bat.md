---
layout: post
title: PS > terminate all running applications (flush!)
---
## the case	
* the question is, how to quit all running applications
    * with the help of a batch file
    * running from elevated prompt
    * using powershell

## toc
<!-- TOC -->

- [run as admin from powershell](#run-as-admin-from-powershell)
- [run as admin from command line](#run-as-admin-from-command-line)
- [put it to the start-menu](#put-it-to-the-start-menu)
- [CODE](#code)
- [souces](#souces)

<!-- /TOC -->

## findings
### run as admin from powershell

```powershell
Start-Process PowerShell -Verb RunAs "-Command `"cd '$pwd'; & 'PathToPS1File';`""
```

### run as admin from command line

```bat
powershell.exe -Command Start-Process PowerShell -ArgumentList '-File C:\demo\MyScript.ps1'
```

### put it to the start-menu
* create a shortcut of the `.bat file`
* move it to `C:\ProgramData\Microsoft\Windows\Start Menu`
* find in the start menu
* pin to start

### CODE

CODE                                                                  | COMMENT
----------------------------------------------------------------------|-----------------------------------------------------------------------------------------
1. `gps | ...`                                                        | get all running processes
2. `... | ? {$_.MainWindowTitle} | ...`                               | filter for applications by checking which of them was main windows title property
3. `... | ... | % {if($_.ProcessName -ne "powershell") {kill $_.Id}}` | test if it is not powershell, kill all except powershell (to avoid killing this process)
4. `kill -n explorer`                                                 | restart explorer (not included in the above point)
5. `write-host $outro`                                                | write outro message / ASCUU art
6. `pause`                                                            | press any key to continue...
7. `exit`                                                             | kill powershell as well finally

```powershell
<# POWERSHELL FILE#>
$outro = @"

_|___|__                                                
___|___|     all applications were terminated                   
_|___|__                                                
___|___|___|___|___|___|___|___|___|___|___|___|__                    
_|___|___|___|___|___|___|___|___|___|___|___|___|                    

"@
gps | ? {$_.MainWindowTitle} | % {if($_.ProcessName -ne "powershell") {kill $_.Id}} #1-3
kill -n explorer        #4
write-host $outro       #5
pause                   #6
exit                    #7
```

```bat
<!-- BAT FILE -->
REM start powershell -noexit "& "".\flush_please.ps1"""; exit
powershell.exe -Command Start-Process PowerShell -ArgumentList '-File "C:\Users\pivadm\Documents\pavol.kutaj\flush_please.ps1"' -Verb RunAs
```

### souces
* [windows - How to start PowerShell script from BAT file with proper Working Directory? - Stack Overflow](https://stackoverflow.com/questions/44284964/how-to-start-powershell-script-from-bat-file-with-proper-working-directory/57033941#57033941)
* [Q. How do I add an item to the Start menu for all users in Windows 7 and Windows Vista?](https://www.itprotoday.com/windows-78/q-how-do-i-add-item-start-menu-all-users-windows-7-and-windows-vista)
* [Restart File Explorer – 4sysops](https://4sysops.com/archives/restart-file-explorer/)
* [Powershell.exe - PowerShell - SS64.com](https://ss64.com/ps/powershell.html)
* <https://stackoverflow.com/a/57033941/11082684>