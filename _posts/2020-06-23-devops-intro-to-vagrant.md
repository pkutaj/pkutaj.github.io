---
layout: post
title: devops > intro to vagrant
categories: [devops]
---
## abstract
The concern is documenting the first experiences and points of using vagrant 

## video
## contents
<!-- TOC -->

- [1. setting up dev env](#1-setting-up-dev-env)
- [2. revive a project from 2 years ago](#2-revive-a-project-from-2-years-ago)
- [3. container...](#3-container)
- [4. commands](#4-commands)
    - [reload](#reload)
    - [ssh-config](#ssh-config)
- [5.  you realize that you can connect to this from various angles](#5--you-realize-that-you-can-connect-to-this-from-various-angles)
- [6.  mounting shares ?](#6--mounting-shares-)
- [found MS doc](#found-ms-doc)
- [provision](#provision)
- [7. sources](#7-sources)

<!-- /TOC -->

### 1. setting up dev env
* vagrant is here to remove the necessity of setting up development environments
* instead of pouring over documents and set up everything manually, you would
    1. clone a repo
    2. run `vagrant up` to get project up and running 

### 2. revive a project from 2 years ago
* vagrant is here to recreate the whole environment from the past
    * same OS as production
    * same config as productino
* ... without sacrificing the tools of your choice

### 3. container...
* you have a container that you spin up when you need it without poluting your own machine 
* you have a dev environment for the project
* now you have virtualization environments that abstracts pain
* it automatically installs all the software-per-project

### 4. commands
#### reload
* used after changes to `vagrantfile` have been done

#### ssh-config
* get your confid

```
Host support-tools
  HostName 172.18.101.179
  User vagrant
  Port 22
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile C:/Users/Admin/Documents/workspace/SNOW/support-tools/.vagrant/machines/support-tools/hyperv/private_key
  IdentitiesOnly yes
  LogLevel FATAL
  ForwardAgent yes
```

### 5.  you realize that you can connect to this from various angles
* ✔️ hyperv manager
* ✔️ mremoteNG
* ✔️ powershell itself
* I am running `Ubuntu 18.04.3 LTS`

### 6.  mounting shares ? 
* [How to Mount a SMB Share in Ubuntu – Zadara Storage Support](https://support.zadarastorage.com/hc/en-us/articles/213024986-How-to-Mount-a-SMB-Share-in-Ubuntu)

### found MS doc
* [Vagrant and Hyper-V -- Tips and Tricks | Microsoft Docs](https://docs.microsoft.com/en-us/virtualization/community/team-blog/2017/20170706-vagrant-and-hyper-v-tips-and-tricks)
* Vagrant doesn't know how to set up networking on Hyper-V right now (unlike other providers), so it's up to you to get things working the way you like them. 
* Realize that Vagrant is using SMBv1 protocol that is by default disabled
* Check what with `Get-SmbServerConfiguration`

```
AnnounceComment                 :
AnnounceServer                  : False
AsynchronousCredits             : 64
AuditSmb1Access                 : False
AutoDisconnectTimeout           : 15
AutoShareServer                 : True
AutoShareWorkstation            : True
CachedOpenLimit                 : 10
DurableHandleV2TimeoutInSeconds : 180
EnableAuthenticateUserSharing   : False
EnableDownlevelTimewarp         : False
EnableForcedLogoff              : True
EnableLeasing                   : True
EnableMultiChannel              : True
EnableOplocks                   : True
EnableSecuritySignature         : False
EnableSMB1Protocol              : False #🠈🠈
EnableSMB2Protocol              : True
EnableStrictNameChecking        : True
EncryptData                     : False
```

### provision
* provisioning means running a set of commands during the build of your environment
* this is set up in `.vagrantfile`
* use `config.vm.provision` method call. 

```
Vagrant.configure("2") do |config|
  # ... other configuration

  config.vm.provision "shell", inline: "echo hello"
end
```

—  from <https://www.vagrantup.com/docs/provisioning/basic_usage>

### 7. sources