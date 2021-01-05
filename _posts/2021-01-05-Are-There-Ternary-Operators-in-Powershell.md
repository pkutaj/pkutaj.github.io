---
layout: post
title: Are There Ternary Operators in Powershell
categories: [powershell]
---
## usecase
The concern is documenting the need to have a conditional assignment of value similar as in Javascript with ternary operators in the situation
where I need to have automatically created a folder name based on the current month, but have a leading zero for the first 9 months. 

<!-- TOC -->

- [1. usual if statement](#1-usual-if-statement)
- [2. ternary](#2-ternary)
- [CODE](#code)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. usual if statement

```powershell
$folder = If ($MM -lt 10) {"0$MM"} Else { "$MM"}
```

### 2. ternary
* implemented in posh 7 !

```powershell
$folder = ($MM -lt 10) ? "0$MM" : $MM
```

### CODE
* here is the code for the context

```powershell
## the concern is to create a markdown file situated into proper folder YYYY/mm-YYYY/YYYY-mm-dd.md with date of yesterday (my diary)

function new-kron {
    $oneDay = New-TimeSpan -Days 1
    $today = Get-Date
    $yyyy = $today.Year.toString()
    $MM = $today.Month.toString()
    $MM = ($MM -lt 10) ? "0$MM" : $MM # ternary operator
    $yesterday = ($today - $oneDay).ToString("yyyy-MM-dd")
    $kronFolder = "c:\Users\Admin\Documents\familia\kron\$yyyy\$MM-$yyyy\"
    $kronPost = "$kronFolder\$yesterday.md"
    
    if (Test-Path $kronPost) { 
        Invoke-Item $kronPost 
    }
    else {
        New-Item $kronPost
        Set-Content $kronPost -Value "### $yesterday"
        Invoke-Item $kronPost
    }

}
```

### 3. sources
* [Ternary operator in PowerShell - Stack Overflow](https://stackoverflow.com/questions/31341998/ternary-operator-in-powershell)
* [Getting Familiar with the Ternary Operator in PowerShell 7](https://toastit.dev/2019/09/25/ternary-operator-powershell-7/)
