## usecase
The aim of this how-to-guide🏁 is to demo how to check for the branch existence with gitPython

<!-- TOC -->

- [1. steps/?](#1-steps)
- [sources](#sources)

<!-- /TOC -->

### 1. steps/?
0. `import git`
1. assign branches to a var with `branches = git.Git().branch("-all").split()`
2. test for membership with `in` or `not in` operator with `"master" in branches`

* this is returning `True` or `False` not throwing exceptions

```
>>> import git
>>> branches = git.Git().branch("--all")
>>> branches
['*', 'master', 'remotes/origin/HEAD', '->', 'origin/master', 'remotes/origin/master
>>> branches = branches.split()
>>> "master" in branches
True
```

### sources
* [Is there a better way to find out if a local git branch exists? - Stack Overflow](https://stackoverflow.com/questions/5167957/is-there-a-better-way-to-find-out-if-a-local-git-branch-exists)
