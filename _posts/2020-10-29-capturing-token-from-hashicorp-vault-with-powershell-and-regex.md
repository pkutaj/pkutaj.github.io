---
layout: post
title:
categories: []
---

## usecase
* The concern is documenting capturing the token from hashicorp vault and passing it to the Windows Environment Variables 
    * that I need to re-issue every 12 hour in order to work with the stack. 
    * The aim is to get the both consul and nomad CLI to work properly, and to use the same keys for the WEBUI

* consul output

```
▶ vault read consul/creds/support
Key                Value
---                -----
lease_id           consul/creds/support/1111111111
lease_duration     12h
lease_renewable    true
accessor           1111-1111-1111-1111-1111
local              false
token              1111-1111-1111-1111-1111 <--- NEED TO ASSIGN THIS TO THE ENV VAR FOR CLI TO WORK
```

* nomad output:

```
▶ vault read nomad/creds/nomad-viewer
Key                Value
---                -----
lease_id           nomad/creds/nomad-viewer/1111-1111-1111-1111-1111
lease_duration     12h
lease_renewable    true
accessor_id        1111-1111-1111-1111-1111
secret_id          1111-1111-1111-1111-1111
```

<!-- TOC -->

- [1. cmdlet: Select-String](#1-cmdlet-select-string)
- [2. regex: lookaheads and lookbehinds](#2-regex-lookaheads-and-lookbehinds)
    - [2.1. testing lookbehind with regex](#21-testing-lookbehind-with-regex)
- [4. final regex with vault](#4-final-regex-with-vault)
- [5. assign the binding to the env var](#5-assign-the-binding-to-the-env-var)
- [6. CODE](#6-code)
- [7. sources](#7-sources)

<!-- /TOC -->
### 1. cmdlet: Select-String
* I can use `Select-String` aka `sls` to grab the line

```
vault read consul/creds/support | sls token -Pattern token.*

token              1111-1111-1111-1111-1111
```

### 2. regex: lookaheads and lookbehinds
* concepts to define patterns that only match they they 
    * are / are not followed by a certain pattern → **lookahead** (positive / negative)
    * are / are not preceded by a certain pattern → **lookbehind** (positive / negative)

name       | pattern                                | comment
-----------|----------------------------------------|----------------------
lookahead  | `(?=LOOKAHEAD_PATTERN)MATCH_PATTERN`   | ahead is to the right
lookbehind | `(?<=LOOKBEHIND_MATTERN)MATCH_PATTERN` | behind is to the left


#### 2.1. testing lookbehind with regex
* if I want to capture name that is after `mr` + an empty string (whitespace `\s`)
* i need to use lookbehind syntax

```
[regex]::matches(‘mr paul’,’(?<=mr\s).*’).value
→→→ paul
```

### 4. final regex with vault

STEP# | CODE                              | COMMENT
------|-----------------------------------|-----------------------------------------------------------------------------
01    | `vault read consul/creds/support` | read creds from Vault
02    | `sls -pattern..`                  | Select-String with the regex pattern
03    | `..(?<=token..`                   | ..all after the string `token`..
04    | `....\s+)`                        | ....followed by one or more repetitions of an empty string
05    | `\S+`                             | the actual captured string is one-or-more repetions of a non-white-character
06    | `%`                               | for each of these objects (there is only 1)
07    | `{$keys = $_.Matches.Value}`      | assign the value of the match to the $keys variable


```powershell
vault read consul/creds/support |  #01
sls -pattern ’(?<=token\s+)\S+’ |  #02-05
% {$keys = $_.Matches.Value}       #07 
```

### 5. assign the binding to the env var

```
$env:CONSUL_HTTP_TOKEN=$keys
```

### 6. CODE

```powershell
function get-vaultKeys {
    $consulRegex = "(?<=token\s+)\S+"
    $nomadRegex = "(?<=secret_id\s+)\S+"
    $consulURL = "https://consul.snplow.net/ui"
    $nomadURL = "https://nomad.snplow.net/ui"

    vault read consul/creds/support |
    sls -pattern $consulRegex |  
    % {$consulKey = $_.Matches.Value}       

    vault read nomad/creds/nomad-viewer |
    sls -pattern $nomadRegex |  
    % {$nomadKey = $_.Matches.Value}       

    $env:CONSUL_HTTP_TOKEN=$consulKey
    $env:NOMAD_TOKEN=$nomadKey
    
    write-host "~~~~~~" -ForegroundColor Cyan
    write-host "Consul: $consulKey" -ForegroundColor Cyan
    write-host "Nomad: $nomadKey" -ForegroundColor Cyan
    write-host "~~~~~~" -ForegroundColor Cyan

    start chrome $consulURL
    start chrome $nomadURL
}
```

### 7. sources
* [PowerShell regex crash course – Part 4 of 5 | Scripting Blog](https://devblogs.microsoft.com/scripting/powershell-regex-crash-course-part-4-of-5/)
