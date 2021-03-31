## usecase
The concern is documenting sending emails from CLI which I use to quickly sending emails to myself as not to distract myself from the task-at-hand. Just type `eml` and write a `TODO` to get the idea out of your head into the mailbox.

![send_email_as_todo]({{ site.url }}/assets/2020-10-01-62.gif)

<!-- TOC -->

- [1. Allow less secure apps](#1-allow-less-secure-apps)
- [2. Script](#2-script)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. Allow less secure apps
* go to [Less secure app access](https://myaccount.google.com/lesssecureapps) 
* toggle the switch to allow 

![less_secure_apps]({{ site.url }}/assets/img001925.png)

* note that this is not allowed for 2-step verification enabled

### 2. Script
* here's the script, with hardcoded to and from, since I am sending emails to myself and using inbox as todo list
* save a password to your Gmail account into an persistant environmental variable for your user account with 

```powershell
function sendEmail {
    param (
        [int]$i
    )
    $from = "pkutaj@gmail.com"
    $to = "pavol@snowplowanalytics.com"
    $password = ConvertTo-SecureString -String $env:emailPassword -AsPlainText -Force 
    $credentials = New-Object Management.Automation.PSCredential -ArgumentList $from, $password
    $subject = Read-Host "enter TODO"
    $smtpServer = "smtp.gmail.com"
    Send-MailMessage -From $from -To $to[$i] -Subject $subject -SmtpServer $smtpServer -Credential $credentials -Verbose -UseSsl -BodyAsHtml -Encoding "Unicode"
    #cls
    Write-Host "the raven flew to" $to[$i];
}
```

### 3. sources
* [local](2021-03-31-setting-environmental-variables-from-powershell.md)
* [kb/2021-03-31-setting-environmental-variables-from-powershell.md at master · pkutaj/kb](https://github.com/pkutaj/kb/blob/master/powershell/2021-03-31-setting-environmental-variables-from-powershell.md)
