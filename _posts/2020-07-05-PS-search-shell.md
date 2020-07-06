---
layout: post
title: powershell > search in shell
categories: [powershell]
---
## abstract
The concern is documenting the search capabilities of posh

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

[[▶ PLAY]](https://drive.google.com/file/d/1SdUXzUo-dCRAt5zBCrOtiwtx7kZo2s3g/view?usp=sharing)

#### 1.5. use-case —> command history
* with `ctrl+r`

### 2. CTRL-F
* `ctrl-f` is natively really working
* but what is working is `alt+space —> e —> f`

![ctrl+f_deo]({{ site.url }}/assets/img001242.png)