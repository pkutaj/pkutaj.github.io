## abstract
The concern is documenting reading through the history of changes of a file using git. As I deal with both clients and colleagues who make frequent changes to config files, I quickly need to see the timeline of changes per-file. 

<!-- TOC -->

- [1. VS Code Timeline feature — easiest view of file history](#1-vs-code-timeline-feature--easiest-view-of-file-history)
- [2. VS Code Open in Github Extension](#2-vs-code-open-in-github-extension)
- [3. git log -p](#3-git-log--p)
- [4. file history: who & commit message](#4-file-history-who--commit-message)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. VS Code Timeline feature — easiest view of file history
* In VS Code, run the command

```
Explorer: Focus on Timeline View
```

* Shortcut: _CTRL + SHIFT + P_ → Enter _Timeline_ → Select _Explorer: Focus on Timeline View_

![]({{ site.url }}/assets/img003154.jpg)

### 2. VS Code Open in Github Extension
* Use [Open in GitHub - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-open-in-github)
* Shortcut: _CTRL + SHIFT + P_ → Enter _File History_ → Select _Open in Github: File History_

![]({{ site.url }}/assets/2020-10-02-64.gif)

### 3. git log -p
* this is not git diff
* run `git pull` → fetch & merge potential merges
* run `git log -p <filename>` → see what has been changed

![see_the_change_fast]({{ site.url }}/assets/img001448.png)

### 4. file history: who & commit message

```
git log --pretty=format:"%C(auto)%h%d%Creset %C(cyan)(%ci)%Creset %C(green)%cn <%ce>%Creset %s" --name-status --date=short --all --full-history -- _FILENAME_
```

![show_file_history]({{ site.url }}/assets/img002285.png)

### 5. sources
* <https://stackoverflow.com/a/22412252/11082684>
