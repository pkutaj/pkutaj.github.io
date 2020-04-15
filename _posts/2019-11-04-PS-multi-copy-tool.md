---
layout: post
title: PowerShell > Multi-Copy tool — 1 to many
categories: [powershell]
---
## the case	
The aim of this script is to create a mutation of total commander's multi-rename tool, but it should create X copies of an existing template file with incremental numbering
* note: error-handling is missing completely 

## toc
<!-- TOC -->

- [steps](#steps)
- [code](#code)
- [inspiration](#inspiration)

<!-- /TOC -->

## findings
### steps

STEP | ACTION
-----|------------------------------------------------------------------------
0.1  | Create an intro +outro here-string with an ascii art proper
1    | Create function with mandatory parameters: file Name + number of copies
2    | Get a template file
3    | For-Loop
3.1  | Create new file name / file path
3.2  | Create a copy of template files

### code
```powershell
$intro = @"
______________________________________________________________________
|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|
___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__
_|___|__ |___|___|
___|___| WELCOME TO MULTI-COPY TOOL __|___|__
_|___|__ |___|___|
___|___| 1. ENTER THE NUMBER OF COPIES __|___|__
_|___|__ 2. PASTE THE FULL PATH OF FILE |___|___|
___|___| --> THE SOURCE WILL BE COPIED THERE __|___|__
_|___|__ |___|___|
___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__
_|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|
"@
$outro = @"
______________________________________________________________________
|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|
___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__
_|___|__ |___|___|
___|___| D O N E :) C A R P E D I E M __|___|__
_|___|__ |___|___|
___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__
_|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|
"@

function multiCopy {
#1 GET INPUT FROM MANDATORY PARAMETERS
param (
[Parameter (Mandatory = $true)][string]$how_many_copies,
[Parameter (Mandatory = $true)][string]$enter_file_path
)
#2 GET A TEMPLATE FILE
$template = Get-Item $enter_file_path
#3 LOOP
for ($i = 1; $i -le $how_many_copies; $i++) {
#3.1 CREATE NEW FILENAMES AND FILEPATHS
If ($i -lt 10) { $NewFileName = $template.BaseName + 0 + $i } 
Else { $NewFileName = $template.BaseName + $i }
$NewFilePath = $template.FullName.Replace($template.BaseName, $NewFileName)
#3.2 CREATE A COPY OF TEMPLATE FILES
try {
$template | Copy-Item -Destination $NewFilePath
}
catch {
Write-Host "oops, debug please"
}
}
Write-Host $outro -ForegroundColor Cyan
Pause 
Clear-Host
}
#
Write-Host @intro -ForegroundColor Cyan
Pause 
Clear-Host
multiCopy
```

### inspiration
	• https://stackoverflow.com/questions/49573376/take-a-file-and-copy-and-rename-multiple-times-over-certain-folders
