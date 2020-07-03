---
layout: post
title: ps > search shell 
categories: [powershell]
---
## abstract
The concern is documenting searching within the console — with the use of the PSFzf module or, plainly, with `ctrl-f` accessed via `alt+space — e — f`

## contents
<!-- TOC -->

- [1. PSFzf](#1-psfzf)
    - [1.1. install fzf (chocolatey)](#11-install-fzf-chocolatey)
    - [1.2. install PSFzf module](#12-install-psfzf-module)
    - [1.3. overwrite keybindings in $profile](#13-overwrite-keybindings-in-profile)
    - [usage: recursive file navigation](#usage-recursive-file-navigation)
    - [use-case: command history](#use-case-command-history)
- [2.  CTRL-F](#2--ctrl-f)

<!-- /TOC -->
### 1. PSFzf

#### 1.1. install fzf (chocolatey)

```
choco install fzf
```

#### 1.2. install PSFzf module

```
Install-Module PSFzf -Scope CurrentUser
```

#### 1.3. overwrite keybindings in $profile
* put the following in the `$profile`

```
Remove-PSReadlineKeyHandler 'Ctrl+r'
Remove-PSReadlineKeyHandler 'Ctrl+t'
Import-Module PSFzf
```

#### usage: recursive file navigation
* with `ctrl+t`

![file_search]({{ site.url }}/assets/img001241.gif)

#### use-case: command history
* with `ctrl+r`

### 2.  CTRL-F
* is not really working
* but what is working is `alt+space —> e —> f`

— <https://superuser.com/a/1260556/1083809>

![ctrl_f_in_powershell]({{ site.url }}/assets/img001242.png)