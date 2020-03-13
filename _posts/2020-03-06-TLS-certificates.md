---
layout: post
title: Networking > The role of certificates in TLS
categories: [networking]
---
## the case	
the question is, what are certificates and what is their role in the encryption of information transferred over the network 

## toc
<!-- TOC -->

- [history and keys](#history-and-keys)
- [certificate authorities](#certificate-authorities)
- [structure of certs](#structure-of-certs)
- [certificate chains](#certificate-chains)
- [certificate servers](#certificate-servers)
- [signing](#signing)
    - [STEP-1 get server-side](#step-1-get-server-side)
    - [STEP-2 check intermediate certificate](#step-2-check-intermediate-certificate)
    - [STEP-3 check domain name identity](#step-3-check-domain-name-identity)
    - [STEP-4 check expiry date](#step-4-check-expiry-date)
    - [STEP-5 sign](#step-5-sign)

<!-- /TOC -->

## findings
### history and keys
* the authentication aspect requires a **trusted third party to sign server-side digital certificates**
    * ...which used to be expensive in the past
* historically, the full authenticated HTTPS connections were more commonly found only on secured payment transaction services
* TLS uses
    * long-term public and private keys
    * short-term session keys
    * X.509 certificates are used to authenticate the server
    * X.509 is a cryptographic standard defining the format of public key certs
* certs need to be loaded into a website so that people can communicate securely

### certificate authorities
* certs are issued by **CERTIFICATE AUTHORITIES** (CAs)

![comodo_as_certificate_issues]({{ site.url }}/assets/img000490.png)

* your machine needs to **TRUST** a CA
* CA _signs_ a cert 
* When cert is returned, machine validates that it is legitimate by comparing to a list of trusted authorities
* run `certmgr.msc` ➔ trusted root certificate authorities

![trusted_root_certificate_authorities]({{ site.url }}/assets/img000491.png)

* note: firefox manages its own list of trusted authorities
* digital certificate certifies the ownership of a public key by the subject of the name of the certificate

### structure of certs 
* certificate is a _bunch of numbers_
* content
    * high values `p` and `g` for public key exchange
    * certificate chain
    * domain names supported
    * contain expiry dates

### certificate chains
* **CERTIFICATE CHAIN** is a chain of authority in certificates and we can do some mathematics to verify that the certificate was actually issued by a **CA** that is said it was (this verification is **SIGNING**)
    * 3-level-hierarchy
        * root certificate
        * intermediate certificate
        * server certificate
    * math can be done against certificate checking its origin
    * this is **signing**

### certificate servers
* you need **CA SERVER** in order to have a **CERTIFICATE CHAIN**
    * (1) own private like Open-SSL, generating certificate in your own network (also AD CS)
    * (2) **PUBLIC CERTIFICATE AUTHORITY** that is needed is you want to use a public HTTPS server
        * example: Let's Encrypt (changed the business model by bring free)

### signing
* certificate authority server generates **ROOT CERTIFICATE**
    * relatively special needs protection
* root certificate creates **INTERMEDIATE CERTIFICATE** and is signed by the root certificate
    * it allows running a mathematical formula to run against the signature of the intermediate certificate
    * it verifies that it was issued by a root certificate
* intermediate certificate creates **SERVER CERTIFICATE** and signs it
    * it allows running a mathematical formula to run against server certificate to verify that it was issued by an intermediate certificate
* intermediate certificate is sent to the **WEB BROWSER ORGANIZATION**
    * certificate is added to the browser
    * in OS updates, intermediate certificates are included
    * intermediate certificates are on both clients and servers

![intermediate_certificates_both_sides]({{ site.url }}/assets/img000553.png)

* server certificate contains the **DOMAIN NAME**

#### STEP-1 get server-side
* receive a server-side certificate before any data is exchanged

#### STEP-2 check intermediate certificate
* verify that the server-side certificate was issued by the intermediate certificate that says it is
* the intermediate certificate is already in the browser / OS

#### STEP-3 check domain name identity
* there is a domain name embedded within the certificate
* domain in browser address bar must be identical do domain in the certificate
* if failed, warning

#### STEP-4 check expiry date
* check if the date is valid for server-side cert and intermediate certificate

#### STEP-5 sign
* certificate has values `p` and `g` used for public-private key encryption
* ...the math follows that does the signing