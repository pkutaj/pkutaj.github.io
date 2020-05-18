---
layout: post
title: powershell > multiline commands
categories: [powershell]
---
## the case	of a multiliner
the question is that of an elegant interaction, i.e. not having to write long commands in a single line

the answer is don't use backticks, try splatting and rely on natural line continuators like a pipeline operator or scriptblock operator (and many others)

## toc
<!-- TOC -->

- [(1) backtick](#1-backtick)
    - [when to use](#when-to-use)
- [(2) splatting](#2-splatting)
- [(3) natural line continuation](#3-natural-line-continuation)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) backtick
* a cmdlet ` Get-ChildItem -Path $env:windir -Filter *.dll -Recurse` can be made a little more readable by breaking up long lines with PowerShell’s escape character:

* backtick is the escape character in powershell

```powershell
PS C:\> Get-ChildItem `
  -Path $env:windir `
  -Filter *.dll `
  -Recurse
```

> In general, the community feels you should avoid using those backticks as "line continuation characters" when possible.

— [Readability · PowerShell Practice and Style](https://poshcode.gitbooks.io/powershell-practice-and-style/Style-Guide/Readability.html)

- [x] hard to read
- [x] easy to miss
- [x] easy to mistype

#### when to use
* when needing to split line on several cmdlet arguments, not piping, not using script blocks, but say copying the content of an entire folder (files and subfolders) 
* this is just for the "personal hygiene", not communicating with another person (this is not code, this is an interactive shell where I just communicate with myself)

```
PS C:\Users\Admin> copy -Path .\source\repos\dataIntoArray\ `
>> -Destination .\Documents\workspace\c#\dataIntoArray\ `
>> -Recurse `
>> -Force `
>> -Verbose
```

### (2) splatting

```powershell
$GetWmiObjectParams = @{
    Class = "Win32_LogicalDisk"
    Filter = "DriveType=3"
    ComputerName = "SERVER2"
}
Get-WmiObject @GetWmiObjectParams
``` 

### (3) natural line continuation
> These are parts of the PowerShell language that naturally allow you to continue on to the next line without any special character or consideration.

—  [Bye Bye Backtick: Natural Line Continuations in PowerShell](https://get-powershellblog.blogspot.com/2017/07/bye-bye-backtick-natural-line.html)

* highly compatible with [K&R indentation / 1TBS](https://en.wikipedia.org/wiki/Indentation_style#Variant:_1TBS_(OTBS)) 

* in the following, I am utilizing **SCRIPTBLOCK OPERATOR** `{}` and **PIPELINE OPERATOR** `|`

```powershell
PS C:\Users\Admin\Downloads> dir |
>> sort LastWriteTime -Descending |
>> select -First 3 |
>> % {
>> mi $_.FullName "C:\Users\Admin\Documents\Zoom\2185596"
>> }
```

* i am just copying the last 3 downloaded files into its ticket-folder

### sources
* [Bye Bye Backtick: Natural Line Continuations in PowerShell](https://get-powershellblog.blogspot.com/2017/07/bye-bye-backtick-natural-line.html)
* [Readability · PowerShell Practice and Style](https://poshcode.gitbooks.io/powershell-practice-and-style/Style-Guide/Readability.html)