---
layout: post
title: python > pytest, ptw and setting up unit testing for python
categories: [python]
---
## abstract
The concern is documenting finding the unit test framework similar to jest for javascript. 

## contents
<!-- TOC -->

- [1. pytest](#1-pytest)
- [2. pytest-watch](#2-pytest-watch)
- [3. test1: code & test in the same file](#3-test1-code--test-in-the-same-file)
- [4. test2: import sourcefile into testfile](#4-test2-import-sourcefile-into-testfile)
- [debug: use vscode](#debug-use-vscode)

<!-- /TOC -->

### 1. pytest
* install

```
pip install -U pytest
```

* validate

```
pytest --version
pytest 6.0.1
```

### 2. pytest-watch
* install **pytest-watch** to enable tehe watch mode for pytest, i.e. make pytest run each time you save the file in the watched folder

```
pip install pytest-watch
```

* validate

```
ptw --version
pytest-watch 4.2.0
```

### 3. test1: code & test in the same file
* create a file `*_test.py` and write a first function & corresponding test
* run `ptw` to run pytest in a watch mode 

```python
def func(x):
    return x + 1

def test_answer():
    assert func(3) == 4
```

![testing_in_realtime]({{ site.url }}/assets/img001527.gif)

### 4. test2: import sourcefile into testfile

```python
import addition

def test_answer1():
    input = 4                     # arrange
    result = addition.func(input) # act
    assert result == 8            # assert
```

### debug: use vscode
* python extension needs to be activated
* run `Python > configure tests` to select testing framework and folder with files (no drill-down here)
* open the file (here both source and test in a single file)
* set a breakpoint and click on `Debug test` in the file → do not run debugger with `f5` or from the sidebar

![demo_debugging_pytest]({{ site.url }}/assets/2020-08-10-2.gif)
