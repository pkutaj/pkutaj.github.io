---
layout: post
title: PowerShell > Import-module (advanced functions as cmdlets)
categories: [powershell]
---
## abstract
the question is, how to import advanced functions and use them as cmdlets. the point is to use `import-module` 

## toc
<!-- TOC -->

- [import-module alias ipmo](#import-module-alias-ipmo)
- [sources](#sources)

<!-- /TOC -->

## findings
### import-module alias ipmo
* <https://stackoverflow.com/a/36758913/11082684>
* the illustration from testSSL server support
* use `import-module .\2020-02-14-DRAFT-Test-ServerSSLSupport.ps1 -force`
* afterward, you can use the function within the session
* to make this persistent put the command inside the profile (via `invoke-item $profile` or you may need to create one)

```
Windows PowerShell
Copyright (C) 2016 Microsoft Corporation. All rights reserved.

PS C:\Users\admin\Documents\pavol.kutaj> import-module .\Test-ServerSSLSupport.ps1
PS C:\Users\admin\Documents\pavol.kutaj> "localhost" | Test-ServerSSLSupport


HashAlgorithm : Sha384
KeyExhange    : 44550
TLSv1_1       : False
SSLv3         : False
Host          : localhost
SSLv2         : False
Port          : 443
TLSv1_0       : False
TLSv1_2       : True
```

### sources
* [Test web server SSL/TLS protocol support with PowerShell - PKI Extensions](https://www.sysadmins.lv/blog-en/test-web-server-ssltls-protocol-support-with-powershell.aspx)