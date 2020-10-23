---
layout: post
title:
categories: []
---
## usecase
The concern is documenting how it is easily possible to test for running processes on a stupid example — if runs, kill it (it could be just kill it without error message if it does not run, i know:)

<!-- TOC -->

- [1. noisy error messages](#1-noisy-error-messages)
- [2. ErrorAction common parameter](#2-erroraction-common-parameter)
    - [2.1. SilentlyContinue](#21-silentlycontinue)
    - [2.2. Ignore](#22-ignore)

<!-- /TOC -->

### 1. noisy error messages
* there seems to be a heuristics for action only if the process is running
    * e.g., if runs, kill
* but I keep getting the error I want to hide

![remove_error_messages]({{ site.url }}/assets/img002091.png)

### 2. ErrorAction common parameter
#### 2.1. SilentlyContinue
* one of the often used common parameters: `-ErrorAction SilentlyContinue`

```powershell
if (gps -Name msedge -ErrorAction SilentlyContinue) { write-host "hello" }
```
![remove_error_messages]({{ site.url }}/assets/img002116.png)

* you can be more elegant in this by just killing the process with the erroraction silentlycontinue

#### 2.2. Ignore
* even better, you can just `ignore`

```
 Ignore.  Suppresses the error message and continues
            executing the command. Unlike SilentlyContinue, Ignore
            does not add the error message to the $Error automatic
            variable. The Ignore value is introduced in Windows
            PowerShell 3.0.
```
* if I want to kill a process without having face error messages, just run

```powershell
kill -Name msedge -EA ignore`
```
