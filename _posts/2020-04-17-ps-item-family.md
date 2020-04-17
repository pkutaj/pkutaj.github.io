---
layout: post
title: powershell > the -ITEM family
categories: [powershell]
---
## the case	of the work with items
* the question is, how many cmdlets are there ready to work with items, some of the aliases and the concept of an item, basically. 
* **ITEM** is usually a file/registry object...or any other namespace **OBJECT**
* PowerShell is an **OBJECT BASED SHELL**, using cmdlets and pipelines to either interactivelly manage the environment or to write scripts and schedule them for execution

**NO** | **CMDLET**            | **ALIAS**
-------|-----------------------|-----------------------------
01.    | Clear-Item            | cli -> Clear-Item
02.    | Clear-ItemProperty    | clp -> Clear-ItemProperty
03.    | Copy-Item             | copy -> Copy-Item
04.    | Copy-ItemProperty     | cpp -> Copy-ItemProperty
05.    | Get-ChildItem         | dir -> Get-ChildItem
06.    | Get-Item              | gi -> Get-Item
07.    | Get-ItemProperty      | gp -> Get-ItemProperty
08.    | Get-ItemPropertyValue | gpv -> Get-ItemPropertyValue
09.    | Invoke-Item           | ii -> Invoke-Item
10.    | Move-Item             | mi -> Move-Item
11.    | Move-ItemProperty     | mp -> Move-ItemProperty
12.    | New-Item              | ni -> New-Item
13.    | New-ItemProperty      |
14.    | Remove-Item           | del -> Remove-Item
15.    | Remove-ItemProperty   | rp -> Remove-ItemProperty
16.    | Rename-Item           | ren -> Rename-Item
17.    | Rename-ItemProperty   | rnp -> Rename-ItemProperty
18.    | Set-Item              | si -> Set-Item
19.    | Set-ItemProperty      | sp -> Set-ItemProperty