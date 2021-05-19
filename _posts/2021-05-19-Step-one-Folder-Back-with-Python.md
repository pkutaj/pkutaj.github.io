## usecase
The aim of this playbook🏁 is to outline the _step back_ when navigating relatively with Python. 

<!-- TOC -->

- [1. steps for step-back](#1-steps-for-step-back)
- [2. on os.path.join()](#2-on-ospathjoin)
- [3. on os.path.abspath(path)](#3-on-ospathabspathpath)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. steps for step-back

```python
""" from a script in ./helpers reaching for files in ../assets """
assets_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'assets'))
```

1. `__file__` returns the absolute path of the script
2. `os.path.dirname(__file__)` returns the abs path of its parent folder (project root)
4. `os.path.join()` concatenates the previous, with step-back control statement, and target folder
3. `os.path.abspath()` normalizes

### 2. on os.path.join()
* there are two control statements
    - `.` do nothing
    - `..` step-back
* Do not combine paths using string concatenation `+` 
* Use only `os.path.join()` 
* Why? Different computers represent paths in different ways. 
    - E.g. Windows uses `\` as a separator, while Unix (Mac and Linux) uses `/`
* in other words, when you see `os.path.join()` it means someone is concatenating a file-path

### 3. on os.path.abspath(path)

```
os.path.abspath(path)
---
Return a normalized absolutized version of the pathname path. 
On most platforms, this is equivalent to calling the function normpath() as follows: 
normpath(join(os.getcwd(), path)).
```

— from <https://docs.python.org/3/library/os.path.html#os.path.abspath>

### 4. sources
* [Navigating the filesystem with relative paths at the command line - Opensource.com](https://opensource.com/article/19/8/navigating-filesystem-relative-paths)
* <https://docs.python.org/3/library/os.path.html#os.path.abspath>
* [Python os module open file above current directory with relative path - Stack Overflow](https://stackoverflow.com/questions/4381569/python-os-module-open-file-above-current-directory-with-relative-path)
