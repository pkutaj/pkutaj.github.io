---
layout: post
title: On DNS; Registrar -vs- Hosts -vs- Registry Operators
categories: [networking]
---
## the case	of the DNS WHOIS Lookup
* the question is the basic terminology behind domain name services: 
    * who are central organizations taking care of the domain name registry
    * who are registrars
    * who are hosts
* ... and how to get this information without leaving VSCode, ideally (i.e. with a powershell script and some free-tier of a dedicated web service)

## toc
<!-- TOC -->

- [1. registrars VS hosts vs registry operators](#1-registrars-vs-hosts-vs-registry-operators)
- [2. IANA](#2-iana)
- [3. whois as a protocol](#3-whois-as-a-protocol)
- [4. example: whois in terminal](#4-example-whois-in-terminal)
- [5. demo](#5-demo)
- [6. sources](#6-sources)

<!-- /TOC -->

### 1. registrars VS hosts vs registry operators
* **DOMAIN REGISTRAR** is the **subject** where domain names are finally **purchased**
* **DNS HOST** is the ** service/server** authoritative for hosting your DNS records
    * there are hosting providers that offer domain registration 
    * there are registrars that offer DNS hosting, but the two **should not be confused**
* selecting a domain name is the first step you make when building a web site
* this semantical layer of the internet, technically, computers are connected with IP addresses
* registration means going through 
    1. Purchase a domain from **DNS REGISTRAR**, which is a company/subject that directly deals with the **REGISTRY OPERATORS FOR THE TOP LEVEL DOMAIN**
    2. Registrar makes sure you own the domain by registering it to you with registry operators
    3. You/Registrar need to select a DNS host — at Registrar level you specify the Name Servers hosting your information
    ![registrar-level-settings]({{ site.url }}/assets/img002433.jpg)
    4. DNS host stores the **ZONE FILE** containing all the DNS records about your DOMAIN. If the example below would have a different registrar and host, the interface would differ there. 
    ![registrar-level-settings]({{ site.url }}/assets/img002434.jpg)

![NS-hold-zone-files]({{ site.url }}/assets/img002230.png)

* the global list of domain names is managed by **IANA** (International Assigned Numbers Authority)

### 2. IANA
* **IANA** is a department of **ICANN** (Internet Corporation for Assigned Names and Numbers) a nonprofit running the root zone management in the DNS
* `whois` command is querying the domain name registry
* but the registrar is too up in the hierarchy to the common customers
* usually, a domain name is purchased through a **WEB HOSTING PROVIDER** that does the work for them and register a domain through the registries on the customer's behalf
* **DNS HOST** are servers hosted by **DNS HOSTING PROVIDERS** and these servers authoritatively respond for your domain
* Sometimes, registrars also offer DNS hosting, but it should not be confused
* DNS Host is mentioned by names of nameservers in the **NAMESERVERS** part of the whois lookup

### 3. whois as a protocol
* whois is a query and response protocol for querying DBs storing **registered** users/assignees of internet resources (domain names, IP address blocks)
* `whois` is a standard drafted by the internet society
* `whois` gets you info on the registrar-level
* `nslookup` gets you info on the dns-host-level (zone file information)
* documented in [RFC 3912 - WHOIS Protocol Specification](https://tools.ietf.org/html/rfc3912)


### 4. example: whois in terminal
* the following script is creating and parsing a `whois` request
* **note:** it is relying on [jsonwhois.io](https://jsonwhois.io) where you need to register to get your own `$apiKey`

```powershell
<# TODO: BRANCH BASED ON THE POWERSHELL VERSION, use invoke-webrequest for non-posh-core #>

param(
    [Parameter(Mandatory = $true)][string]$domainName,
    [string]$apiKey = "JKS2XytCLNfkYg7i490AnSDo4QZ74lxn"
)
$domainIntro = @"

_|___|__                                                
___|___|     mrPaul's WHOIS in Terminal                   
_|___|__                                                
___|___|___|___|___|___|___|___|___|___|___|___|__                    
_|___|___|___|___|___|___|___|___|___|___|___|___|                    

"@

$domainInfo = curl "https://api.jsonwhois.io/whois/domain?key=$apiKey&domain=$domainName" | ConvertFrom-Json
Write-Host $domainIntro -ForegroundColor Cyan

Write-Host "1. THE BASICS" -ForegroundColor Cyan
$domainInfo.result | Select-Object name, created, changed, expires, dnssec, registered | Format-List

Write-Host "2. REGISTRAR" -ForegroundColor Cyan
$domainInfo.result.registrar | Format-List

Write-Host "3. NAMESERVERS`n" -ForegroundColor Cyan
$domainInfo.result.nameservers | Format-List | Write-Host "`n"
```

### 5. demo

```
whois

cmdlet whois.ps1 at command pipeline position 1
Supply values for the following parameters:
domainName: amazon.com
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   850  100   850    0     0    850      0  0:00:01 --:--:--  0:00:01  1158

_|___|__                                                
___|___|     mrPaul's WHOIS in Terminal                   
_|___|__                                                
___|___|___|___|___|___|___|___|___|___|___|___|__                    
_|___|___|___|___|___|___|___|___|___|___|___|___|                    

1. THE BASICS

name       : amazon.com
created    : 1994-11-01 05:00:00
changed    : 2019-05-07 20:09:37
expires    : 2024-10-31 04:00:00
dnssec     : True
registered : True


2. REGISTRAR

id    : 292
name  : MarkMonitor Inc.
email :
url   :


3. NAMESERVERS
NS1.P31.DYNECT.NET
NS2.P31.DYNECT.NET
NS3.P31.DYNECT.NET
NS4.P31.DYNECT.NET
PDNS1.ULTRADNS.NET
PDNS6.ULTRADNS.CO.UK
```

### 6. sources
* [WHOIS - Wikipedia](https://en.wikipedia.org/wiki/WHOIS)
* [who_is_script]({{ site.url }}/assets/2020-03-03-whoisapi.ps1)
* [NetScanTools® Inside Out: Tip: Find Root DNS for a Top Level Domain](https://netscantools.blogspot.com/2011/03/tip-find-root-dns-for-top-level-domain.html)
