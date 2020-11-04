---
layout: post
title:
categories: []
---
## usecase
The concern is documenting querying consul with from the powershell terminal

<!-- TOC -->

- [1. requirements](#1-requirements)
- [2. naming convent](#2-naming-convent)
- [3. consul kv get | sls](#3-consul-kv-get--sls)
- [4. CODE](#4-code)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. requirements
* you need to set up all what is needed
    * ✅consul executable
    * ✅proper access set up
    * ✅proper environmental variables in windows set up

### 2. naming convent
* the naming convention for the KV store we've been using is built around the literal `customer` 

```
customer/$customerName/$...
```

* the script is built on that logic
* also, I am pasting the name of the data pipeline that has a totally different naming convention and that it `com.acme-prod1`
* that needs to be transformed into `com_acme` because `.` cannot be used in the address space of the consul KV (it does not belong to proper URL)

### 3. consul kv get | sls
* example is to find all strings with `cookie_` in either key or value name

```
consul kv get -recurse -detailed customer/$customer/ | sls cookie_ 
```

### 4. CODE
* I am calling the function with an alias `cc` set in `$profile`
* there are 4 arguments, this is a simple function for purely personal use, nonetheless
    1. pasting the pipeline name with quicktextpaste (i have a list of 100+ pipelines)
    2. query string that I want to find within the KV string
    3. optional - do I want a detailed output - pass `d`
    4. optional - do I want a further context (text above an ) → pass the number of lines
* there is not much error checking 
* todo: the script should also check if I am in vpn

```powershell
function query-consul ($pipeline, $queryString, $detailed, $context) {
    $consulName = $pipeline -replace "-.*"
    $consulName = $consulName -replace "\.", "_"
    $consulURL = "https://ENTER-CONSUL-URL-HERE"

    if ($detailed -eq "d") {
        consul kv get -recurse -detailed customer/$consulName |
            Select-String $queryString -context 1,$context
    }
    else {
        consul kv get -recurse customer/$consulName |
            Select-String $queryString -context 1,$context
    }
}
```

### 5. sources
* [Commands: KV Get - Consul by HashiCorp](https://www.consul.io/commands/kv/get)
