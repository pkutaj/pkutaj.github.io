---
layout: post
title: python > functions and modules
categories: [python]
---
## usecase
The concern is documenting the most basic use of concepts like **MODULARITY**, **REUSABLE FUCTIONS** & **MODULES** in python with the use of VSCode and Python Repl. 

<!-- TOC -->

- [1. shell (powershell core)](#1-shell-powershell-core)
- [2. REPL: import and run](#2-repl-import-and-run)
    - [2.1. define function to load and run only when qualified](#21-define-function-to-load-and-run-only-when-qualified)
- [3. REPL/Code import syntax1 — qualified name](#3-replcode-import-syntax1--qualified-name)
- [4. REPL/Code import syntax2 — unqualified name](#4-replcode-import-syntax2--unqualified-name)
- [5. import or execute: __name__ & __main__](#5-import-or-execute-__name__--__main__)
- [6. sources](#6-sources)

<!-- /TOC -->

### 1. shell (powershell core)
* to run the existung python file in REPL just use `Run Python File in Terminal` from VSCode
* [Get Started Tutorial for Python in Visual Studio Code](https://code.visualstudio.com/docs/python/python-tutorial#_run-hello-world)
* or, from the shell run `python <filename.py>`

![run_in_terminal]({{ site.url }}/assets/img001638.png)

### 2. REPL: import and run
* start REPL with `python`
* use `import <filename>` without `.py` 
* the code executes **IMMEDIATELY** 
* if you don't want to run the code immediatelly, wrap the code in a **FUNCTION**

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

#### 2.1. define function to load and run only when qualified
* the `def` keyword defines functions
* `return` returns a value
* the `return` is explicit — and it signals that the function is a query
* without `return`, the function is a command that has a side-effect
* command/query separation

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

### 3. REPL/Code import syntax1 — qualified name
* run `import words` → `words.fetchwords()` to run the function in REPL

### 4. REPL/Code import syntax2 — unqualified name
* run `from words import fetwords` → `fetchwords()` 

### 5. import or execute: __name__ & __main__
* specially named binding allowing us to detect whether a module is run as a script or imported into another module
* when you add `print(__name__)` at the end of the module, the module name is printed during the first import 
* if the function with `print(__name__)` in the module is called from the shell with `python words.py` the shell return

```
▶ python words.py
__main__
```

* now you can modify the behaviour so that the module is executed from shell but loaded from REPL

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

### 6. sources
* https://softwareengineering.stackexchange.com/a/257340
