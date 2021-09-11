## usecase
The aim of this page📝is show when can you switch branches with modified files *without* getting 

```
Your local changes to the following files would be overwritten by checkout
```

<!-- TOC -->

- [1. notes](#1-notes)
- [2. links](#2-links)

<!-- /TOC -->

### 1. notes
* Create a branch1
* Modify file
* Checkout branch2 
* *Succeeds*
* Checkout branch1
* Stage/commit initial changes to branch1
* Modify file again
* Do not commit yet
* Checkout branch2
* *Fails*

```
error: Your local changes to the following files would be overwritten by checkout:
        helpers/gitHandler.py
Please commit your changes or stash them before you switch branches.
Aborting
```

### 2. links
* [Git error: Your local changes to the following files would be overwritten by checkout | alvinalexander.com](https://alvinalexander.com/misc/git-checkout%20error-your-local-changes-files-overwritten-by-checkout/)

