---
layout: page
---

## SUPPORT ENGINEER TECHNICAL TEST
Dear friends at Snowplowanalytics, 

please find the solution to the Support Engineer Technical Test below.  
Looking forward to hearing from you!  

Thanks,  
Pavol  
[pavol@kutaj.com](pavol@kutaj.com)


## contents
<!-- TOC -->

- [(1) DNS](#1-dns)
    - [Registrar and Hosting: IONOS & AWS](#registrar-and-hosting-ionos--aws)
    - [IP Address of a Web Server: On DNS Failover and CDNs](#ip-address-of-a-web-server-on-dns-failover-and-cdns)
    - [Mails, MX Records and Preference Number: GOOGLE](#mails-mx-records-and-preference-number-google)
- [(2) SSL](#2-ssl)
    - [Issuer](#issuer)
    - [Expiration](#expiration)
    - [Validity for subdomains](#validity-for-subdomains)
    - [Compare certificates](#compare-certificates)
- [(3) SQL](#3-sql)
    - [case 1: COUNT](#case-1-count)
    - [case 2: JOIN](#case-2-join)
    - [case 3: SELECT * INTO /  INSERT INTO](#case-3-select--into---insert-into)
- [(4) Scripting](#4-scripting)
- [(5) JSON](#5-json)
    - [Correction](#correction)
    - [Validation](#validation)
- [(6) WEB](#6-web)

<!-- /TOC -->

## findings
### (1) DNS
#### Registrar and Hosting: IONOS & AWS
> Where is the domain name **snowplowanalytics.com** registered

> Where is the domain name **snowplowanalytics.com** hosted

* I wrote a [script]({{ site.url }}/assets/2020-03-03-whoisapi.ps1) to get the following results for WHOIS Lookup and got the following results
    * I'm using the free tier of [JsonWhois - Domain availability API and IP geolocation API](https://jsonwhois.io/) to run this from the integrated terminal of VSCode 


```

_|___|__                                                
___|___|     mrPaul's WHOIS in Terminal                   
_|___|__                                                
___|___|___|___|___|___|___|___|___|___|___|___|__                    
_|___|___|___|___|___|___|___|___|___|___|___|___|                    

1. THE BASICS

name       : snowplowanalytics.com
created    : 2012-03-14 11:07:15
changed    : 2019-03-15 07:23:29
expires    : 2020-03-14 11:07:15
dnssec     : True
registered : True


2. REGISTRAR

id    : 83
name  : 1&1 IONOS SE
email :
url   :


3. NAMESERVERS

NS-1292.AWSDNS-33.ORG
NS-2027.AWSDNS-61.CO.UK
NS-54.AWSDNS-06.COM
NS-653.AWSDNS-17.NET

```

* `snowplowanalytics.com` is registered at **1&1 IONOS SE**
* `snowplowanalytics.com` is hosted at **AWS** (Amazon Web Services)

#### IP Address of a Web Server: On DNS Failover and CDNs
> Where is the domain name **snowplowanalytics.com** hosted

* the domain is a **balanced domain** listening on multiple IP Addresses
* the answer a question what is the IP address of the web server is a bit more complicated
    * AWS provides both high availability and CDN
    * the actual IP address is relative to time and space
    * for example, I am running typical Powershell command `Resolve-DnsName -Name snowplowanalytics.com -Type A` from Slovakia
    * there are 4 IP addresses so that in a case of an outage of one server, the site would still be accessible


```
snowplowanalytics.com                          A      60    Answer     143.204.101.96
snowplowanalytics.com                          A      60    Answer     143.204.101.120
snowplowanalytics.com                          A      60    Answer     143.204.101.88
snowplowanalytics.com                          A      60    Answer     143.204.101.13
```

* if you navigate to [Global DNS Propagation Checker for snowplowanalytics.com A records](https://www.gdnspc.com/#A&snowplowanalytics.com), you will find that AWS provides that set of 4 IP addresses per zone

![snowplow_global_dns_check]({{ site.url }}/assets/2020-03-03-high-availability-CDN.gif)

#### Mails, MX Records and Preference Number: GOOGLE
> What company manages emails for the domain **snowplowanalytics.com**

* **GOOGLE** is managing email for snowplowanalytics, as seen in the `MX` DNS records
* MX stands for **Mail Exchanger Record**
* run `Resolve-DnsName -name snowplowanalytics.com -type MX | select * | format-table` to see that email is managed by Google
* the highest priority to handle the incoming emails has the server with the lowest preference number, in this case, `aspmx.l.google.com`

```
QueryType Exchange                NameExchange            Preference Name                  Type CharacterSet Section DataLength TTL
--------- --------                ------------            ---------- ----                  ---- ------------ ------- ---------- ---
       MX aspmx2.googlemail.com   aspmx2.googlemail.com           10 snowplowanalytics.com   MX      Unicode  Answer         16 281
       MX alt1.aspmx.l.google.com alt1.aspmx.l.google.com          5 snowplowanalytics.com   MX      Unicode  Answer         16 281
       MX alt2.aspmx.l.google.com alt2.aspmx.l.google.com          5 snowplowanalytics.com   MX      Unicode  Answer         16 281
       MX aspmx3.googlemail.com   aspmx3.googlemail.com           10 snowplowanalytics.com   MX      Unicode  Answer         16 281
       MX aspmx.l.google.com      aspmx.l.google.com               1 snowplowanalytics.com   MX      Unicode  Answer         16 281
```

* the case is documented in

### (2) SSL
#### Issuer
> Who issued SSL certificate installed for **https://snowplowanalytics.com?**

* The certificate for this TLS 1.2 encrypted site was issued by **AMAZON**

![amazon_as_certificate_issuer]({{ site.url }}/assets/img000557.png)

#### Expiration
> When does the certificate expire?

* The certificate issued for **https://snowplowanalytics.com** will expire on **FEBRUARY 7, 2021**

![expiration_of_certificate]({{ site.url }}/assets/img000558.png)

#### Validity for subdomains
>Is the certificate valid if installed for the website **https://discourse.snowplowanalytics.com?** Why?

* The certificate issued by Amazon is a **WILDCARD CERTIFICATE** issued for `*.snowplowanalytics.com`
* That means that all clients will treat this as a valid for any domains that end with `snowplowanalytics.com`

![wildcare_certificats]({{ site.url }}/assets/img000559.png)

* The answer is, therefore, **YES**, if installed for the website <https://discourse.snowplowanalytics.com>, the certificate would be **VALID**

#### Compare certificates
>Are the certificates installed with **https://snowplowanalytics.com** and **https://discourse.snowplowanalytics.com** the same?

* The certificates are **NOT THE SAME**
* As seen above, the certificate for the main domain name was issued by **AMAZON**
* The certificate of <https://discourse.snowplowanalytics.com> was issued by **LET'S ENCRYPT AUTHORITY X3**
    * by the way, it is a newer version of the encryption protocol (TLS 1.3) and it is also free

![lets_encrypt_issuer_or_another_certificate]({{ site.url }}/assets/img000563.png)

### (3) SQL
#### case 1: COUNT
> Count all the records that have the value **`page_view`** in the field **`event`** of the **`events`** table in **`atomic`** schema.

```sql
SELECT COUNT(event)
  FROM atomic.events
 WHERE event = 'page_view`
```
#### case 2: JOIN
> There are 2 tables which share the same field **`id`**. Select first 100 records from both tables, **`events`** and **`contexts`**, where the values of the field **`id`** match.

```sql
SELECT TOP 100 *
  FROM events AS e
  JOIN contexts AS c
    ON e.Id = c.Id
```

#### case 3: SELECT * INTO /  INSERT INTO
> Copy records for which **`timestamp`** field equals “2017-10-05 00:11:54” from **`events`** table into table **`events_new`** in **`atomic`** schema.

* based on the table names, it is quite safe to infer that tables have the same structure


* if the **`events_new`** table is created by the query

```sql
SELECT * 
  INTO atomic.events_new
  FROM atomic.events
 WHERE timestamp = '2017-10-05 00:11:54';
```
![create_new_table_based_on_criteria_from_other_table]({{ site.url }}/assets/img000551.png)

* if the **`events_new`** table already exists

```sql
INSERT INTO atomic.events_new
SELECT *
  FROM atomic.events
WHERE timestamp = '2017-10-05 00:11:54';
```
* if there is an identity column in **`events_new`** we may get a following error

>An explicit value for the identity column in table 'fooDB.atomic.events_new' can only be specified when a column list is used and IDENTITY_INSERT is ON.

* the solution is to follow what is written in the error
    * set the `IDENTITY_INSERT` for the given table to `ON`
    * use a column list in the `INSERT INTO` statement

```sql
SET IDENTITY_INSERT atomic.events_new ON
INSERT INTO atomic.events_new ([id], [c2], [c3], [c4], [c5])
SELECT *
  FROM atomic.events
WHERE timestamp = '2017-10-05 00:11:54';
```

### (4) Scripting
> The data in JSON format is available via URI **http://jsonplaceholder.typicode.com/** users. Using one of the scripting languages below print out the list of the cities: bash, Python, Ruby, Perl

* I would use **GIT BASH** (as I am a Windows/Powershell guy using git on an hourly basis).
* **NOTE:** I would start by installing **[jq]**(https://stedolan.github.io/jq/download/) and place `jq.exe` into my `tools_and_scripts` folder that is reachable globally (see setting environmental variables)
* the rest is a two-liner

```bash
json="$(curl -s http://jsonplaceholder.typicode.com/users)"`
echo $json | jq '.[].address.city'
# RETURNS
# "Gwenborough"
# "Wisokyburgh"
# "McKenziehaven"
# "South Elvis"
# "Roscoeview"
# "South Christy"
# "Howemouth"
# "Aliyaview"
# "Bartholomebury"
# "Lebsackbury"
```

### (5) JSON
#### Correction
> Fix the below JSON. List each correction.

```
 {
    "id": "12345",
    "type": "event"‚
    "name": “click“,
    "12345"; {
        primary: true,
        "image":
            {
                "url": "images/0001.jpg",
                "width": 200,
                "height": 200,
            },
        "thumbnail":
            {
                "url": "images/thumbnails/0001.jpg",
                "width": 32,
                "height": 32
            },
        "root": 'acme.com'
        }
    }
 }
```


* To fix the `.json` file I am using **VISUAL STUDIO CODE**
* there are **7 DETECTED PROBLEMS**

![fix_json_with_code_editor]({{ site.url }}/assets/2020-03-03-fix-json.gif)

* This is the corrected version with an ordered list of corrections made

```js
{
    "id": "12345",
    "type": "event",            //1. proper comma
    "name": "click",            //2. straight quotes instead of curly ones
    "12345": {                  //3. colon instead of semicolon
        "primary": true,        //4. key double-quoted
        "image": {
            "url": "images/0001.jpg",
            "width": 200,
            "height": 200       //5. no comma
        },
        "thumbnail": {
            "url": "images/thumbnails/0001.jpg",
            "width": 32,
            "height": 32
        },
        "root": "acme.com"      //6. double quotes
    }
}                               
                                //7. redundant curly bracket  removed
```

#### Validation
* To validate, I am parsing that fixed JSON with Powershell’s `ConvertFrom-Json` cmdlet. 
    * Note I need to use `Get-Content` to access the resource from the file system
* Passing an incorrect `.json` returns a first error the parser encounters and thus the test **FAILS**

```
Get-Content .\2020-03-03-DRAFT-INCORRECT.json | ConvertFrom-Json 
             
ConvertFrom-Json : Conversion from JSON failed with error: After parsing a value an unexpected character was encountered: ‚. Path 'type', line 3, position 19.
At line:1 char:49
+ Get-Content .\2020-03-03-DRAFT-INCORRECT.json | ConvertFrom-Json
+                                                 ~~~~~~~~~~~~~~~~
+ CategoryInfo          : NotSpecified: (:) [ConvertFrom-Json], ArgumentException
+ FullyQualifiedErrorId : System.ArgumentException,Microsoft.PowerShell.Commands.ConvertFromJsonCommand
```

* After the correction, the `.json` is parsed and thus the test **PASSES**
    
```
Get-Content .\2020-03-03-DRAFT-FIX.json | ConvertFrom-Json

id    type  name  12345
--    ----  ----  -----
12345 event click @{primary=True; image=; thumbnail=; root=acme.com}
```

### (6) WEB
> Insert the AlertifyJS library; it is used to generate dialogues and can be found at http://cdn.jsdelivr.net/npm/alertifyjs@1.11.0/build/alertify.min.js. 

> Insert CSS file hosted at http://cdn.jsdelivr.net/npm/alertifyjs@1.11.0/build/css/alertify.min.css. 

> The AlertifyJS library defines a simple method, alertify.alert(message), where the message is a string representing the message displayed by the alert box. 

> Add Javascript code to pop up an AlertifyJS’s alert box with the message “Well done!” on the button click. 

```html
<!-- HTML -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
    <title>Snowplow</title>
</head>

<body>
    <button id="button">Click Me</button>
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
    <script src="2020-03-05-alertify.js"></script>
</body>

</html>
```

```js
/* JS */
const button = document.getElementById("button")
button.addEventListener("click", event => {
    event.preventDefault();
    alertify.alert("Snowplow Challenge", "Well done!");
});
```
* the demo is available at [A Pen by Pavol Kutaj](https://codepen.io/pkutaj/pen/oNXGZJR)