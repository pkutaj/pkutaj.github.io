---
layout: post
title: PowerShell > setting permissons to a folder + ascii art 
---
## the case	
The puzzle is how to make a Powershell intriguing utility by the use of ’spices’ (which is, for better or for worse 'ornaments') and to make the input elegant by using the built-in mandatory function feature that is robust enough as to prompt the user for the input without any extra code. That means we have to use semantic bindings. The illustrative function is to set permissions (set-acl cmdlet) to a folder via assigning there an AD security group. The domain is looked-up automatically.

## toc
<!-- TOC -->

- [the demo](#the-demo)
- [the code](#the-code)
- [sources](#sources)

<!-- /TOC -->

### the demo

![setting_permissions_demo]({{ site.url }}/assets/2020-01-06-PS-settig-permissions.gif)

### the code 
```powershell
<# -/-/-/-/-/-/-/-/   R E A D M E   -/-/-/-/-/-/-/-/-/-/-/-/-/-
# PERMISSION SETTER
## PURPOSE
To set the access rights to a given user, but without any inheritance

## TOC
STEP | ACTION
-----|-----------------------------------------
#1   | DEFINE VISUALS
#2   | DEFINE MANDATORY PARAMETERS
#2.1 | GET PATH
#2.2 | GET SECURITY GROUP
#3   | ASSIGN PERMISSIONS
#4   | CALL THE FUNCTION WITH THE INFINITE LOOP
  
   #>   
<#-/-/-/-/-/-/-/-/   C O D E   -/-/-/-/-/-/-/-/-/-/-/-/-/-/-#>
  
#1    | DEFINE VISUALS, FOLD FOR THE READIBILITY OF CODE
$intro = @"

 / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \_
/ /  \ \____/ /  \ \____/ /  \ \____/ /  \ \____/ /  \ \____/ /  \ \__
\ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / _
 \____/ /  \ \____/ /                                _/ /  \ \____/ /
 / __ \ \__/ / __ \ \_   FOLDER PERMISSION SETTER     \ \__/ / __ \ \_
/ /  \ \____/ /  \ \__   POPULATE THE PARAMETERS     \ \____/ /  \ \__
\ \__/ / __ \ \__/ / _   ... OR LEAVE EMPTY TO QUIT  / / __ \ \__/ / _
 \____/ /  \ \____/ /                                _/ /  \ \____/ /
 / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \_
/ /  \ \____/ /  \ \____/ /  \ \____/ /  \ \____/ /  \ \____/ /  \ \__
\ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / _
 \____/ /  \ \____/ /  \ \____/ /  \ \____/ /  \ \____/ /  \ \____/ /
/ __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \_

"@

$outro = @"

 / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \_
/ /  \ \____/ /  \ \____                      __/ /  \ \____/ /  \ \__
\ \__/ / __ \ \__/ / __         BYE-BYE       _ \ \__/ / __ \ \__/ / _
 \____/ /  \ \____/ /  \                       \ \____/ /  \ \____/ /
/ __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \_

"@

$errorMessage = @"

 / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \_
/ /  \ \____/ /  \ \___                         / /  \ \____/ /  \ \__
\ \__/ / __ \ \__/ / __  CHECK ERRORS AND RETRY \ \__/ / __ \ \__/ / _
 \____/ /  \ \____/ /  \                         \____/ /  \ \____/ /
 / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \__/ / __ \ \_

"@

#2 DEFINE MANDATORY PARAM WITHIN THE FUNCTION
function Set_folder_permission {
   param (
       #2.1 GET PATH
       [Parameter (Mandatory = $true)][AllowEmptyString()][string]$file_path,
       #2.2 GET SECURITY GROUP
       [Parameter (Mandatory = $true)][AllowEmptyString()][string]$AD_security_group
   )

   If ($file_path -eq "") {
       cls
       Write-Host $outro -ForegroundColor Cyan
       pause
       exit
   }

   $rights_assigned = @"
  ____    
 / __ \ 
/ /  \ \ MODIFY ACCESS                            
\ \__/ / WAS GRANTED                                                                     
 \____/ 

Group: $AD_security_group
Path: $file_path

"@

#3 ASSIGN THE PERMISSION
   try {
       $domain = Get-ADDomain
       $AD_security_group = $domain.name + '\' + $AD_security_group
       $Acl = Get-Acl $file_Path
       $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule($AD_security_group, 'Modify', 'None', 'None', 'Allow')
       $Acl.SetAccessRule($accessRule)
       Set-Acl $file_Path $Acl
       Write-Host $rights_assigned -ForegroundColor Cyan
       Pause
       CLS
   }
   catch {
       Write-Host $errorMessage -ForegroundColor Cyan
       Pause
   }
}

#4 CALL THE FUNCTION WITH THE INFINITE LOOP
Write-Host $intro -ForegroundColor Cyan
pause
CLS
While ($true) { 
   Set_folder_permission
}
```

### sources
* [https://stackoverflow.com/questions/6403342/how-to-validate-powershell-function-parameters-allowing-empty-strings](https://stackoverflow.com/questions/6403342/how-to-validate-powershell-function-parameters-allowing-empty-strings)
* [https://asciiart.website//index.php?art=art%20and%20design/patterns](https://asciiart.website//index.php?art=art%20and%20design/patterns)
* [https://stackoverflow.com/questions/1275090/what-exactly-is-exit-in-powershell](https://stackoverflow.com/questions/1275090/what-exactly-is-exit-in-powershell)
 

