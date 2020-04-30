---
layout: post
title: powershell > advanced functions
categories: [powershell]
---
## the case	of advanced functions
the question is advanced function — definition, activation, benefits, difference, etc.

## toc
<!-- TOC -->

- [benefits of advanced functions](#benefits-of-advanced-functions)
- [the activation of advanced functions](#the-activation-of-advanced-functions)
- [simple vs advanced](#simple-vs-advanced)
    - [simple](#simple)
    - [advanced](#advanced)
- [sources](#sources)

<!-- /TOC -->

## findings
* There are two types of functions in PowerShell
    * Basic functions
    * Advanced functions

### 4 benefits of advanced functions

B# | BENEFIT                   | COMMENT
---|---------------------------|------------------------------------------------------------------------------------
1. | output control            | verbose, warning, debug, error
2. | advanced parameters       | use validate sets
3. | pipeline input acceptance | attach the output to the pipeline
4. | a safety net              | `-whatif` and `-confirm`
5. | build your cmdlets        | [2020-05-01-PS-create-own-cmdlets]({% post_url 2020-05-01-PS-create-own-cmdlets %})

### the activation of advanced functions
* 2 ways
    * add `[CmdletBinding()]` attribute
    * add `[Parameter]` attribute

### simple vs advanced
#### simple
* Avoid using the `return` keyword — just enter the name of an object to be returned
* Just place the object variable on its own.
* Leave a space between the function name and the parameters.
* Use **PascalCase**

```powershell
function MyFunction ($param1, $param2) {
    ...  
}
```

#### advanced
- [x] use `[CmdletBinding()]` at it initializes the advanced function
- [x] use **HYPHEN-FORMATTING** for naming, e.g. `Get-Logs` 
- [x] use `Get-Verb` cmdlet for the list of approved verbs
- [x] use PascalCase for combined nouns, e.g. `Get-ZendeskLogs`
- [x] return object within `Process{}`; 
    * not in `Begin{}`
    * not in `End{}`
- [x] avoid parameter validation in the body of the function 🠊 use **PARAMETER VALIDATION 
ATTRIBUTES**

```powershell
function Start-Recording {
    [CmdletBinding()]
    param (
        [string]$filePath
    )
```

### sources
* [Function Structure · PowerShell Practice and Style](https://poshcode.gitbooks.io/powershell-practice-and-style/Style-Guide/Function-Structure.html)
