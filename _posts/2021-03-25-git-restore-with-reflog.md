## usecase
The aim of this how-to-guide🏁 is to show the restore of data of for example a deleted commit via `git reflog`. 
* `reflog` stands for **REFERENCE LOGS**
* record when the **tips** of branches and other references were updated in the **LOCAL REPO**

<!-- TOC -->

- [1. Instructions](#1-instructions)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. Instructions
* Run `git reflog`
* Run `git checkout -b <recoverBranch> <sha>`
    - the name of the `<recoverBranch>` is **IRRELEVANT & CUSTOM**
    - the `sha` is **CRUCIAL & FIXED** 
    - you may have to commit/stash all changes in the working area before creating a detached head
    - e.g. `git checkout -b restoreTests 284270a`
* Recover data by placing them somewhere else
* Return to `master` by `git checkout master`
* Delete the ad-hoc branch by `git branch -D <recoverBranch>`

### 2. sources
* [git ready » reflog, your safety net](http://gitready.com/intermediate/2009/02/09/reflog-your-safety-net.html)
* <https://medium.com/@zaran.56/how-to-recover-restore-deleted-git-branch-5a068c07bed2>
* [Git - Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
* [Git Branch ~ Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/using-branches)
