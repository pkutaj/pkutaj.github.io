## usecase
The aim of this tutorial🔍 is the lesson needed for starting to use powershell's functions with just `-parameter` without the provision of any value

<!-- TOC -->

- [1. steps/?](#1-steps)
- [2. example: query hashicorp consul](#2-example-query-hashicorp-consul)

<!-- /TOC -->

### 1. steps/?
* this features is called **switch parameters**
* handled in [about_Functions_Advanced_Parameters - PowerShell @ Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced_parameters?view=powershell-7.1#switch-parameters)
* the control flow is handled elegantly with truthy test against the value

```
if($switchname) {activated}
```

* you need to set a proper type `[switch]` before the argument
* this works also in simple inline functions without the lenghty `param` block

### 2. example: query hashicorp consul
* this is my local script I am using during operations to lookup a given value from within HashiCorps Consul database
* there are other things I am implementing: a short command-help, and argument typing
* the prereq to using this is
    - Consul installed
    - Consul authenticated

```
>>> query-consul com_acme md5 -detailed
```

```powershell
function query-consul ([string]$customer, [string]$queryString, [int]$context, [switch]$detailed) {
    $consulURL = "https://consul.foo.net/ui/eu-central-1/kv/customer/$customer"
    
    elseif ($detailed) {
        consul kv get -recurse -detailed customer/$customer |
            Select-String $queryString -Context 1, $context
    }
    else {
        consul kv get -recurse customer/$customer |
            Select-String $queryString -Context 1, $context
    }
<#
.SYNOPSIS
    - Function querying Hashicorp Consul'KV for the a string in question
.DESCRIPTION
    - Provide an empty string to query all folders
    - Run with -detailed flag to get richer outout
    - You can provide -context [int] to get richer output
#>
}
```
