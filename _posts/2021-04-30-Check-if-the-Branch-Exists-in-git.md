cd ## usecase
The aim of this how-to-guide🏁 is to demo how to check for the branch existence with gitPython

<!-- TOC -->

- [1. steps/?](#1-steps)

<!-- /TOC -->

### 1. steps/?
0. `import git`
1. assign branches to a var with `branches = git.Git().branch("-all").split()`
2. test for memberhip with `in` or `not in` operator with `master in branches`1

* this is returning `True` or `False` not throwing exceptions

* [Is there a better way to find out if a local git branch exists? - Stack Overflow](https://stackoverflow.com/questions/5167957/is-there-a-better-way-to-find-out-if-a-local-git-branch-exists)
