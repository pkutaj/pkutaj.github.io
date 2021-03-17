## usecase
The aim of this explainer💡 is to check how can I validate input for powershell's `[string]parameter`. 

```
* T (task/tutorial)
* E (explainer)
* H (howto)
* R (reference)
* CH (checklist)
```

<!-- TOC -->

- [1. steps/?](#1-steps)
- [2. example](#2-example)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. steps/?
* answer: you need to use `[ValidateSet]` property of a parameter

### 2. example
* Check [code to create a new kb documet/new-kba.ps1 at master · pkutaj/kb](https://github.com/pkutaj/kb/blob/master/powershell/new-kba.ps1/#L6-L22) 


### 3. sources
* [ValidateSet attribute](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced_parameters?view=powershell-7.1#validateset-attribute)
* [How To Validate Input in PowerShell Functions, Part 1 -- Redmondmag.com](https://redmondmag.com/articles/2018/09/25/validate-input-in-powershell-functions-1.aspx)
