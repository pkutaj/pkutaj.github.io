---
layout: post
title: pytest and vscode
categories: [vsc]
---
## usecase
The concern is documenting ensuring `pytest` works as expected in vscode

<!-- TOC -->

- [1. requirements](#1-requirements)
- [2. usage](#2-usage)
- [3. creating code](#3-creating-code)

<!-- /TOC -->

### 1. requirements
* there is 1 codeFile and 1 testFile
* testFile is called `*_test.py`
* test is called `test_foo()`
* the only allowed separator on file (module) name is underscore `_`
    * no dots, no dashes
* do not have code and tests in same file (I used to do that for katas, etc.)
    * you can use `ptw` for real-time testing there if needed

### 2. usage
* have a custom keyboard shortcut for opening the test sidebar
    * `CTRL` + `ALT` + `SHIFT` + `T`
* possibly also for running a particular test method / debug particular test method

### 3. creating code
* lazy to keep creating an extra test file for each code file
* now, I am ignoring the recommended folder structure at this moment

```powershell
function create-pythonFiles($name) {
    $codeFile = ("$name" -replace "\s", "_") -replace ".+", "$&.py"
    $testFile = ("$name" -replace "\s", "_") -replace ".+", "$&_test.py"
    New-Item $codeFile
    New-Item $testFile
    vsc .
    Invoke-Item $codeFile
    Invoke-Item $testFile
}
Set-Alias pyf create-pythonFiles
pyf SICP_01_01
```
