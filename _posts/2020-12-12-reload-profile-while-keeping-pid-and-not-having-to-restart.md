---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the need to reload $profile in powershell when optimizing my workflows, setting new alias or little stupid functions that live in `$profile` directly

<!-- TOC -->

- [1. dot sourcing operators](#1-dot-sourcing-operators)
- [2. invocation operator](#2-invocation-operator)
- [3. issues](#3-issues)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. dot sourcing operators

```
. $profile
```

### 2. invocation operator

```
& $profile
```

### 3. issues
* not tested too much - but it does not re-import modules, so if you (like me) depend on — this does not happen
* that means, only changes to procedures directly within $profile are affected

### 4. sources
* [PowerTip: Reload Your PowerShell Profile - Scripting Blog](https://devblogs.microsoft.com/scripting/powertip-reload-your-powershell-profile/)
* [Powershell Tip #25: Reload a profile - Powershell Guru](http://powershell-guru.com/powershell-tip-25-reload-a-profile/)
* [syntax - What does the period '.' operator do in powershell? - Stack Overflow](https://stackoverflow.com/questions/10727006/what-does-the-period-operator-do-in-powershell)
