---
layout: post
title: git > undo deletion by mistake
categories: [git]
---
## use-case
The concern is documenting the immediate recovery of file deleted by mistake in the working area. Give me back the last commit! 

![recover_deleted]({{ site.url }}/assets/img001543.png)

## contents
<!-- TOC -->

- [1. get sha with git lot --full-history -all <filename>](#1-get-sha-with-git-lot---full-history--all-filename)
- [2. recover with git checkout <sha> <file-name>](#2-recover-with-git-checkout-sha-file-name)

<!-- /TOC -->

### 1. get sha with git lot --full-history -all <filename>
* use the following the get the SHA of the requested commit
* it also gives the author / timestamp of the commit (version to be recovered)

```
git log --pretty=format:\"%C(auto)%h%d%Creset %C(cyan)(%ci)%Creset %C(green)%cn <%ce>%Creset %s\" --name-status --date=short --all --full-history -- <file-name>
```
![recover_deleted]({{ site.url }}/assets/img001545.png)

### 2. recover with git checkout <sha> <file-name>
* use the retrieved <sha> to recover file with `git checkout` 

```
git checkout <sha> <filename>
```

![done]({{ site.url }}/assets/img001547.png)
![recovered]({{ site.url }}/assets/img001548.png)
