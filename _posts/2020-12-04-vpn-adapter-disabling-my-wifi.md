---
layout: post
title:
categories: []
---
## usecase
The concern is documenting an issue with TAP Open VPN network adapter that was disabling my wifi adapter. 

<!-- TOC -->

- [1. wireless switching service?](#1-wireless-switching-service)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. wireless switching service?
* took many different steps: drivers reinstall, bios checks,but finally just ran 

```powershell
stop-service `LanWlanWwanSwitchingServiceUWP`
set-service `LanWlanWwanSwitchingServiceUWP` -startuptype disabled
```

### 2. sources
* [Wi-Fi drops when connecting to the VPN - OVPN.com](https://www.ovpn.com/en/faq/troubleshooting/wi-fi-drops-when-connecting-to-the-vpn)
* [Enable/Disable a Service via PowerShell - Risual](https://www.risual.com/2011/06/enabledisable-a-service-via-powershell/)
