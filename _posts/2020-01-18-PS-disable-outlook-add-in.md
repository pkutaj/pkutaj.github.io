---
layout: post
title: PS > Disable Outlook Plugin (rough script)
---
## case
The question is how to temporarily change the value of `Loadbehavior` key of an Outlook plugin, temporarily disabling for particular scenarios. This example is for Dynamics CRM

## code
* very fast, very rough sketch, the initial version 0.1

```powershell
$CRMAddInKey = Get-Item HKCU:\SOFTWARE\Microsoft\Office\Outlook\Addins\crmaddin.Addin\
Set-ItemProperty $CRMAddInKey.PSPath -Name Loadbehavior -Value 0
$Outlook = Start-Process "C:\Program Files\Microsoft Office\Office15\OUTLOOK.EXE" -PassThru
do{sleep 1}while(Get-Process -Id $Outlook.Id -Ea SilentlyContinue)
Set-ItemProperty $CRMAddInKey.PSPath -Name Loadbehavior -Value 3
exit
```

## sources
* [How to Change the Load Behavior of the Dynamics CRM Outlook Client Add-In - proMX](https://promx.net/en/2016/12/how-to-change-the-load-behavior-of-the-dynamics-crm-outlook-client-add-in/)
 [Registry entries for VSTO Add-ins - Visual Studio - Microsoft Docs](https://docs.microsoft.com/en-us/visualstudio/vsto/registry-entries-for-vsto-add-ins?view=vs-2019#LoadBehavior)
* [How to Change the Load Behavior of the Dynamics CRM Outlook Client Add-In - proMX](https://promx.net/en/2016/12/how-to-change-the-load-behavior-of-the-dynamics-crm-outlook-client-add-in/)
* [Weekend Scripter: Use PowerShell to Easily Modify Registry Property Values - Scripting Blog](https://devblogs.microsoft.com/scripting/weekend-scripter-use-powershell-to-easily-modify-registry-property-values/)
* [PowerShell Noob..Change registry value Script - Spiceworks](https://community.spiceworks.com/topic/2242482-powershell-noob-change-registry-value-script)
* [Forcing PowerShell to Wait for a Process to Complete - IT Pro](https://www.itprotoday.com/powershell/forcing-powershell-wait-process-complete)
* [Powershell script doesn't wait on a process to finish - Stack Overflow](https://stackoverflow.com/questions/44522819/powershell-script-doesnt-wait-on-a-process-to-finish)/