---
layout: post
title: PowerShell > on registry without regedit
categories: [powershell]
---
## the case	of registry without regedit
* the question is, how to work with registry using powershell instead of gui
* the answer seems to be a set of cmdlets
    - [x] `get-childitem` ➔ `dir`
    - [x] `get-item` ➔ `gi`
    - [x] `get-itemproperty` ➔ `gp`
    - [x] `set-itemproperty` ➔ `sp` 

## toc
<!-- TOC -->

- [no dedicated set of registry-lookup-cmdlets](#no-dedicated-set-of-registry-lookup-cmdlets)
- [get-childitem -recurse: find registry value](#get-childitem--recurse-find-registry-value)
- [get-itemproperty: query properties for a given value](#get-itemproperty-query-properties-for-a-given-value)
- [get-item](#get-item)
- [set-itemproperty](#set-itemproperty)
- [sources](#sources)

<!-- /TOC -->

## findings
### no dedicated set of registry-lookup-cmdlets 
* The bad news is that there **AREN’T ANY CMDLETS** for working with the registry 
* There’s a **REGISTRY PROVIDER**, which means 
    * you can use the **ITEM AND ITEM-PROPERTY CMDLETS** to manage the local registry
    * but there aren’t any specific registry cmdlets associated with the provider.

### get-childitem -recurse: find registry value 
* still not per provider, however, but only per give ("drive" that is)
* You could retrieve all keys with `Get-ChildItem -Recurse` and then filter on key names with `Where-Object`.
* The Registry provider is a little different from the FileSystem provider
    * the Name property of each item is the entire key path (ie. `HKEY_LOCAL_MACHINE\Software\Microsoft` instead of just `Microsoft`). 
* You can use `PSChildName` to refer to the leaf name:
* You can suppress error messages from inaccessible keys with the `-ErrorAction SilentlyContinue` parameter argument with `Get-ChildItem`

```powershell
$searchString = "foobar" 
if(@(Get-ChildItem HKLM: -Recurse | Where-Object {$_.PSChildName -eq $searchString}))
{
  # Something was returned! Create the file
  New-Item C:\Candi\RebootRequired.txt -ItemType File
}
```

### get-itemproperty: query properties for a given value
* alias `gp`

```powershell
######################################################################
##
## Search-RegistryKeyValues.ps1
## Search the registry keys from the current location and down for a
## given key value.
##
######################################################################
param([string] $searchText = "00062FFF-0000-0000-C000-000000000046")

dir . -rec -ea SilentlyContinue | 
% { 
    if ((get-itemproperty -Path $_.PsPath) -match $searchText) { 
        $_.PsPath
    } 
}s
```

### get-item
* alias `gi`
    * from the family of `new-item` (`ni`) and `invoke-item` (`ii`)
* is like `get-childitem` but not listing children of a given node, but the actual, single node/object

```
PS HKLM:\SOFTWARE\WOW6432Node\SAP BusinessObjects\Suite XI 4.0\> gi '.\Crystal Reports\'

Hive: HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\SAP BusinessObjects\Suite XI 4.0

Name                           Property
----                           --------
Crystal Reports                Path                   : C:\Program Files (x86)\SAP BusinessObjects\Crystal Reports\
                               CommonFiles            : C:\Program Files (x86)\SAP BusinessObjects\SAP BusinessObjects Enterprise XI 4.0\win32_x86\
                               ChartSupportPath       : C:\Program Files (x86)\SAP BusinessObjects\Crystal Reports\ChartSupport\
                               BuildNum               : 1327
                               Version                : 14.0
                               ProductCode            : {714F0131-6905-46C7-9875-C87B8AA1740B}
                               DisableCheckForUpdates : 1
```

### set-itemproperty
* alias `sp`
* but you need to know it exists
* you'd have to elegantly navigate to the given key, and see properties and values listed side by side

```powershell
Set-ItemProperty '.\Crystal Reports\' -Name CommonFiles -Value "C:\Program Files (x86)\Business Objects\Common\3.5\bin\" -Verbose
```

### sources
* <https://stackoverflow.com/a/33640210/11082684>
* [How to Get, Edit, Create and Delete Registry Keys with PowerShell](https://blog.netwrix.com/2018/09/11/how-to-get-edit-create-and-delete-registry-keys-with-powershell/)