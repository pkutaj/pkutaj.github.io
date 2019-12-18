---
layout: post
title: .NET > Check Version
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