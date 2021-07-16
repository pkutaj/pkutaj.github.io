## usecase
The aim of this explainer💡 is to demonstrate how to use _dir_ in python, i.e. how to navigate through the file structure within REPL/Code.

<!-- TOC -->

- [1. steps](#1-steps)
- [2. explanation](#2-explanation)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. steps
* `import os`
* `from pprint import pprint as pp`
* `pp(next(os.walk(".")))` to return contents of the current workind directory
    - for only files `pp(next(os.walk(".")[2]))`
    - for only folders `pp(next(os.walk(".")[1]))`
    - for only path `pp(next(os.walk(".")[0]))`

### 2. explanation
* os.walk(directory) returns a generator that yields a 3-tuple with: 
    - <string> dirName
    - <list> list of subdirs
    - <list> list of files
* to evaluate (get results immediatelly), nest it into the `next()`


### 3. sources
* [os\.walk](https://docs.python.org/3/library/os.html#os.walk)
