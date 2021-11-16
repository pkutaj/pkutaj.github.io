## usecase
The aim of this page📝 is to document an idiom of joining arguments into a single string and then writing them into a file (the latter part is actually optional). For fun, comparing the python idiom that uses the `.join` **method** the Powershell's use of **operators** (`join`, `>>` aka redirect operator and `..` aka range operator). 

<!-- TOC -->

- [1. Pyth](#1-pyth)
- [2. Posh](#2-posh)
- [3. Links](#3-links)

<!-- /TOC -->

### 1. Pyth
```python
#writer.py
import sys
if __name__ == "__main__":
    f = open(sys.argv[1], mode="wt")
    f.write(" ").join(sys.argv[2:])
    f.close()
```

* if you want to have a script that creates `newfile.txt` and writes the rest of the text into it
* you add this to the bottom of the module
* `argv` parses argumets into a list
* create a file with the first argument using the `open()` method
* utilize slicing to join the rest of the list into a string and write it into the file
* close the file with `close()`

```python
>>> python ./writer.py newfile.txt hello I want this to be written into newfile.txt
```

### 2. Posh

```powershell
function writer {
    echo (($args[1..($args.Length-1)]) -join " ") >> $args[0]
}
```

* in PowerShell you find all arguments in an automatic variable called `$args` 
* there is [no slicing in posh](https://stackoverflow.com/a/28461189/11082684)
* but there is a range operator `..` so you can select items from index `1` (second item) to `length-1`(last item)
* there is a `-join` [operator](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_join?view=powershell-7.2) 

```powershell
▶ writer newfile.txt hello I want this to be written into newfile.txt
```

### 3. Links
* https://stackoverflow.com/a/28461189/11082684
* [Join Operator - Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_join?view=powershell-7.2)
* [Range operator - Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_operators?view=powershell-7.2#range-operator-)
