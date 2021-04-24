## usecase
The aim of this how-to-guide🏁 is to demo a simplest scenarios of undo in git — scenarios when you have done something and you want to undo it right now. The cleanest use is when the areas are not containing anything else. I use this also for testing scripts or GH actions. 

<!-- TOC -->

- [1. steps/?](#1-steps)

<!-- /TOC -->

### 1. steps/?
* all of these include variations on `git reset HEAD^`
* note: **there is ^ sign** — it is different from `git reset HEAD` !

AIM                                                                    | COMMAND
-----------------------------------------------------------------------|--------------------------
undo the last commit and delete its contents entirely                  | `git reset --hard HEAD^`
undo the last commit and put its contents back into index/staging area | `git reset --soft HEAD^`
undo the last commit and put its contents into working area            | `git reset --mixed HEAD^`

