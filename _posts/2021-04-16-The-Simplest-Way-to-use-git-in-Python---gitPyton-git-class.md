## usecase
The aim of this how-to-guide🏁 is to make git working in Python scripts fast for simple tasks. 

<!-- TOC -->

- [1. steps](#1-steps)
- [2. examples](#2-examples)
- [sources](#sources)

<!-- /TOC -->

### 1. steps
1. install gitPython
2. import the module with `import git`
3. use the `Git` class and pass commands with `git.Git().<gitCommand>(<param1>, <param2>, ...)`
4. to get output in CLI, embed into a `print` statement

### 2. examples

* this is for `git pull orogin master`

```python
import git
print(' UPDATES '.center(80, '~'))
print(git.Git().pull('origin', 'master'))
```

* output

```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UPDATES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Already up to date.
```

### sources
* [GitPython · PyPI](https://pypi.org/project/GitPython/)
* <https://gitpython.readthedocs.io/en/stable/tutorial.html#using-git-directlys>
