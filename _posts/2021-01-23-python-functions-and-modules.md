---
layout: post
title: Functions and Modules in Python — Foundations
categories: [python]
---
## usecase
The concern is documenting the most basic use of concepts like **MODULARITY**, **REUSABLE FUNCTIONS** & **MODULES** in python with the use of VSCode and Python Repl. 
Notes under the awesome [Core Python: Getting Started @ Pluralsight](https://app.pluralsight.com/library/courses/getting-started-python-core/table-of-contents)

<!-- TOC -->

- [1. shell (powershell core)](#1-shell-powershell-core)
- [2. code without functions: execute now!](#2-code-without-functions-execute-now)
- [3. function - run when qualified](#3-function---run-when-qualified)
- [4. early exit](#4-early-exit)
- [5. None is returned by both implicit return and return without return val](#5-none-is-returned-by-both-implicit-return-and-return-without-return-val)
- [6. REPL/Code import syntax1 — qualified name](#6-replcode-import-syntax1--qualified-name)
- [7. REPL/Code import syntax2 — unqualified name](#7-replcode-import-syntax2--unqualified-name)
- [8. import or execute pattern: __name__ & __main__](#8-import-or-execute-pattern-__name__--__main__)
- [9. sources](#9-sources)

<!-- /TOC -->

### 1. shell (powershell core)
* install the Python extension for VSCode
* to run the existing python file in REPL just use `Run Python File in Terminal` from VSCode
* [Get Started Tutorial for Python in Visual Studio Code](https://code.visualstudio.com/docs/python/python-tutorial#_run-hello-world)
* or, from the shell run `python <filename.py>`

![run_in_terminal]({{ site.url }}/assets/img001638.png)

### 2. code without functions: execute now!
* you can import the `.py` file and run — without function block; immediatelly 
* start REPL with `python`
* use `import <filename>` — without `.py` 
* the code executes **immediately** 

```python
# NO FUNCTION
from urllib.request import urlopen

story = urlopen("http://sixty-north.com/c/t.txt")
story_words = []
for line in story:
    line_words = line.decode("utf-8").split()
    print(line)
    for word in line_words:
        story_words.append(word)
story.close()

for word in story_words:
    print(word)
```

### 3. function - run when qualified
* usually, you don't want to run the code immediately
* wrap the code in a **function**
* functions, therefore, give you not only re-usability (not repeating yourself) but also give you control as to when your code is executed
* the `def` keyword defines functions
* `return` returns a value
* the `return` is explicit — and it signals that the function is a query
* without `return`, the function is a command that has a side-effect
* remember [command/query separation](https://martinfowler.com/bliki/CommandQuerySeparation.html)

```python
#WORDS.PY WITH A FUNCTION
from urllib.request import urlopen

def fetchwords():
    story = urlopen("http://sixty-north.com/c/t.txt")
    story_words = []
    for line in story:
        line_words = line.decode("utf-8").split()
        print(line)
        for word in line_words:
            story_words.append(word)
    story.close()

    for word in story_words:
        print(word)
```

### 4. early exit
* you can use `return` keyword for an **early exit**
* no return value is required

### 5. None is returned by both implicit return and return without return val
* there is no value returned by a function without a return statement (difference to other languages)
* this is aphorism 2 from the Zen of Python

```
explicit is better than implicit
```

* implicit return, i.e. a return at the end of the function, returns `None`
* running an early exit with `Return` also returns `None`

### 6. REPL/Code import syntax1 — qualified name
* run `import words` → `words.fetchwords()` to run the function in REPL

### 7. REPL/Code import syntax2 — unqualified name
* run `from words import fetchwords` → `fetchwords()` 

### 8. import or execute pattern: __name__ & __main__
* specially named binding allowing us to detect whether a module is run as a script or imported into another module
* when you add `print(__name__)` at the end of the module, the module name is printed during the first import 
* if (and only if) the function with `print(__name__)` in the module is called from the shell with `python words.py` the shell return

```
▶ python words.py
__main__
```

* now you can modify the behavior so that the module is executed from shell but loaded from REPL

```python
from urllib.request import urlopen

def fetchwords():
    story = urlopen("http://sixty-north.com/c/t.txt")
    story_words = []
    for line in story:
        line_words = line.decode("utf-8").split()
        print(line)
        for word in line_words:
            story_words.append(word)
    story.close()

    for word in story_words:
        print(word)

if __name__ == "__main__":
    fetchwords()
```

### 9. sources
* <https://softwareengineering.stackexchange.com/a/257340>
* <https://martinfowler.com/bliki/CommandQuerySeparation.html>
