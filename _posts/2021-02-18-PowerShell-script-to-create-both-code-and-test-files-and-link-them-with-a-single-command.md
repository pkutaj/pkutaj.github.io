## usecase
* The aim of this explanation💡 is to provide a code that creates PowerShell and python
    - ✅ code files
    - ✅ test files with proper syntax
    - ✅ link code to test
    - ✅ be extensible for adding more languages
    - I don't need the syntax for the test there, that I can write/use `ctrl+space` inside vscode to auto-populate; just linking and file creation

... all with a single command with a simple alias; in my workflow, I use `pyf` and `pof` for Python and Powershell, respectively

* For powershell: 
![posh_test]({{ site.url }}/assets/img002618.gif)

* For python
![python_test]({{ site.url }}/assets/img002619.gif)

<!-- TOC -->

- [1. CODE](#1-code)

<!-- /TOC -->

### 1. CODE 

```powershell
function create-codeFiles($name, $testName, $extension, $linkText) {
    $codeFile = ("$name" -replace "\s", "_") -replace ".+", "$&.$extension"
    $testFile = ("$name" -replace "\s", "_") -replace ".+", "$&$testName.$extension"
    New-Item $codeFile -ErrorAction Ignore
    New-Item $testFile -ErrorAction Ignore
    Add-Content $testFile -Value $linkText
    vsc .
    Invoke-Item $codeFile
    Invoke-Item $testFile
}

function create-pythonFiles($name) {
    $pyTestName = "_test"
    $pyExtension = "py"
    $linkText = "from $name import *"
    create-codeFiles $name $pyTestName $pyExtension $linkText
}

function create-powershellFiles($name) {
    $ps1TestName = ".tests"
    $ps1Extension = "ps1"
    $linkText = "BeforeAll {. `$PSScriptRoot/$name.ps1}"
    create-codeFiles $name $ps1TestName $ps1Extension $linkText    
}
```
