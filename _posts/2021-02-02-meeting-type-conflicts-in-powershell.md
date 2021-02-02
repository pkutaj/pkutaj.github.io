---
layout: post
title: Type Conflicts and Dynamic Casting in Powershell
categories: [powershell]
---
## usecase
The concern is documenting a mistake in the following code that aimed at adding a leading zeroes to the first nine months of the year (1 → 01) 

```powershell
$today = Get-Date
    $yyyy = $today.Year.toString()
    $MM = $today.Month.toString()
    $MM = ($MM -lt 10) ? "0$MM" : $MM
```

<!-- TOC -->

- [1. dynamic casting](#1-dynamic-casting)
- [2. these are 13 powershell types](#2-these-are-13-powershell-types)
- [3. fix](#3-fix)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. dynamic casting
* You can specify the type of a variable before it to force its type. 
* It's called (dynamic) casting and cast notation

### 2. these are 13 powershell types

NR | type        | descriptino
---|-------------|----------------------------------------------
01 | [string]    | Fixed-length string of Unicode characters
02 | [char]      | A Unicode 16-bit character
03 | [byte]      | An 8-bit unsigned character
04 | [int]       | 32-bit signed integer
05 | [long]      | 64-bit signed integer
06 | [bool]      | Boolean True/False value
07 | [decimal]   | A 128-bit decimal value
08 | [single]    | Single-precision 32-bit floating point number
09 | [double]    | Double-precision 64-bit floating point number
10 | [DateTime]  | Date and Time
11 | [xml]       | Xml object
12 | [array]     | An array of values
13 | [hashtable] | Hashtable object

* From [Define PowerShell Data Types](https://ss64.com/ps/syntax-datatypes.html)


### 3. fix

```powershell 
$oneDay = New-TimeSpan -Days 1
    $today = Get-Date
    [string]$yyyy = $today.Year.toString()
    $MM = $today.Month
    $MM = ($MM -lt 10) ? "0" + [string]$MM : [string]$MM
```

* and note that 🠋  **is not working**
* the **cast operator** limits `$MM` to the `integer` type ans is not recast via the ternary operator to string even if forced

```powershell 
$oneDay = New-TimeSpan -Days 1
    $today = Get-Date
    [string]$yyyy = $today.Year.toString()
    [int]$MM = $today.Month
    $MM = ($MM -lt 10) ? "0" + [string]$MM : [string]$MM
```

* The [Types of variables](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_variables?view=powershell-7.1#types-of-variables) section of the official documentation is full of examples
* the true condition will not re-cast `$MM` within the ternary operator into a string

### 4. sources
* [Define PowerShell Data Types - ss64](https://ss64.com/ps/syntax-datatypes.html)
* [Types of variables - official docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_variables?view=powershell-7.1#types-of-variables)
