---
layout: post
title: powershell > export registry key
categories: [powershell]
---
## the case	of an exported key
* the question is how to **QUICKLY EXPORT A REGISTRY KEY** without leaving home (terminal) 
* ideally also re-import it **SOMEWHERE ELSE** (it has recently solved one of the big puzzles for me)

## toc
<!-- TOC -->

- [sources](#sources)

<!-- /TOC -->

## findings
* since this seems to be installed for 32-bit solution
* the case is to move a registry key

STEP# | CODE                                             | COMMENT
------|--------------------------------------------------|---------------------------------------------------------------
1     | `cd hklm:\software\classes\outlook.application\` | goto the key (example path)
2     | `$key = (pwd).path.replace(":", "")`             | bind the key
3     | `$key | % {& reg export $_ "c:\key_export.reg"}` | pipe key to the foreach-object and call REG export
4     | `start code C:\temp\key_export.reg`              | open the `.reg` and replace the path in an editor
5     | edit the path                                    | in vscode / editor
6     | `invoke-item key_export.reg`                     | import the `.reg` by simply invoking in from the file explorer

### sources
* [windows - Powershell Export Multiple Keys To One .reg File - Stack Overflow](https://stackoverflow.com/questions/28076128/powershell-export-multiple-keys-to-one-reg-file)