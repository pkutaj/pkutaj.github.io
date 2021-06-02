## usecase
The aim of this playbook🏁 is to demonstrate the assignment of a default value to a variable of a powershell function.
<!-- TOC -->

- [1. example](#1-example)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. example
* use `function <funcName> {param($foo = <defaultValue>) <code>}`

```powershell
function start-remrem {
    param($len = 1)
    $url = "file:///C:/Users/$env:USERNAME/tools/The%20Most%20Dangerous%20Writing%20App.html#/write?limit=$len&type=minutes"
    start msedge $url
}
```


### 2. sources
[Designing Professional Parameters - powershell.one](https://powershell.one/powershell-internals/attributes/parameters)
