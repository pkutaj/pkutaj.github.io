## usecase
The aim of this how-to-guide🏁 is to simply demo the rename of a remote branch (the starting point). Do this for (semantic) cleanups. 
This is for remote branches already in the repo, remote branches that you may have first checked out with


<!-- TOC -->

- [1. steps/?](#1-steps)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. steps/?
0. update the list or remote branches (and remove deleted ones), if needed

```
git remote update origin --prune
```

1. check out the remote branch

```
git checkout --track origin/<oldName>
```

2. Rename the checked-out branch:

```
git branch --move <new_name>
```

3. Push the `<new_name>` local branch and reset the upstream branch. Now you have 2 branches in remote. Both `<old_name>` and `<new_name>`

```
git push origin --set-upstream <new_name>
```

4. Delete the `<old_name>` remote branch. Note you don't use `git branch -D <name>` at all (default cmd to delete a branch locally). 

```
git push origin --delete <old_name>
```

* Now you have 1 renamed branch in remote → Done

### 2. sources
* [local: Rename-Remote-Branch-in-Git.md](..\git\2021-04-29-Rename-Remote-Branch-in-Git.md)
* [GH: Rename-Remote-Branch-in-Git.md](https://github.com/pkutaj/kb/blob/master/git/2021-04-29-Rename-Remote-Branch-in-Git.md)
* [How To Rename a Local and Remote Git Branch - Linuxize](https://linuxize.com/post/how-to-rename-local-and-remote-git-branch/)
