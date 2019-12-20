---
layout: post
title: .NET > version check, downgrade options
---
* Navigate to `\%windir%\Microsoft.NET\FrameWork`
* Open navigating to the directory the latest version number. 
* Run `.\MSBuild.exe -version`
* The last line, after the copyright, will output the most recent verson of .NET Framework on your computer, for example, 4.6.1038.0.

```
C:\Windows\Microsoft.NET\Framework\v4.0.30319> .\MSBuild.exe -version
Microsoft (R) Build Engine version 4.8.3761.0
[Microsoft .NET Framework, version 4.0.30319.42000]
Copyright (C) Microsoft Corporation. All rights reserved.

4.8.3761.0
```

### downgrade
* All versions of the .NET Framework 4 family are in-place upgrades
    * they **replace** previous versions of the .NET Framework 4 family instead of installing side-by-side.
* When installing redistributable versions you must **use the Programs and Features** control panel to uninstall the newer version ➔ re-install the older version afterwards.
* However, some versions of Windows include a version of the .NET Framework 4 family as a part of the operating system. 
    * On those versions of Windows, newer versions of the .NET Framework 4 family will be **installed as OS update packages**, and they must be uninstalled using the Installed Updates control panel.
    * This can be tricky because the OS update packages do not include .NET Framework in the name
    * Need to know the KB number in order to find and uninstall newer versions of the .NET Framework 4 family
    * Or, if you know when you installed the newer version of the .NET Framework, you can sort the Installed Updates control panel by installed date and find it that way.
* Some of the download pages for the .NET Framework 4 family also include information about which exact KB number will be installed on which versions of Windows. 