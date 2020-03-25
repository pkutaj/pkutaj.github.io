---
layout: post
title: powershell > & invocation (call) operator
categories: [powershell]
---
## the case	of the ampersand caller
* the question is what `&` is doing when used from the shell/script
* i know there is a lot more to it, this is just to make an initial sense of what this character means when reading scripts of others

## toc
<!-- TOC -->

- [MS Docs](#ms-docs)
- [sources](#sources)

<!-- /TOC -->

## findings
### MS Docs 
* **CALL OPERATOR:** `&` runs a command, script, or script block. 
* The call operator, also known as the **INVOCATION OPERATOR** lets you run commands that are stored in variables and represented by strings or script blocks. 
* This example stores a command in a string and executes it using the call operator.

```
PS> $c = "get-executionpolicy"
PS> $c
get-executionpolicy
PS> & $c
AllSigned
```

* The call operator **DOES NOT PARSE STRINGS**. 
* This means that you cannot use command parameters within a string when you use the call operator.
* Many times you can execute a command by just typing its name
    * This will only run if the command is in the environment path. 
    * This will only run if the command has no spaces

### sources
* <https://stackoverflow.com/a/42383116/11082684>
* [Call operator - Run - PowerShell - SS64.com](https://ss64.com/ps/call.html)