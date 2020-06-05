---
layout: post
title: powershell > force-load outlook addin
categories: [powershell]
---
## the case	of keeping addin active
* the question is, how to keep a selected addin active and, optionally, remove the option to keep it enabled
* heavy inspirations and great thanks go to [Outlook’s slow add-ins resiliency logic and how to always enable slow add-ins – Developer Support for Messaging @ Microsoft CSS](https://developermessaging.azurewebsites.net/2017/08/02/outlooks-slow-add-ins-resiliency-logic-and-how-to-always-enable-slow-add-ins/)

## toc
<!-- TOC -->

- [sources](#sources)
- [forcing addin to load](#forcing-addin-to-load)
- [getting the outlook/office version](#getting-the-outlookoffice-version)
    - [STEP-1 list all properties of the curver key](#step-1-list-all-properties-of-the-curver-key)
    - [STEP-2 get the value of (default) property](#step-2-get-the-value-of-default-property)
    - [STEP-3 remove "Outlook.Application."](#step-3-remove-outlookapplication)
    - [STEP-4 mapping to the version numbers (FYI)](#step-4-mapping-to-the-version-numbers-fyi)
- [CODE](#code)

<!-- /TOC -->

## findings
### sources
* [Outlook’s slow add-ins resiliency logic and how to always enable slow add-ins – Developer Support for Messaging @ Microsoft CSS](https://developermessaging.azurewebsites.net/2017/08/02/outlooks-slow-add-ins-resiliency-logic-and-how-to-always-enable-slow-add-ins/)

* [zipped_code]({{ site.url }}/assets/2020-03-23-force-addin-load.zip)
* [source_code]({{ site.url }}/assets/2020-03-23-force-addin-load.ps1)

### forcing addin to load
* in the key  `HKCU:\Software\Policies\Microsoft\Office\<$OUTLOOKVERSION.>0\Outlook\Resiliency\AddinList"`
    * the property is the name of an addin
    * allow a user to toggle: value `2`
    * do not allow a user to turn the addin on/off: value `1`
* see the example of the Codeplex.BackupAddIn below

```language
Hive: HKEY_CURRENT_USER\Software\Policies\Microsoft\Office\16.0\Outlook\Resiliency

Name         Property
----         --------
AddinList    UCAddin.LyncAddin.1             : 1
             UmOutlookAddin.FormRegionAddin  : 2
             Codeplex.BackupAddIn            : 1
```

![cannot_disable_addin]({{ site.url }}/assets/img000600.png)

### getting the outlook/office version
* `(Get-ItemProperty HKLM:\SOFTWARE\Classes\Outlook.Application\CurVer)."(default)".Replace("Outlook.Application.", "")`

#### STEP-1 list all properties of the curver key
* `Get-ItemProperty HKLM:\SOFTWARE\Classes\Outlook.Application\curver\`

```
(default)    : Outlook.Application.16
PSPath       : Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Outlook.Application\curver\
PSParentPath : Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Outlook.Application        
PSChildName  : curver
PSDrive      : HKLM
PSProvider   : Microsoft.PowerShell.Core\Registry
```

#### STEP-2 get the value of (default) property
* `(gp HKLM:\SOFTWARE\Classes\Outlook.Application\curver\)."(default)"`

```
Outlook.Application.16
```

#### STEP-3 remove "Outlook.Application."
* use the `replace()`
* `(Get-ItemProperty HKLM:\SOFTWARE\Classes\Outlook.Application\CurVer)."(default)".Replace("Outlook.Application.", "")`

```
16
```

#### STEP-4 mapping to the version numbers (FYI)

Version Name | Version Number | Release Date
-------------|----------------|-------------------
Office 2010  | 14.0           | June 15, 2010
Office 2013  | 15.0           | January 29, 2013
Office 2016  | 16.0           | September 22, 2015
Office 2019  | 16.0           | September 24, 2018

### CODE

```powershell
function disableResiliency {
    param(
        [Parameter(Mandatory = $true)]
        [string]$AddinName,
        [Parameter(Mandatory = $false)]
        [switch]$Force,
        [Parameter(Mandatory = $false)]
        [switch]$AllowUserControl
    )

    $AddinList = $null
    $CrashingAddinList = $null
    $DoNotDisableAddinList = $null

    function Get-Key
    (
        [string]$ParentKey,
        [string]$KeyName) {
        for ($i = 0; $i -lt $KeyName.Split("\").Count; $i++) {
            try {
                $Key = Get-Item -Path ("{0}:\{1}" -f $ParentKey, ($KeyName.split("\")[0..$i] -join "\"))
            }
            catch {
                $Key = New-Item -Path ("{0}:\{1}" -f $ParentKey, ($KeyName.split("\")[0..$i] -join "\"))
            }
        }
        return $Key
    }

    $ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop
    $OutlookVersion = GetOutlookVersion

    if ($Force) {
        $checkPoint = $null
    }
    else {
        try {
            $CheckPoint = (Get-Item "HKCU:\Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency" | Get-ItemProperty)."CheckPoint" -eq 1
        }
        catch {
            $checkPoint = $false
        }
    }

    if (-not $checkPoint) {
        if ($AllowUserControl.IsPresent) {
            Get-Key -ParentKey HKCU -KeyName "Software\Policies\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\AddinList" | Set-ItemProperty -Name $AddinName -Value "2"
        }
        else {
            Get-Key -ParentKey HKCU -KeyName "Software\Policies\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\AddinList" | Set-ItemProperty -Name $AddinName -Value "1"
        }
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\DoNotDisableAddinList" | Set-ItemProperty -Name $AddinName -Value 1
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\DisabledItems" | Remove-Item
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\DisabledItems" | Out-Null
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\CrashingAddinList" | Remove-Item
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\CrashingAddinList" | Out-Null
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\NotificationReminderAddinData" | Set-ItemProperty -Name ([string]::Format("{0}\dtype", $AddinName)) -Value 2
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\NotificationReminderAddinData" | Set-ItemProperty -Name $AddinName -Value 2524611661
        Get-Item "HKCU:\Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency" | Set-ItemProperty -Name "CheckPoint" -Value 1
    }
}

function GetOutlookVersion {
    return (Get-ItemProperty HKLM:\SOFTWARE\Classes\Outlook.Application\CurVer)."(default)".Replace("Outlook.Application.", "")
}

function listOutlookAddins {
    $OutlookVersion = GetOutlookVersion
    $outlookAddinKeys = "HKCU:\SOFTWARE\Microsoft\Office\$OutlookVersion.0\Outlook\Addins"
    $numberedAddins = $outlookAddinKeys | % { Get-ChildItem -Path $_ | 
            % { Get-ItemProperty -Path $_.PSPath } | 
            Select-Object @{n = "Name"; e = { Split-Path $_.PSPath -leaf } } } | 
            Sort-Object -Unique -Property name
$numberedAddins | ForEach-Object -Begin { $index = 0 } -Process {
    Add-Member -InputObject $_ -MemberType NoteProperty -Name Number -Value (++$index)
}
$numberedAddins | Out-String | Write-Host
$selectedKey = Read-Host "Enter the Number of an Addin you would like to force-enable"
$AddinName = $numberedAddins.Name[$selectedKey - 1]
return $AddinName
}

function getAddins {
    Write-Host "The list of the detected Outlook Addins" -Foregroundcolor cyan
    $AddinName = listOutlookAddins;
    $usercontrol = Read-Host "Would you like to allow the user to disable the addin in Outlook? (y/n)"
    if($usercontrol -eq "y") {disableResiliency -AddinName $AddinName -AllowUserControl -Force;}
    if($usercontrol -eq "n") {disableResiliency -AddinName $AddinName -Force;}
    Write-Host "Run Outlook and see if the Addin loads properly" -Foregroundcolor cyan
    Pause
}

getAddins
```

