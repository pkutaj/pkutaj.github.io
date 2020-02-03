---
layout: post
title: PS > on modules
---
## the case	
the question is, how to get overview of Powershell modules
## findings

* Modules are collections of cmdlets that are stored in the path `%WINDIR%\System32\WindowsPowerShell`\.
* Get a List of Windows PowerShell Modules
* You can execute the following command to display the location of each directory where these modules are exactly stored at your computer:
    * `write-host "$PSModulePath"`
* You can get a list of all available modules on your computer by executing the following command:
    * `Get-Module -ListAvailable`
* There are few modules loaded for basic management tasks. To check which modules are loaded into PowerShell, execute the following command:
    * `Get-Module -All`
* You can load a particular module by executing the following command:
    * `Import-Module -Name ModuleName`
* To list commands in a particular module, execute the following command:
    * `Get-Command -Module ModuleName`

```
PS C:\Users\cgreen> get-module -all

ModuleType Version    Name                                ExportedCommands
---------- -------    ----                                ----------------
Binary     3.0.0.0    Microsoft.PowerShell.Commands.Ma... {Add-Content, Clear-Content, Clear-ItemProperty, Join-Path...}
Binary     3.0.0.0    Microsoft.PowerShell.Commands.Ut... {Get-FormatData, Export-FormatData, Format-List, Format-Custom...}
Manifest   3.1.0.0    Microsoft.PowerShell.Management     {Add-Computer, Add-Content, Checkpoint-Computer, Clear-Content...}
Manifest   3.0.0.0    Microsoft.PowerShell.Security       {ConvertFrom-SecureString, ConvertTo-SecureString, Get-Acl, Get-AuthenticodeSignature...}
Binary     3.0.0.0    Microsoft.PowerShell.Security.dll   {Get-Acl, Set-Acl, Get-PfxCertificate, Protect-CmsMessage...}
Script     0.0        Microsoft.PowerShell.Utility        {Get-FileHash, GetStreamHash}
Manifest   3.1.0.0    Microsoft.PowerShell.Utility        {Add-Member, Add-Type, Clear-Variable, Compare-Object...}
Script     0.2.0      PowerShellEditorServices.Commands   {ConvertFrom-ScriptExtent, ConvertTo-ScriptExtent, Find-Ast, Get-Token...}
Script     0.2.0      PowerShellEditorServices.VSCode     {Close-VSCodeHtmlContentView, New-VSCodeHtmlContentView, Set-VSCodeHtmlContentView, Show-VSCodeHtml...
Script     1.0        tmp_jldvvejd.mbo                    {Add-DistributionGroupMember, Add-MailboxFolderPermission, Approve-ElevatedAccessRequest, Clear-Act...


PS C:\Users\cgreen> Get-Command -Module tmp_jldvvejd.mbo

CommandType     Name                                               ModuleName
-----------     ----                                               ----------
Function        Add-DistributionGroupMember                        tmp_jldvvejd.mbo
Function        Add-MailboxFolderPermission                        tmp_jldvvejd.mbo
Function        Approve-ElevatedAccessRequest                      tmp_jldvvejd.mbo
Function        Clear-ActiveSyncDevice                             tmp_jldvvejd.mbo
Function        Clear-MobileDevice                                 tmp_jldvvejd.mbo
Function        Clear-TextMessagingAccount                         tmp_jldvvejd.mbo
Function        Compare-TextMessagingVerificationCode              tmp_jldvvejd.mbo
Function        Deny-ElevatedAccessRequest                         tmp_jldvvejd.mbo
Function        Disable-App                                        tmp_jldvvejd.mbo
Function        Disable-InboxRule                                  tmp_jldvvejd.mbo
Function        Disable-SweepRule                                  tmp_jldvvejd.mbo
```