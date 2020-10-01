---
layout: post
title: 
categories: []
---
## usecase
The concern is documenting sending emails from CLI which I use to quick sending emails to myself as not to distract myself from the task-at-hand when an idea arrives

<!-- TOC -->

- [1. Allow less secure apps](#1-allow-less-secure-apps)
- [2. Script](#2-script)
- [3. Demo](#3-demo)

<!-- /TOC -->

### 1. Allow less secure apps
* go to [Less secure app access](https://myaccount.google.com/lesssecureapps) 
* toggle the switch to allow 

![less_secure_apps]({{ site.url }}/assets/img001925.png)

### 2. Script
* here's the script, with hardcoded to and from, since I am sending emails to myself and using inbox as todo list

```powershell
function sendEmail {
    $from = "foo@bar.com"
    $to = "lorem@ipsum.com"
    $password = ConvertTo-SecureString -String "password_to_from_account" -AsPlainText -Force 
    $subject = Read-Host "enter TODO"
    $smtpServer = "smtp.gmail.com"
    $credentials = New-Object Management.Automation.PSCredential -ArgumentList $from, $password
    Send-MailMessage -From $from -To $to[$i] -Subject $subject -SmtpServer $smtpServer -Credential $credentials -Verbose -UseSsl -BodyAsHtml -Encoding "Unicode"
    cls
    Write-Host "the raven flew to" $to[$i];
}
```

### 3. Demo

![send_email_as_todo]({{ site.url }}/assets/2020-10-01-62.gif)
