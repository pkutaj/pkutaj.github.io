---
layout: post
title: powershell > service command family
categories: [powershell]
---
## overview

the aim of this document is to give an overview of the **SERVICE** family of powershell cmdlets

## toc
<!-- TOC -->

- [the -service command family](#the--service-command-family)
- [sources](#sources)

<!-- /TOC -->

## findings
### the -service command family
* 3 aliases
* 8 cmdlets in total
* use `gcm` for `get-command` and `gal` for `get-alias`
* see [the post on shared services for more info]({% post_url 2020-02-04-WIN-shared-services %})

COMMAND TYPE | NAME                  | MODULENAME
-------------|-----------------------|--------------------------------
1. Alias     | gsv -> Get-Service    |
2. Alias     | sasv -> Start-Service |
3. Alias     | spsv -> Stop-Service  |
-----------  |                       |
1. Cmdlet    | Get-Service           | Microsoft.PowerShell.Management
2. Cmdlet    | New-Service           | Microsoft.PowerShell.Management
3. Cmdlet    | Restart-Service       | Microsoft.PowerShell.Management
4. Cmdlet    | Resume-Service        | Microsoft.PowerShell.Management
5. Cmdlet    | Set-Service           | Microsoft.PowerShell.Management
6. Cmdlet    | Start-Service         | Microsoft.PowerShell.Management
7. Cmdlet    | Stop-Service          | Microsoft.PowerShell.Management
8. Cmdlet    | Suspend-Service       | Microsoft.PowerShell.Management

### sources
* [PowerTip: Use Get-Command to resolve PowerShell alias @ Scripting Blog](https://devblogs.microsoft.com/scripting/powertip-use-get-command-to-resolve-powershell-alias/)