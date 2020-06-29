---
layout: post
title: powershell > replacing values in a hashtable
categories: [powershell]
---
## abstract
The concern is documenting the replacement of `DarkRed` value in powershell — and thus getting to know to work with hashtables a bit better

```
Name                           Value
----                           -----
SessionInfoForegroundColor     White
GitDefaultColor                DarkGreen
PromptSymbolColor              White
VirtualEnvForegroundColor      Red
PromptBackgroundColor          Cyan
GitLocalChangesColor           DarkYellow
GitNoLocalChangesAndAheadColor DarkMagenta
PromptHighlightColor           Cyan
AdminIconForegroundColor       DarkYellow
GitForegroundColor             Black
GitNoLocalChangesAndBehindCol… DarkRed
WithForegroundColor            DarkRed
VirtualEnvBackgroundColor      Magenta
SessionInfoBackgroundColor     Black
PromptForegroundColor          Cyan
GitNoLocalChangesAndAheadAndB… DarkRed
DriveForegroundColor           Cyan
CommandFailedIconForegroundCo… DarkRed
WithBackgroundColor            Magenta
```

## video
## contents
<!-- TOC -->

- [1. def](#1-def)
- [2. hashtable property](#2-hashtable-property)
- [3. listing keys and values](#3-listing-keys-and-values)
- [4. change the value of a selected property](#4-change-the-value-of-a-selected-property)
- [5. replace value](#5-replace-value)
- [6. sources](#6-sources)

<!-- /TOC -->

### 1. def
* there are 2 types of properties
    * that are inherited from a specific dotnet object type
    * generic properties that are created by Powershell — **noteproperties**

```
▶ $ThemeSettings | gm


   TypeName: System.Management.Automation.PSCustomObject

Name                 MemberType   Definition
----                 ----------   ----------
Equals               Method       bool Equals(System.Object obj)
GetHashCode          Method       int GetHashCode()
GetType              Method       type GetType()
ToString             Method       string ToString()
Colors               NoteProperty hashtable Colors=System.Collections.Hashtable
CurrentHostname      NoteProperty string CurrentHostname=DESKTOP-LRK1G7U
CurrentThemeLocation NoteProperty string CurrentThemeLocation=C:\Users\Admin\Documents\PowerShell\Modules\oh-my-posh\2.0.440\Themes\Avit.psm1
CurrentUser          NoteProperty string CurrentUser=Admin
ErrorCount           NoteProperty int ErrorCount=0
GitSymbols           NoteProperty hashtable GitSymbols=System.Collections.Hashtable
MyThemesLocation     NoteProperty System.String MyThemesLocation=C:\Users\Admin\Documents\PowerShell\PoshThemes
Options              NoteProperty hashtable Options=System.Collections.Hashtable
PromptSymbols        NoteProperty hashtable PromptSymbols=System.Collections.Hashtable
```

### 2. hashtable property
* the Noteproperty can be various structure
* this one is a hashtable 

```
$ThemeSettings.Colors.getType()

IsPublic IsSerial Name                                     BaseType
-------- -------- ----                                     --------
True     True     Hashtable                                System.Object
```

### 3. listing keys and values
* you can list keys and values separately by `$fooHash.Keys` and `$fooHash.Values`
* in powershell, this functionality is specific to `hashtable` type and you should not use associative arrays as `PSObjects` or `PSCustomObjects` if you want to utilize that 
    * See <https://stackoverflow.com/a/50196654/11082684> for further elaboration of the subject

```
▶ $ThemeSettings.Colors.Keys
GitForegroundColor
AdminIconForegroundColor
...
▶ $ThemeSettings.Colors.Values
DarkYellow
Magenta
...
```

### 4. change the value of a selected property

```
$ThemeSettings.Colors.GitForegroundColor = "Cyan"
```

### 5. replace value
* use the following to change the value (color) into another one
* the example below replaces all "DarkRed" with "Cyan"
* **before:**

```
▶ $ThemeSettings.Colors

Name                           Value
----                           -----
DriveForegroundColor           Cyan
WithForegroundColor            DarkRed
Values                         {Cyan, DarkYellow, Magenta, Cyan…}
SessionInfoBackgroundColor     Black
SessionInfoForegroundColor     White
PromptSymbolColor              White
GitDefaultColor                DarkGreen
GitNoLocalChangesAndBehindCol… DarkRed
PromptForegroundColor          Cyan
GitNoLocalChangesAndAheadAndB… DarkRed
GitLocalChangesColor           DarkYellow
PromptHighlightColor           Cyan
WithBackgroundColor            Magenta
AdminIconForegroundColor       DarkYellow
GitForegroundColor             Cyan
VirtualEnvForegroundColor      Red
CommandFailedIconForegroundCo… DarkRed
VirtualEnvBackgroundColor      Magenta
GitNoLocalChangesAndAheadColor DarkMagenta
PromptBackgroundColor          Cyan
```

* Run

```
`$ThemeSettings.Colors.Values = $ThemeSettings.Colors.Values | % {$_ -replace "DarkRed", "Cyan"}`
```

* **after:** 

```
▶ $ThemeSettings.Colors

Name                           Value
----                           -----
PromptBackgroundColor          Cyan
VirtualEnvBackgroundColor      Magenta
AdminIconForegroundColor       DarkYellow
GitNoLocalChangesAndAheadAndB… DarkRed
GitNoLocalChangesAndAheadColor DarkMagenta
CommandFailedIconForegroundCo… DarkRed
VirtualEnvForegroundColor      Red
SessionInfoForegroundColor     White
GitLocalChangesColor           DarkYellow
DriveForegroundColor           Cyan
GitForegroundColor             Black
GitDefaultColor                DarkGreen
PromptForegroundColor          Cyan
Values                         {Cyan, Magenta, DarkYellow, Cyan…}
SessionInfoBackgroundColor     Black
WithForegroundColor            DarkRed
WithBackgroundColor            Magenta
PromptHighlightColor           Cyan
GitNoLocalChangesAndBehindCol… DarkRed
PromptSymbolColor              White
```

* you should consider then saving that hashtable within your `$profile`

### 6. sources
* [What is a PowerShell NoteProperty? - Stack Overflow](https://stackoverflow.com/questions/29141914/what-is-a-powershell-noteproperty)
* [Working with PowerShell's -replace Operator – Clear-Script – Joel (Sallow) Francis](https://vexx32.github.io/2019/03/20/PowerShell-Replace-Operator/)
* <https://stackoverflow.com/a/50196654/11082684>