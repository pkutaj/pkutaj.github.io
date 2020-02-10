---
layout: post
# title: PS > on modules
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

### USE-CASE: importing a dll as a binary module and looking for a certain member within 
* from the context of .NET troubleshooting / debugging

#### STEP-1 IMPORT MODULE
* use `dir` to import each one in a folder 
* use `import-module` 

```powershell
foreach ($module in Get-Childitem $modulesFolder -Name -Filter "*.psm1")
{
    Import-Module $modulesFolder\$module
}
```

#### STEP-2 SEARCH FOR A MEMBER

CODE                                               | COMMENT
---------------------------------------------------|------------------------------------------------------
1. `(Get-Module...`                                | the main cmdlet grabbing the imported module
2. `...Pivotal.Engine.Client.Services.Interfaces)` | the name of the module
3. `ImplementingAssembly.DefinedTypes`             | the combinatino of methods that list the existing one

```powershell
(Get-Module Pivotal.Engine.Client.Services.Interfaces).ImplementingAssembly.DefinedTypes
```

* [ImplementingAssembly: Find PowerShell Classes in Modules - SAPIEN Information Center | SAPIEN Information Center](https://info.sapien.com/index.php/scripting/scripting-classes/implementingassembly-find-powershell-classes-in-modules)

##### On ImplementingAssembly
* ImplemetingAssembly is a property of the PSModuleInfo object that Get-Module returns. It was added in PowerShell 5.0.
* The ImplementingAssembly property value is a System.Reflection.Emit.AssemblyBuilder object that represents a dynamic assembly. The AssemblyBuilder class is in the System.Reflection namespace, which contains types that get information about managed code by examining the code metadata; a bit like the PowerShell AST.
* ImplementingAssembly is populated only for script modules and binary modules. It is null on manifest modules and it does not capture classes defined in nested modules.
* ImplementingAssembly is also null until a module is imported into the session.

#### STEP-3 REMOVE-MODULE
* use `remove-module` to disconnect the omdule fro mthe current session
