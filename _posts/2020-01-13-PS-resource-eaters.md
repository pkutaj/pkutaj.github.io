---
layout: post
title: PS > CPU and RAM resource eaters
last_modified_at: 
---
## the case	
The puzzle is to receive a list of 10 most CPU and RAM intensive processes and the ability to kill the application. Same session, fast. 

## toc
<!-- TOC -->

- [findings](#findings)
- [demo](#demo)
- [code](#code)
- [sources](#sources)

<!-- /TOC -->

### findings
* I call the `eaters.ps1` from `eaters.bat` file placed in the same folder with this snippet:

```powershell
start powershell -noexit "& "".\eaters.ps1"""; exit
```

### demo

![resource_eaters]({{ site.url }}/assets/2020-01-06-ps-resource-eaters.gif)

### code

```powershell
#PURPOSE: get a top10 of resource eaters (CPU+RAM) and provide an option to kill the app with a name
 
$menu = @"
Resource Eaters Checker
-------------------------------------
| 1 CHECK | 2 KILL | 3 QUIT |
-------------------------------------
> Select number and press Enter
"@
do {
 
$init = Read-Host $menu
switch ($init) {
"1" {
Write-Host "`nCPU Eaters"
Write-Host "----------"
Get-Process | Sort-Object -Property CPU -Descending | Select-Object -First 10 | Format-Table Id, ProcessName, CPU
Write-Host "`nRAM Eaters"
Write-Host "---------"
Get-Process | Sort-Object -Property WS -Descending | Select-Object -First 10 | Format-Table Id, ProcessName, WS
}
"2" {
$processName = Read-Host "What process would you like to kill (name, wildcards allowed!)?"
Stop-Process -Name $processName -Force
Write-Host "Terminated ;)" -ForegroundColor White -BackgroundColor Black
}
}
}
until ($init -eq "3")
```
### sources
* [https://superuser.com/questions/618686/private-bytes-vs-working-set-in-process-explorer/618811](https://superuser.com/questions/618686/private-bytes-vs-working-set-in-process-explorer/618811)
* [http://cybernetnews.com/cybernotes-windows-memory-usage-explained](http://cybernetnews.com/cybernotes-windows-memory-usage-explained)

