## usecase
The aim of this explainer💡 is to delineate a pattern useful for ops when checking logs/jobs with switches for various usecases. In an example I am querying list of keys HashiCorp Consul for their UUIDs or for a particularities of a job they run.

<!-- TOC -->

- [1. steps/notes](#1-stepsnotes)
- [2. example](#2-example)

<!-- /TOC -->

### 1. steps/notes

```powershell
function get-foos {
    param (
        [string[]]$idList, 
        [switch]$a, 
        [switch]$b,
        [switch]$c
    )
 
 foreach ($idItem in $idList) {
     #CODE WITH CASE ANALYSIS / SWITCHING
 
 Pause
 }
 
}
```

### 2. example

```powershell
function query-consul () {
    [CmdletBinding()]
    param (
        [string[]]$pipelines, 
        [string]$queryString, 
        [switch]$uuid,
        [switch]$rdb

    )
    
    foreach ($pipeline in $pipelines) {
        $consulName = $pipeline -replace "-.*"
        $consulName = $consulName -replace "\.", "_"
        if ($uuid) {get-uuid($consulName)}
        elseif ($rdb) {get-rdbInfo($consulName)}
        else {
            consul kv get -recurse customer/$consulName |
                Select-String $queryString 
            Pause
        }
    }
}   
```
