---
layout: post
title: KATA > PowerShell > if online, disable a particular Outlook add-in
categories: [powershell]
---
## the case	
the aim of the exercise is to write a script that checks the online status (online/offline) and based on that disables a particular outlook add-in. the example provided is the pivotal crm outlook integration

## toc
<!-- TOC -->

- [CODE](#code)
- [sources](#sources)

<!-- /TOC -->

## findings

### CODE
```powershell
<# 
 # The Aim of the code should be to set the key before the execution of the program and set it back after program finishes 
 #>
<# INITS #>
$pivotalOutlookAddInKey = "HKCU:\SOFTWARE\Microsoft\Office\Outlook\Addins\CdcSoftware.Pivotal.Office.Pim.Outlook.Version2010.Addin.Solution\"
$pivotalOutlookAddInProperty = "LoadBehaviour"
$pivotalOutlookAddInValue_Disabled = 0
$pivotalOutlookAddInValue_Enabled = 3
$GoogleIPtoCheckConnectivity = "8.8.8.8";
[Bool]$online
[Bool]$connected_to_intranet

<# MAIN FUNCTION #>
function disablePivotalAddin_if_offline($connected_to_intranet) {
    if ($connected_to_intranet) {
        Set-ItemProperty $pivotalOutlookAddInKey -name $pivotalOutlookAddInProperty -value $pivotalOutlookAddInValue_Enabled
        Write-Host "you are online; the add-in is enabled"
    }
    else {
        Set-ItemProperty $pivotalOutlookAddInKey -name $pivotalOutlookAddInProperty -value $pivotalOutlookAddInValue_Disabled
        Write-Host "you are OFFLINE; the add-in is DISABLED"
    }
}

<# THE BOOLEAN-RETURNING LAMBDA #>
function checkIntranetStatus {
    $online = Test-Connection $GoogleIPtoCheckConnectivity  -count 1 -quiet
    if ($online -ne $True) {
        return $False
    }
    else { return $True }
    
}

<# FUNCTION CALL WITH THE LAMBDA AS A PARAMETER #>
disablePivotalAddin_if_offline(checkIntranetStatus)
```

### sources
* [How to Change the Load Behavior of the Dynamics CRM Outlook Client Add-In - proMX](https://promx.net/en/2016/12/how-to-change-the-load-behavior-of-the-dynamics-crm-outlook-client-add-in/)
 [Registry entries for VSTO Add-ins - Visual Studio - Microsoft Docs](https://docs.microsoft.com/en-us/visualstudio/vsto/registry-entries-for-vsto-add-ins?view=vs-2019#LoadBehavior)
* [How to Change the Load Behavior of the Dynamics CRM Outlook Client Add-In - proMX](https://promx.net/en/2016/12/how-to-change-the-load-behavior-of-the-dynamics-crm-outlook-client-add-in/)
* [Weekend Scripter: Use PowerShell to Easily Modify Registry Property Values - Scripting Blog](https://devblogs.microsoft.com/scripting/weekend-scripter-use-powershell-to-easily-modify-registry-property-values/)
* [PowerShell Noob..Change registry value Script - Spiceworks](https://community.spiceworks.com/topic/2242482-powershell-noob-change-registry-value-script)
* [Forcing PowerShell to Wait for a Process to Complete - IT Pro](https://www.itprotoday.com/powershell/forcing-powershell-wait-process-complete)
* [Powershell script doesn't wait on a process to finish - Stack Overflow](https://stackoverflow.com/questions/44522819/powershell-script-doesnt-wait-on-a-process-to-finish)/
* [What is the Best IP address to Ping to Test my Internet Connection ? - EtherealMind](https://etherealmind.com/what-is-the-best-ip-address-to-ping-to-test-my-internet-connection/)
* [Test-NetConnection vs. Test-Connection – Testing a network connection with PowerShell – 4sysops](https://4sysops.com/archives/test-netconnection-vs-test-connection-testing-a-network-connection-with-powershell/)
* [Test-Connection](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/test-connection?view=powershell-7)