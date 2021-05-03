## usecase
The aim of this explainer💡/how-to-guide🏁 is to add items `.gitignore` that have already been tracked. Usually, to ignore a file you just add it to `.gitignore` and you never stage/commit it. But you may change your mind or you may stage/commit in with `git add .`, etc.

<!-- TOC -->

- [1. steps](#1-steps)
- [2. notes](#2-notes)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. steps
1. edit `.gitignore` 
2. run `git rm --cached <file>`. The removal of the file from the HEAD revision will happen on the next commit.
3. if you want to remove a whole folder, you need to remove all files in it recursively. Run `git rm -r --cached <folder>`

### 2. notes
* this will not remove the physical file from your local, but it does remove the files from other developers machines on next `git pull`
* as for `git rm`:

> When --cached is given, the staged content has to match either the tip of the branch or the file on disk, allowing the file to be removed from just the index.

> --cached
> Use this option to unstage and remove paths ONLY FROM THE INDEX. Working tree files, whether modified or not, will be left alone.

— from [Git - git-rm Documentation](https://git-scm.com/docs/git-rm)

### 3. sources
* [.gitignore is ignored by Git - Stack Overflow](https://stackoverflow.com/questions/11451535/gitignore-is-ignored-by-git)
* [How to make Git "forget" about a file that was tracked but is now in .gitignore? - Stack Overflow](https://stackoverflow.com/questions/1274057/how-to-make-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitignore)
* [Git - git-rm Documentation](https://git-scm.com/docs/git-rm)
