---
layout: post
title: Visual Studio Code > Correct JSON, validate with PowerShell
categories: [vscode]
---
## the case	of JSON with mistakes
the question is, how to quickly check JSON for errors (seen this several times in job interviews)

## toc
<!-- TOC -->

- [VSCode Problems Panel](#vscode-problems-panel)
- [Powershell: Get-Content + ConvertFrom-Jsom](#powershell-get-content--convertfrom-jsom)

<!-- /TOC -->

## findings
### VSCode Problems Panel
* Use Problems Panel (`CTRL+SHIFT+M`)
* To fix the `.json` file I am using VSCode, there are 7 detected problems in one of the exemplary files

![fix_json_with_code_editor]({{ site.url }}/assets/2020-03-03-fix-json.gif)


### Powershell: Get-Content + ConvertFrom-Jsom
* To validate, I am parsing that fixed JSON with Powershell’s `ConvertFrom-Json` cmdlet. 
    * Note I need to use `Get-Content` to access the resource from the file system
* Passing an incorrect `.json` returns a first error the parser encounters and thus the test **FAILS**

```
Get-Content .\2020-03-03-DRAFT-INCORRECT.json | ConvertFrom-Json 
             
ConvertFrom-Json : Conversion from JSON failed with error: After parsing a value an unexpected character was encountered: ‚. Path 'type', line 3, position 19.
At line:1 char:49
+ Get-Content .\2020-03-03-DRAFT-INCORRECT.json | ConvertFrom-Json
+                                                 ~~~~~~~~~~~~~~~~
+ CategoryInfo          : NotSpecified: (:) [ConvertFrom-Json], ArgumentException
+ FullyQualifiedErrorId : System.ArgumentException,Microsoft.PowerShell.Commands.ConvertFromJsonCommand
```

* After the correction, the `.json` is parsed and thus the test **PASSES**
    
```
Get-Content .\2020-03-03-DRAFT-FIX.json | ConvertFrom-Json

id    type  name  12345
--    ----  ----  -----
12345 event click @{primary=True; image=; thumbnail=; root=acme.com}
```