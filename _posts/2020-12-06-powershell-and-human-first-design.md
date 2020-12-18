---
layout: post
title: Powershell as exemple of Human-First Design that the new "Command Line Interface Guide" propagates
categories: [powershell]
---
## usecase
The concern is documenting just a combination of two articles I've recently encountered. One a general one, and second perferctly illustrating the general tenet. 

<!-- TOC -->

- [1. General](#1-general)
- [2. Applied](#2-applied)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. General

> Traditionally, UNIX commands were written under the assumption they were going to be used primarily by other programs. They had more in common with functions in a programming language than with graphical applications.

> Today, even though many CLI programs are used primarily (or even exclusively) by humans, a lot of their interaction design still carries the baggage of the past. It’s time to shed some of this baggage: if a command is going to be used primarily by humans, it should be designed for humans first.

— From [Command Line Interface Guidelines — Human first design](https://clig.dev/#human-first-design)

### 2. Applied
* this is from the gread Adam the Automator

>Set-Content is one of those core PowerShell cmdlets that I can’t do without. I still remember using VBscript before we could use PowerShell to write to a file. I remember always trying to remember what kind of object I needed to use and the method name. Was it FileSystemObject, FileObject or what? It was a pain! Even when I did recall the method name was CreateTextFile(), I’d always forget to add True as the second argument.

```vb
Set objFSO=CreateObject("Scripting.FileSystemObject")
outFile="c:\file.txt"
Set objFile = objFSO.CreateTextFile(outFile,True)
objFile.Write "test string"
objFile.Close
```

* this is that [1. General](#1-general) is talking about
* hunan-first design gives you this logic

```powershell
Set-Content -Path 'C:\boo.txt' -Value 'bar'
```

### 3. sources
* [Set-Content: The PowerShell Way to Write to a File](https://adamtheautomator.com/powershell-write-file-set-content/)
* [Command Line Interface Guidelines — Human first design](https://clig.dev/#human-first-design)
