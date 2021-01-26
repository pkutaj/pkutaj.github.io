---
layout: post
title: Import or Execute Pattern in Python
categories: [python]
---
## usecase
The concern is documenting an idiom to be used when it is desirable to run a python file immediately if called from the shell, but import the function when called from the Python REPL. I call this Import or Execute Pattern. 

<!-- TOC -->

- [1. import or execute pattern: __name__ & __main__](#1-import-or-execute-pattern-__name__--__main__)
- [2. syntax](#2-syntax)

<!-- /TOC -->

### 1. import or execute pattern: __name__ & __main__
* in python, there are specially named bindings `__name__` and `__main__` allowing us to **detect** whether a module is 
    * run as a script from a shell
    * imported into another module from the REPL
* when you add `print(__name__)` at the end of the module, the module name is printed during the first import 
* if (and only if) the function with `print(__name__)` in the module is called from the shell with `python script.py` the shell return

```
▶ python script.py
__main__
```

* you can modify the behavior so that the module is 
    * executed from a shell 
    * loaded from the REPL

### 2. syntax
* add the following at the end of the script and if you call if from the shell and not from the REPL, the script executes immediately

```python
if __name__ == "__main__":
    FUNCTION_TO_BE_EXECUTED()
```
