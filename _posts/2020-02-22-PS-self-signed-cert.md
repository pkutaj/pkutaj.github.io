---
layout: post
title: PowerShell > Self-Signed Certificate
---
## the case	
the exercise is to have a working script that create self-signed certificate protected by a password, exported to the desktop
* adapted and optimized from [Create a self-signed certificate with PowerShell – 4sysops](https://4sysops.com/archives/create-a-self-signed-certificate-with-powershell/)

## toc
<!-- TOC -->

- [CODE](#code)
- [sources](#sources)

<!-- /TOC -->

### CODE

CODE                                                                                                                                       | COMMENT
-------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------
1. `$CertDomainName = Read-Host “Enter the FQDN that the certificate will have as its subject”`                                            | define name
2. `$Cert = New-SelfSignedCertificate -certstorelocation cert:\localmachine\my -dnsname $CertDomainNname -NotAfter (Get-Date).`            | create cert
3. `$pwd_secure_string = Read-Host "Enter a Password" -AsSecureString`                                                                     | enter password as secure string (with asterisks)
4. `$thumbprint = $Cert.Thumbprint`                                                                                                        | certificate's thumbprint
5. `Export-PfxCertificate -cert cert:\localMachine\my\$thumbprint -FilePath $env:USERPROFILE\seDesktop\$CertDomainNname.pfx -Password $pw` | export the certificate to the desktop as a `.pfx` file

```powershell
$CertDomainNname = Read-Host "Enter the FQDN that the certificate will have as its subject"  #1.
Write-Host "Creating Certifcate $CertDomainNname" -ForegroundColor Green 
$Cert = New-SelfSignedCertificate -certstorelocation cert:\localmachine\my -dnsname $CertDomainNname #2
Write-Host "Exporting Certificate $CertDomainNname to $env:USERPROFILE\Desktop\$CertDomainNname.pfx" -ForegroundColor Green
$pwd_secure_string = Read-Host "Enter a Password" -AsSecureString #3
$thumbprint = $Cert.Thumbprint #4.
Export-PfxCertificate -cert cert:\localMachine\my\$thumbprint -FilePath $env:USERPROFILE\Desktop\$CertDomainNname.pfx -Password $pwd_secure_string #5.
```

### sources
* [How To Create a SHA-256 Self-Signed Certificate – Support Topics](https://support.jetglobal.com/hc/en-us/articles/235636308-How-To-Create-a-SHA-256-Self-Signed-Certificate)
* [Create a self-signed certificate with PowerShell – 4sysops](https://4sysops.com/archives/create-a-self-signed-certificate-with-powershell/)

