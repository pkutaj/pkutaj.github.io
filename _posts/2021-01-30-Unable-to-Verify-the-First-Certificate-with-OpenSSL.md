---
layout: post
title: Unable to Verify the First Certificate with OpenSSL
categories: [ntw]
---
## usecase
The concern is documenting the error

```
verify error:num=21:unable to verify the first certificate
```

encontered when validating a certificate chain with openSSL. This is the powershell script I've been using

```powershell
function test-certificate($domain, $contextLength = 10) {
    
    $domain += ":443"
    echo "q" | openssl s_client -connect $domain | openssl x509 -noout -enddate | sls "notAfter.*"
    echo "q" | openssl s_client -connect $domain | sls "certificate chain" -Context $contextLength
    write-host "~~~" -ForegroundColor darkcyan
    write-host "If needed, pass a desired output length after domainname" -ForegroundColor darkcyan
}
```

<!-- TOC -->

- [1. definition](#1-definition)
- [2. fix](#2-fix)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. definition
> it means exactly what it says … that chain of trust is broken right from the start. Typically it might happen if you fail to include intermediate certificates, or if you supply the wrong intermediate certificate.

* Of course browsers and most of HTTP clients can download this certificate from the Certificate Authority server, but not all HTTP clients may be able to do so (openSSL does not by default, etc.)
* The issue is succinctly described in the introduction of an article [Verify certificate chain with OpenSSL](https://www.itsfullofstars.de/2016/02/verify-certificate-chain-with-openssl/). 
* To see, you can also test any domain in [SSL Server Test](https://www.ssllabs.com/ssltest).
* Even though the browser shows the certificates to be OK monitoring systems can ring an alert with messages such as 

![sslLabs_check]({{ site.url }}/assets/img002529.jpg)


```
x509: certificate signed by unknown authority
```

### 2. fix

* upload all intermetiate certificates on the server as well and send them along with each request with the server certificate

### 3. sources
* [SSL certificate chain resolver | certificatechain.io](https://certificatechain.io/)
* [SSL Server Test](https://www.ssllabs.com/ssltest)
* [Verify certificate chain with OpenSSL](https://www.itsfullofstars.de/2016/02/verify-certificate-chain-with-openssl/)
