---
layout: post
title: networking > certificate chains
categories: [theory]
---

## TOC
<!-- TOC -->

- [abstract](#abstract)
- [(1) CA — the issuer](#1-ca--the-issuer)
- [(2) cert chain](#2-cert-chain)
    - [(2.1) root cert](#21-root-cert)
    - [(2.2) intermediate cert](#22-intermediate-cert)
    - [(2.3) server cert](#23-server-cert)
- [(3) expiry](#3-expiry)
- [sources](#sources)

<!-- /TOC -->

### abstract
The aim is documenting the security/networking concept of **certificate chain**

### (1) CA — the issuer
* certificate must be issued by a trusted party called **Certificate Authority Server**
* certificate authority is **public** and acknowledged by **vendors**

### (2) cert chain
* check any certificate within a browser (devtools 🠊 certificate 🠊 certificate path) and see the certificate chain consisting of
    * 1 **root** certificate
    * 1+ **intermediate** certificates 
    * 1 **server** certificate

![certificate_chain_for_server_certs]({{ site.url }}/assets/img001135.png)

* **certificate chain** is a chain of authority in certificates 
* we can do some mathematics to verify that the certificate was actually issued by a **CA** that is said it was (this verification is **SIGNING**)

#### (2.1) root cert
* offline
* in-OS
* root certs create intermediate certificates (physically on the vendor's side) 
* root certificate _signs_ the intermediate certificate each session to guarantee its origins

![root_cert_in_certmgr.msc]({{ site.url }}/assets/img001136.png)

#### (2.2) intermediate cert
* online
    * in-browser
    * from-CA-server OR from endpoint-server
        * this being recommeneded as a best practice

![root_cert_in_certmgr.msc]({{ site.url }}/assets/img001133.gif)

* intermediate cert creates server cert at the time of its issue 
* intermediate cert _signs_ server cert each session
* if you need to export an intermediary certificate follow [How to Download an Intermediate Cert From Browser – Kemp Support](https://support.kemptechnologies.com/hc/en-us/articles/115002427603-How-to-Download-an-Intermediate-Cert-From-Browser)

#### (2.3) server cert
* online
    * in-browser
    * from-endpoint server 
    * contains domain
* passed during the session after it is signed by an intermediary cert
* after it is verified that it is issued by the downloaded intermediate certificate
* ...it is downloaded
* and public-private key exchange can begin

### (3) expiry
* all of the certificates have expiry dates
* usually we talk about server cert expiry

### sources
* [Verify certificate chain with OpenSSL](https://www.itsfullofstars.de/2016/02/verify-certificate-chain-with-openssl/)
* [How to Download an Intermediate Cert From Browser – Kemp Support](https://support.kemptechnologies.com/hc/en-us/articles/115002427603-How-to-Download-an-Intermediate-Cert-From-Browser)
* [Getting Started with OpenSSL and PowerShell](https://adamtheautomator.com/openssl-powershell/)

[openSSLstart]: https://adamtheautomator.com/openssl-powershell