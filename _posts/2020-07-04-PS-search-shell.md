---
layout: post
title: powershell > search in shell
categories: [powershell]
---
## abstract
The concern is documenting the search capabilities of posh with the help of PSFzf module and an alternative way of using the traditional `CTRL-F`

## video
## contents
<!-- TOC -->

- [1. PSFzf](#1-psfzf)
    - [1.1. install fzf via chocolatey](#11-install-fzf-via-chocolatey)
    - [1.2. install PSFzf module](#12-install-psfzf-module)
    - [1.3. overwrite keybindings in profile](#13-overwrite-keybindings-in-profile)
    - [1.4. usage —> recursive file navigation](#14-usage--recursive-file-navigation)
    - [1.5. use-case —> command history](#15-use-case--command-history)
- [2. CTRL-F](#2-ctrl-f)

<!-- /TOC -->

### 1. PSFzf
#### 1.1. install fzf via chocolatey
* install fzf (chocolatey) with `choco install fzf`

#### 1.2. install PSFzf module
* install PSFzf module with `Install-Module PSFzf -Scope CurrentUser`

#### 1.3. overwrite keybindings in profile
* put the following in the `$profile`

```powershell
Remove-PSReadlineKeyHandler 'Ctrl+r'
Remove-PSReadlineKeyHandler 'Ctrl+t'
Import-Module PSFzf
```

#### 1.4. usage —> recursive file navigation
* with `ctrl+t`

![PSFzf_in_action]({{ site.url }}/assets/img001241.gif)

#### 1.5. use-case —> command history
* with `ctrl+r`

### 2. CTRL-F
* `ctrl-f` is natively **not** really working
* but what **is** working is `alt+space —> e —> f`

![ctrl+f_deo]({{ site.url }}/assets/img001242.png)