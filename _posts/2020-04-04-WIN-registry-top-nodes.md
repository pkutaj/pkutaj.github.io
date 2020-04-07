---
layout: post
title: Windows > HKCU, HKLM, HKCR
categories: [windows]
---

## the case	of the registry hierarchization
the question is the basic conceptualization of the top nodes in windows registry

## toc
<!-- TOC -->

- [on Hives](#on-hives)
- [HKLM: the master](#hklm-the-master)
- [HKCU: the servant](#hkcu-the-servant)
- [HKCR: is just a view?](#hkcr-is-just-a-view)
- [sources](#sources)

<!-- /TOC -->

## findings

>Class registration and file name extension information are stored under both the HKEY_LOCAL_MACHINE and HKEY_CURRENT_USER keys. The HKEY_LOCAL_MACHINE\Software\Classes key contains default settings that can apply to all /users on the local computer. The HKEY_CURRENT_USER\Software\Classes key contains settings that apply only to the interactive user. The HKEY_CLASSES_ROOT key provides a view of the registry that merges the information from these two sources. HKEY_CLASSES_ROOT also provides this merged view for applications designed for previous versions of Windows.

### on Hives
* A hive is a logical group of keys, subkeys, and values in the registry that has a set of supporting files loaded into memory when the operating system is started or a user logs in.

Registry hive               | Supporting files
----------------------------|-------------------------------------------
HKEY_CURRENT_CONFIG         | System, System.alt, System.log, System.sav
HKEY_CURRENT_USER           | Ntuser.dat, Ntuser.dat.log
HKEY_LOCAL_MACHINE\SAM      | Sam, Sam.log, Sam.sav
HKEY_LOCAL_MACHINE\Security | Security, Security.log, Security.sav
HKEY_LOCAL_MACHINE\Software | Software, Software.log, Software.sav
HKEY_LOCAL_MACHINE\System   | System, System.alt, System.log, System.sav
HKEY_USERS\.DEFAULT         | Default, Default.log, Default.sav

### HKLM: the master
* HKLM is the 'master' key
* Windows (or an app) would first look in HKCU for the current user’s settings, if its present, it'll use it. 
* If a particular value isn't set in the HKCU, it'll get it from HKLM

### HKCU: the servant
* settings that apply only to the interactive user

### HKCR: is just a view?
* HKEY_CLASSES_ROOT (abbrev. HKCR, not to be confused with HKCU, HKEY_CURRENT_USER) is a merged view of the ...\Software\Classes sub hierarchies in HKLM and HKCU.
* This is actually documented, although it is not linked from the COM docs you refer to

### sources
* <https://stackoverflow.com/a/55118854/11082684>