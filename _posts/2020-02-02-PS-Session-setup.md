---
layout: post
title: PowerShell > on sessions
categories: [powershell]
---
## the case	
the question is, how to setup and dispose a PS session

## findings

```powershell
<# SETUP #>
Set-ExecutionPolicy RemoteSigned
$UserCredential = Get-Credential
$Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri https://outlook.office365.com/powershell-liveid/ -Credential $UserCredential -Authentication Basic -AllowRedirection
Import-PSSession $Session
<# WORK, just an example of setting a mailbox policy #>
New-OWAMailboxPolicy OWAOnSendAddinAllUserPolicy
Get-OWAMailboxPolicy OWAOnSendAddinAllUserPolicy | SetOWAMailboxPolicy –OnSendAddinsEnabled:$true
Get-User -Filter {RecipientTypeDetails -eq 'UserMailbox'}|SetCASMailbox -OwaMailboxPolicy OWAOnSendAddinAllUserPolicy
<# DISPOSAL #>
Remove-PSSession $Session
```