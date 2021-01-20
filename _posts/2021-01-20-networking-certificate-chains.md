---
layout: post
title: networking > certificate chains
categories: [theory]
---

## TOC
<!-- TOC -->

- [1. abstract](#1-abstract)
- [2. Certificate Authority Server (CA)](#2-certificate-authority-server-ca)
- [3. cert chain](#3-cert-chain)
- [4. root cert](#4-root-cert)
- [5. intermediate certificate](#5-intermediate-certificate)
- [6. server cert](#6-server-cert)
    - [6.1. public key](#61-public-key)
    - [6.2. verification information](#62-verification-information)
    - [6.3. URL](#63-url)
    - [6.4. expiry](#64-expiry)
- [7. expiry](#7-expiry)
- [8. sources](#8-sources)

<!-- /TOC -->

### 1. abstract
The aim is documenting the security/networking concept of **certificate chain**

### 2. Certificate Authority Server (CA)
* certificate must be issued by a trusted party called **Certificate Authority Server**
* certificate authority is **public** and acknowledged by **vendors**

### 3. cert chain
* check any certificate within a browser (devtools 🠊 certificate 🠊 certificate path) and see the certificate chain consisting of
    * 1 **root** certificate
    * 1+ **intermediate** certificates 
    * 1 **server** certificate

![certificate_chain_for_server_certs]({{ site.url }}/assets/img001135.png)

* **certificate chain** is a chain of authority in certificates 
* we can do some mathematics to verify that the certificate was actually issued by a **CA** that is said it was (this verification is **SIGNING**)

![intermediate_issues_server]({{ site.url }}/assets/img002450.jpg)

### 4. root cert
* in the order of hundreds (~150) globally

![first_step_ca_creates_root_cert]({{ site.url }}/assets/img002443.jpg)

* offline
* in-OS
* root certs _create_ intermediate certificates (physically on the vendor's side) 
* root certificate _signs_ the intermediate certificate each session to guarantee its origins

![root_cert_in_certmgr.msc]({{ site.url }}/assets/img001136.png)

* you purchase root certificate from verified, publicly available HTTPS CA 
    * Let's Encrypt for Free
    * Verasign
    * Digicert
    ...
* the root certificate verifies that the server you are browsing to is actually the server it declares itself to be

### 5. intermediate certificate
* in the order of thousands 

![root_creates_intermediate]({{ site.url }}/assets/img002444.jpg)

* root certificate creates intermediate certificate
* root signs intermediate certificate with root certificate
* the certificate authority server sends the intermetiade certificate to web browser organization
* also, intermediate certificates are often included in OS updates
* online
    * in-browser
    * downloaded to both client and the server from-CA-server as visualized below
    * only afterwards a server certificate is sent 
    * sometimes, the intermediate cert is sent from the server as well (just in case CA server not accessible)
    * this being recommeneded as a best practice

![root_cert_in_certmgr.msc]({{ site.url }}/assets/img001133.gif)

* intermediate cert creates server cert at the time of its issue 
* intermediate cert _signs_ server cert each session
* if you need to export an intermediary certificate follow [How to Download an Intermediate Cert From Browser – Kemp Support](https://support.kemptechnologies.com/hc/en-us/articles/115002427603-How-to-Download-an-Intermediate-Cert-From-Browser)

### 6. server cert
![intermediate_issues_server]({{ site.url }}/assets/img002444.jpg)
* online
    * in-browser
    * from-endpoint server 
    * contains domain-name 
* passed during the session after it is signed by an intermediary cert
* after it is verified that it is issued by the downloaded intermediate certificate
* ...it is downloaded
* and public-private key exchange can begin

#### 6.1. public key
* 2 large prime numbers used for the public/private key exchange

![public_key]({{ site.url }}/assets/img002448.jpg)

#### 6.2. verification information
* certificate chain of authority that links particular domain(server) certificates to intermetiary to root certificates
* you do computations to verify that certs were actually issued by who they claim to be issued by

#### 6.3. URL
* the domain the are certifying

#### 6.4. expiry
* date

### 7. expiry
* all of the certificates have expiry dates
* usually we talk about server cert expiry
* check the expiry easily with openSSL

```
openssl s_client -connect github.com:443 | openssl x509 -noout -enddate
depth=1 C = US, O = DigiCert Inc, OU = www.digicert.com, CN = DigiCert SHA2 High Assurance Server CA
verify error:num=20:unable to get local issuer certificate
notAfter=May 10 12:00:00 2022 GMT
```

### 8. sources
* [Verify certificate chain with OpenSSL](https://www.itsfullofstars.de/2016/02/verify-certificate-chain-with-openssl/)
* [How to Download an Intermediate Cert From Browser – Kemp Support](https://support.kemptechnologies.com/hc/en-us/articles/115002427603-How-to-Download-an-Intermediate-Cert-From-Browser)
* [Getting Started with OpenSSL and PowerShell](https://adamtheautomator.com/openssl-powershell/)
* [How many intermediate Certificate Authorities are there? - Quora](https://www.quora.com/How-many-intermediate-Certificate-Authorities-are-there)

[openSSLstart]: https://adamtheautomator.com/openssl-powershell
