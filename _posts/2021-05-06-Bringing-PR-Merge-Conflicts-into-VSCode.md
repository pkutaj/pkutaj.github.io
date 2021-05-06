## usecase
The aim of this explainer💡 is to get how to bring the merge conflicts from PR back into VSCode

![]({{ site.url }}/assets/img002851.jpg)

<!-- TOC -->

- [1. steps/?](#1-steps)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. steps/?
* I encounter merge conflicts within Pull Requests
* I want this to open as a git merge conflict in VSCode with the help of its _codeLens_  - there is no "button" to do this in GitHub! 
* ... and worse, not even in its PR extension, not in the GUI, just a tedious manual editor

1. `git checkout master`
2. run `git merge <branch>` → select a branch you want to merge into `master`
3. now - you can deal with the merge hell from the git side-bar → _Merge Changes_ 
4. make the changes with with the help of _codeLens_ 
5. commit changes → merged 

Done + the PR disappears, too. 

### 2. sources
* [Visual Studio Code Extensions using CodeLens](https://code.visualstudio.com/blogs/2017/02/12/code-lens-roundup)
