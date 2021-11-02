## usecase
The aim of this page📝 is to demonstrate how to pass arguments to python scripts via PowerShell scripts. In PowerShell terminal, you can just literally type them. But in PowerShell scripts, you must use variables. I provide examples of positional arguments as well as optionals using argparse (the implementation of python's internal keyword arguments). 

<!-- TOC -->

- [1. positional arguments using sys.argv within python code](#1-positional-arguments-using-sysargv-within-python-code)
- [2. optionals (keyword arguments) using argparse modul within python code](#2-optionals-keyword-arguments-using-argparse-modul-within-python-code)
- [Links](#links)

<!-- /TOC -->

### 1. positional arguments using sys.argv within python code

* in the first one I use `sys.argv` to parse the arguments

```powershell
# test.ps1
function publish-to-Medium ($docTitle, $docFolder, $tempDocPath, $docKbFolder){
    $py_module = "$docFolder\md2med.py"
    $arg1 = "--doc_name=$docTitle" 
    $arg2 = "--file_to_publish=$tempDocPath"
    $arg3 = "--tag=$docKbFolder"
    python $py_module $arg1 $arg2 $arg3
}
```    

### 2. optionals (keyword arguments) using argparse modul within python code

* in the second, I am using argparse with named parameters to parse the arguments
* not that also the argparse named parameters (`-k`, and `-v`) are part of the `$<arg>` variable

```powershell
function consul-updater ($client, $key, $value) {
    echo $client > "$env:CU_FOLDER\clients.txt"
    $cu_module = "$env:CU_FOLDER\cu.py"
    $key_arg = "-k=$key"
    $value_arg = "-v=$value"
    python $cu_module $key_arg $value_arg
}
```

### Links
* https://stackoverflow.com/a/33639147/11082684
* [argparse — Parser for command-line options, arguments and sub-commands](https://docs.python.org/3/library/argparse.html)
