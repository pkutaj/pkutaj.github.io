## usecase
The aim of this explainer💡 is to an examination of you can update all git branches

* There is `git pull --all` - but it fetches changes in all remote branches and then merges only the currently checked out one. 
* For an update of another branch, you need to check it out and merge changes

<!-- TOC -->

- [1. question](#1-question)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. question
* have 3 remote branches: master, staging and production — I have 3 local branches that track those remote branches.
* updating all my local branches is tedious:

```
git fetch --all
git rebase origin/master
git checkout staging
git rebase origin/staging
git checkout production
git rebase origin/production
```

* can you do this with  `git pull -all` ? 
* it seems to do a `fetch --all` → then updates (fast forward or merges) the current working branch — but not the other local branches
* i.e. you still have to manually switching to each local branch and update
* this behavior of `pull --all` is exactly as expected (though not necessarily always useful)
* the option is passed along to `git fetch` which then fetches all refs from all remotes, instead of just the needed one
* it then merges (or in your case, rebases) the appropriate single branch.
* if you want to check out other branches, you're going to have to check them out. 
* and **yes, merging (and rebasing) absolutely require a work tree** → so they cannot be done without checking out the other branches
* you could wrap up your described steps into a script/alias if you like, though I'd suggest joining the commands with && so that should one of them fail, it won't try to plow on.

```
git pull --all

>>> Fetch all remotes
```

— from [Git - git-pull Documentation](https://git-scm.com/docs/git-pull)

### 2. sources
* [Can "git pull --all" update all my local branches? - Stack Overflow](https://stackoverflow.com/questions/4318161/can-git-pull-all-update-all-my-local-branches)*
* [Git - git-pull Documentation](https://git-scm.com/docs/git-pull)
