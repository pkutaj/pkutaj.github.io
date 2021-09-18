## usecase
The aim of this page📝is to find files that are a) committed b) not pushed yet c) will be pushed with git push command. 
It is simplified for checking just branches that are set as matching already (e.g. `master` <> `origin/master`)

<!-- TOC -->

- [1. notes](#1-notes)
- [2. example](#2-example)
- [3. links](#3-links)
- [4. terms](#4-terms)

<!-- /TOC -->

### 1. notes
* `git diff --stat --cached [remote/branch]`
* `git diff --stat --staged [remote/branch]`

* syntax

```
git diff [<options>] --cached [<commit>] [--] [<path>…​]
```

* on `--cached`

> … view the changes you staged for the next commit relative to the named <commit> … if you do not give <commit>, it defaults to HEAD (pavol: HEAD of the provided <path>, i.e. HEAD of your<remote branch> …- -staged is a synonym of --cached

* `<path>` is the upstream tracking branch you are running diff against
* `--stat` generates only **diffstat**

### 2. example
* my customized `git log` command shows that local `master` is ahead of `origin/master`

```
▶ git log --graph --pretty=format:"%C(auto)%h%d%Creset %C(cyan)(%ci)%Creset %C(green)%cn <%ce>%Creset %s" --name-status --date=short

<!-- THIS COMMIT IS AHEAD -->

* 7c80d19 (HEAD -> master) (2021-09-17 23:17:16 +0000) pavol kutaj <pkutaj@gmail.com> backup|
| M     powershell/rdbldev.ps1
| M     productivity/2021-09-14-What-is-Proper-Risk.md
| M     python/2021-09-02-Running-Python-Oneliners-from-PowerShell-Terminal-Exemplified-on-JSON-minifier.md
| M     python/2021-09-14-Use-Slicing-To-Insert-Into-a-List-at-a-Given-Position-in-Python.md
| A     python/2021-09-17-How-To-Delete-a-File-in-Python.md
| R080  python/2021-01-19-Test-Path-and-Act-Idiom-in-Python.md  python/2021-09-17-Test-Path-and-Act-Idiom-in-Python.md| M     python/pyth_boards.md
| M     sicp/10_01-Computational-Objects.md
| A     sicp/10_02-Agendas-and-Queues.md
| M     sicp/sicp-home.md

<!-- CURRENT STATE OF THE REMOTE REPO -->

* 13c6fd7 (origin/master, origin/HEAD) (2021-09-17 12:51:00 +0000) pavol kutaj <pkutaj@gmail.com> deleted|
| D     python/2021-04-17-Delete-a-File-in-Python.md
```

* this is returned by `git diff --stat --cached origin/master` when this is run from `HEAD

```
~\Documents\workspace\work.log\kb  master ↑1 +7 ~6 -0 ! 
⚡                                                3 hours ago

▶ git diff --stat --staged origin/master

 powershell/rdbldev.ps1                             |  2 +-
 productivity/2021-09-14-What-is-Proper-Risk.md     | 21 +++++++--
 ...rShell-Terminal-Exemplified-on-JSON-minifier.md | 11 ++++-
 ...rt-Into-a-List-at-a-Given-Position-in-Python.md | 54 ++++++++++++++++++++--
 .../2021-09-17-How-To-Delete-a-File-in-Python.md   | 32 +++++++++++++
 ...021-09-17-Test-Path-and-Act-Idiom-in-Python.md} | 10 ++--
 python/pyth_boards.md                              |  6 +--
 sicp/10_01-Computational-Objects.md                | 39 +++++++++++++++-
 sicp/10_02-Agendas-and-Queues.md                   | 27 +++++++++++
 sicp/sicp-home.md                                  |  5 +-

10 files changed, 183 insertions(+), 24 deletions(-)
```

* you can keep committing and the difference between local/remote just gets aggregated in the "report" above — `git log` would keep commits separated

### 3. links
* https://git-scm.com/docs/git-diff
* [How can I see what I am about to push with git? - Stack Overflow](https://stackoverflow.com/questions/3636914/how-can-i-see-what-i-am-about-to-push-with-git)

### 4. terms
* diffstat
