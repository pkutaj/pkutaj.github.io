---
layout: post
title: networking > openSSL
categories: [networking]
---
### 1. abstract
The concern is to document the purpose of openSSL

## contents
<!-- TOC -->

- [1. abstract](#1-abstract)
- [2. what is](#2-what-is)
- [3. create CA server](#3-create-ca-server)
- [4. create CSR](#4-create-csr)

<!-- /TOC -->

### 2. what is
> OpenSSL is a commercial-grade tool developed under an Apache-style license. It is a full-featured cryptography & SSL / TLS toolkit commonly used to create certificate signing requests needed by a certificate authority (CA). OpenSSL can create private keys, sign certificates, generate certificate signing requests (CSR), and much more.

— [Getting Started with OpenSSL and PowerShell [Tutorial]](https://adamtheautomator.com/openssl-powershell/)

### 3. create CA server
* this library allows you to generate certificates in your own network 
* ... no one else on the internet will be able to verify them, but intranet-wise, this flies
* Every device includes something called a root store

### 4. create CSR
* certificate signing request is a file requiring the signature of a certificate
* you are requesting the issue of the confirmation that the certificate has been issued by the public certificate authority
* for this you generate a file with `.csr` that looks something like
* the command : 

```
 openssl req -new -newkey rsa:2048 -nodes -keyout mydomain.key -out mydomain.csr
```

* the `mydomain.csr` file

```
-----BEGIN CERTIFICATE REQUEST-----
MIIC4jCCAcoCAQAwgZwxCzAJBgNVBAYTAkdCMRcwFQYDVQQIDA5HcmVhdGVyIExv
bmRvbjEPMA0GA1UEBwwGTG9uZG9uMQ8wDQYDVQQKDAZGb29CYXIxHTAbBgNVBAsM
FFRlY2huaWNhbCBPcGVyYXRpb25zMRIwEAYDVQQDDAkqLmZvby5jb20xHzAdBgkq
hkiG9w0BCQEWEHBrdXRhakBnbWFpbC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQDm+tsghnqMzLKw7V0jI2Xb5U++OCDQX4G1WyESF3Axs7XW+91k
gWdQDU6eu+F0GKdM08gT7yDJrw/WUlvsVyJ+MXX3nHPSJ05IP/6XMQBICVRKqAnA
vlJNfUTvgT1GBfaWbdwzvBmvG30l6Gvg7t2im+CNTmz7ZJ/Lf/EVv3UW7p80tqeu
WBrOSyvRLV9sEfUUClzsEXcxC1wWpn3KhYMmwUILgx82/juXJqWjvbevEoqT6t6/
PAtMG1vV9PIOPTDJMAiD3kM/QfS+i9vyexuICx6Wcj35i+TBQPIfrjXWaulhnzgA
kOivDF0oTclETzdtRB9nXCoxEt3vTTPEbHIXAgMBAAGgADANBgkqhkiG9w0BAQsF
OAiqxfAnlVkNx3Ws6FJjAlT8gwDP6wtWtAlMstUuP9lP+djb1UQx/g88uhHbQXTv
W4rJMeEbqd/REWrCT9ozVVOhBM8v4oNEmMMzwwiLaAPod4k6QoluAcCFdJJ2jHDE
AvUP81jxu/Q6mKwwKdpwCjGAofrlYXHR7dmlIs108bPYbHriwzFnLblFNhz+pslI
QkSfQz6RWi2a6yWfG1PVWjFNYu5onA==
-----END CERTIFICATE REQUEST-----
```

* the activation is done at the public certificate authority
* e.g. see [SSL certificate activation and installation for domain(s) hosted on Nameche](https://www.namecheap.com/support/knowledgebase/article.aspx/804/69/ssl-certificate-activation-and-installation-for-domains-hosted-on-namecheap-hosting-servers)
