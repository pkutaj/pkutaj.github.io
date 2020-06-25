---
layout: post
title: powershell > colors and git with oh-my-posh
categories: [powershell]
---

## abstract
The concern is documenting the colorization of powershell via **oh-my-posh** (a variation on linux-based **oh-my-zsh**). I am strongly advocating for using **Meslo** font and **Avit** theme — but it may be possible to customize as per personal taste, too. The beginning of the terminal looked:

![bw_console]({{ site.url }}/assets/img001211.png)

After all's done:

![colorized_console]({{ site.url }}/assets/img001216.png)

## video
## contents
<!-- TOC -->

- [1. install modules](#1-install-modules)
- [2. change font](#2-change-font)
- [3. set-prompt](#3-set-prompt)
- [4. set-theme](#4-set-theme)
- [5. modify profile](#5-modify-profile)
- [9. sources](#9-sources)

<!-- /TOC -->

### 1. install modules

```
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
```

![install_modules]({{ site.url }}/assets/img001212.png)


### 2. change font
* go to [Releases · ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts/releases)
* download one fo the selected fonts — I go for **Meslo** because it has all unicode characters needed for GIT 
* extract the package into a dedicated folder
* download [install.ps1]({{ site.url }}/assets/install.ps1) and put it into the same folder with extracted fonts
* run `./install.ps1` to import the fonts into Windows
* run the command to install the **MesloLGMDZ Nerd Font Mono** (or the font name of your choice) as a terminal font

```
Set-ItemProperty -Path "Registry::HKEY_CURRENT_USER\Console" -Name "FaceName" -Value "MesloLGMDZ Nerd Font Mono" -Type String;
```

* for **VSCODE integrated terminal users:** add `"terminal.integrated.fontFamily": "MesloLGMDZ Nerd Font Mono",` into `settings.json` to have the font changed also in the integrated terminal 
* restart console (note the change of the typeface — not striking at first)

![new_font]({{ site.url }}/assets/img001213.png)

### 3. set-prompt 
* run `Set-Prompt`

![set_prompt_powershell]({{ site.url }}/assets/img001214.png)

### 4. set-theme
* run `Set-Theme Avit` 
* optionally, run `Get-Theme` to get a list of available themes and try if something else suits you better

![set-theme-avil]({{ site.url }}/assets/img001217.png)

### 5. modify profile
* open your powershell profile with `ii $profile`
* put the following lines at the top of the profile to make the change persistent across sessions

```
Import-Module posh-git
Import-Module oh-my-posh
Set-Theme Avit
```

### 9. sources
* [Make Your PowerShell 7 Truly Powerful - Beyond the Windows - Medium](https://medium.com/rkttu/make-your-powershell-7-truly-powerful-eb56b3fbe37f)