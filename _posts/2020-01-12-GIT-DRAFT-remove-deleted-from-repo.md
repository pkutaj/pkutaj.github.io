---
layout: post
title:
---
## the case	
the question is, 

## toc
<!-- TOC -->



<!-- /TOC -->

## findings
A tangible example should help developers struggling with cleaning files out of a repo that have been deleted and that have been marked by Git as "deleted." If you don't permanently remove those "deleted" files, Git will show them to you every time you do a git status. It's hard to read the output from git status when there are many "deleted" files hanging around.

1) Check your repo's status with git status:

$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
    (use "git add/rm <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working directory)
        deleted:    repoDir/subDir/Info.plist
        deleted:    repoDir/subDir/MacOS/CrashLogDemo
        deleted:    repoDir/subDir/PkgInfo...

no changes added to commit (use "git add" and/or "git commit -a")
2) Use git rm to permanently remove files Git has marked "deleted" (in this case I'm using a wildcard [*] to remove an entire directory):

$ git rm repoDir/subDir/*
rm 'repoDir/subDir/Info.plist'
rm 'repoDir/subDir/MacOS/CrashLogDemo'
rm 'repoDir/subDir/PkgInfo'...
3) Commit changes with a comment using git commit -m:

$ git commit -m "Removed unncessary files."
[master 9178ad4] Removed unncessary files.
    28 files changed, 2377 deletions(-)
    delete mode 100644 repoDir/subDir/Info.plist
    delete mode 100644 repoDir/subDir/MacOS/CrashLogDemo
    delete mode 100644 repoDir/subDir/PkgInfo...
4) git push the changes to the appropriate repo/branch:

$ git push origin master
Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 291 bytes | 291.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To https://github.com/accountName/CrashLogDemo.git
    f4716fa..9178ad4  master -> master

5) Finally, when other users do a git pull, the unnecessary files will be deleted from their locals.

* [Git: why the file deletion does not sync? - Stack Overflow](https://stackoverflow.com/questions/16411272/git-why-the-file-deletion-does-not-sync)