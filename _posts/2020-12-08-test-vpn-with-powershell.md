---
layout: post
title:
categories: []
---
## usecase
The concern is documenting my attempts to automatically authenticate to hashicorp stack with the start of the terminal — but sometimes I am out of VPN. The need is to check for VPN fast

<!-- TOC -->

- [1. find the VPN adapter](#1-find-the-vpn-adapter)
- [2. use the bracket notation to check for properties](#2-use-the-bracket-notation-to-check-for-properties)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. find the VPN adapter 
* go to network and sharing center

>Control Panel\Network and Internet\Network Connections

* rename the VPN adapter to `vpn`, see below

![vpn_adapter]({{ site.url }}/assets/img002337.png)

### 2. use the bracket notation to check for properties
* connected to the VPN is `up`
* disconnedted is `disconnected`, for example (the alias is already renamed adapter):

```
(Get-NetIPConfiguration -InterfaceAlias "vpn").NetAdapter.status
Disconnected
```

### 3. sources
* [Breaking out of a PS command after a certain amount of time? : PowerShell](https://www.reddit.com/r/PowerShell/comments/3h1xoy/breaking_out_of_a_ps_command_after_a_certain/)
* [PowerShell Equivalent Cmdlets for IPConfig, PING, and NSLookup - Next of Windows](https://www.nextofwindows.com/powershell-equivalent-cmdlets-for-ipconfig-ping-and-nslookup)
