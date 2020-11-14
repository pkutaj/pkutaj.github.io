---
layout: post
title:
categories: []
---
## usecase
The concern is documenting characters that have started to bug me when checking Nomad allocation logs initially. 

```
[0m[1mmodule.redshift.module.cluster.aws_redshift_cluster.cluster[0]: Still modifying... 
```

* what are these characters `[0m[` ?

This would not be a problem is that is piped into `out-host`

```
module.redshift.module.cluster.aws_redshift_cluster.cluster[0]: 
```

<!-- TOC -->

- [1. notes](#1-notes)
- [2. function alias to make this fast](#2-function-alias-to-make-this-fast)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. notes
* there are **TERMINAL CONTROL CHARACTERS**
* in other places, this can be fixed by removing colors
* for nomad, however, even running with `nomad alloc logs -no-color _ALLOC_ID_` does not change it
* i have to pipe it to `out-host` cmdlet (alias `oh`) to make it work again

```
nomad alloc logs -no-color _ALLOC_ID_ | oh
```

### 2. function alias to make this fast
* this is now living in my `$profile` 

```powershell
function get-nomadLogs ($jobId, $paging) { 
    $nomadLogs = nomad alloc logs -job $jobId 
    if ($paging) { oh -InputObject $nomadLogs -Paging }
    else { oh -InputObject $nomadLogs }
}
Set-Alias n get-nomadLogs
```

* specific for this is that I am getting a job id from the slack bot (running jobs )
 

### 3. sources
* [Why in rails CLI do I constantly see "←\[32m.←\[0m" - Stack Overflow](https://stackoverflow.com/questions/10293839/why-in-rails-cli-do-i-constantly-see-%E2%86%9032m-%E2%86%900m)
* [Out-Host (Microsoft.PowerShell.Core) - PowerShell - Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/out-host?view=powershell-7.1)
