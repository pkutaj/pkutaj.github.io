---
layout: page
---
## the case	of snowplow challenge

## toc
<!-- TOC -->

- [(1) DNS](#1-dns)
    - [Registrar and Hosting: IONOS & AWS](#registrar-and-hosting-ionos--aws)
    - [IP Address of a Web Server: On DNS Failover and CDNs](#ip-address-of-a-web-server-on-dns-failover-and-cdns)
    - [Mails, MX Records and Preference Number: Google](#mails-mx-records-and-preference-number-google)
- [(2) SSL](#2-ssl)
- [(3) SQL](#3-sql)
    - [case 1: COUNT](#case-1-count)
    - [case 2: JOIN](#case-2-join)
    - [case 3: SELECT * INTO /  INSERT INTO](#case-3-select--into---insert-into)
- [(4) Scripting](#4-scripting)
- [(5) JSON](#5-json)
- [(6) WEB](#6-web)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) DNS
#### Registrar and Hosting: IONOS & AWS
* I wrote a [small script](2020-03-03-whoisapi.ps1) to get the following results for WHOIS Lookup and got the following results
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
* the domain is a **balanced domain** listening on multiple IP Addresses
* the answer a question what is the IP address of the web server is a bit more complicated
    * AWS provides both high availability and CDN
    * the actual IP address is relative to time and space
    * for example, I am running typical powershell command `Resolve-DnsName -Name snowplowanalytics.com -Type A` from Slovakia
    * there are 4 IP addresses so that in a case of an outage of one server, the site would still be accessible


```
snowplowanalytics.com                          A      60    Answer     143.204.101.96
snowplowanalytics.com                          A      60    Answer     143.204.101.120
snowplowanalytics.com                          A      60    Answer     143.204.101.88
snowplowanalytics.com                          A      60    Answer     143.204.101.13
```

* if you navigate to [Global DNS Propagation Checker for snowplowanalytics.com A records](https://www.gdnspc.com/#A&snowplowanalytics.com), you will find that AWS provides that set of 4 IP addresses per zone

![snowplow_global_dns_check]({{ site.url }}/assets/2020-03-03-high-availability-CDN.gif)

#### Mails, MX Records and Preference Number: Google
* **Google** is managing email for snowplowanalytics, as seen in the `MX` DNS records
* MX stands for **Mail Exchanger Record**
* run `Resolve-DnsName -name snowplowanalytics.com -type MX | select * | format-table` to see that email is managed by Google
* the highest priority to handle the incoming emails has the server with the lowest preference number, in this case `aspmx.l.google.com`

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
### (3) SQL
#### case 1: COUNT
> Count all the records that have the value `page_view` in the field `event` of the `events` table in `atomic` schema.

```sql
SELECT COUNT(event)
  FROM atomic.events
 WHERE event = 'page_view`
```
#### case 2: JOIN
> There are 2 tables which share the same field `id`. Select first 100 records from both tables, `events` and `contexts`, where the values of the field `id`match.

```sql
SELECT TOP 100 *
  FROM events AS e
  JOIN contexts AS c
    ON e.Id = c.Id
```

#### case 3: SELECT * INTO /  INSERT INTO
> Copy records for which `timestamp` field equals “2017-10-05 00:11:54” from `events` table into table `events_new` in `atomic` schema.
* it is safe to infer that tables have the same structure
* **IDENTITY COLUMN** is a column whole value increases automatically and whose value is created by the server
    * users cannot usually enter values here
    * it is used to uniquely identify rows (primary key)
    * in MS SQL, you provide seed (starting point) and increment
    * [SQL Server IDENTITY System Function Comparison](https://www.mssqltips.com/sqlservertip/5079/sql-server-identity-system-function-comparison/)

![create_new_table_based_on_criteria_from_other_table]({{ site.url }}/assets/img000551.png)

* if the `events_new` table is created by the query

```sql
SELECT * 
  INTO atomic.events_new
  FROM atomic.events
 WHERE timestamp = '2017-10-05 00:11:54';
```
* if the `events_new` table already exists

```sql
INSERT INTO atomic.events_new
SELECT *
  FROM atomic.events
WHERE timestamp = '2017-10-05 00:11:54';
```
* if there is an identity column in `events_new` we may get a following error

>An explicit value for the identity column in table 'fooDB.atomic.events_new' can only be specified when a column list is used and IDENTITY_INSERT is ON.

* the solution is to follow what is written in the error

```sql
SET IDENTITY_INSERT atomic.events_new ON
INSERT INTO atomic.events_new ([id], [c2], [c3], [c4], [c5])
SELECT *
  FROM atomic.events
WHERE timestamp = '2017-10-05 00:11:54';
```

* https://stackoverflow.com/a/12089779/11082684
![add_additional_row_to_an_existing_table]({{ site.url }}/assets/img000552.png)

### (4) Scripting
* To print out a list of cities listed in the `.json` file from the URI  <http://jsonplaceholder.typicode.com/>, I would use bash (git bash, as I am a Windows/Powershell guy using git on a hourly basis).
* **NOTE:** I would start by installing [jq](https://stedolan.github.io/jq/download/) and place `jq.exe` into my `tools_and_scripts` folder that is reachable globally (see setting environental variables)
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

* the case is documented in 

### (5) JSON
* To fix the `.json` file I am using VSCode, there are 7 detected problems

![fix_json_with_code_editor]({{ site.url }}/assets/2020-03-03-fix-json.gif)

* This is the corrected version

```json
{
    "id": "12345",
    "type": "event",
    "name": "click",
    "12345": {
        "primary": true,
        "image": {
            "url": "images/0001.jpg",
            "width": 200,
            "height": 200
        },
        "thumbnail": {
            "url": "images/thumbnails/0001.jpg",
            "width": 32,
            "height": 32
        },
        "root": "acme.com"
    }
}
```

* To validate, I am parsing that fixed JSON with powershell's `ConvertFrom-Json` cmdlet. As you can see below, it passes the test (the `.json` is parsed)
    * Note I need to use `Get-Content` to access the resource from the file system

```
Get-Content .\2020-03-03-DRAFT-FIX.json | ConvertFrom-Json

id    type  name  12345
--    ----  ----  -----
12345 event click @{primary=True; image=; thumbnail=; root=acme.com}
```

* the case is documented in

### (6) WEB
> Insert the AlertifyJS library; it is used to generate dialogues and can be found at http://cdn.jsdelivr.net/npm/alertifyjs@1.11.0/build/alertify.min.js
> Insert CSS file hosted at http://cdn.jsdelivr.net/npm/alertifyjs@1.11.0/build/css/alertify.min.css
> The AlertifyJS library defines a simple method, alertify.alert(message), where the message is a string representing the message displayed by the alert box. Add Javascript code to pop up an AlertifyJS’s alert box with the message “Well done!” on the button click.
* [A Complete Guide to Links and Buttons | CSS-Tricks](https://css-tricks.com/a-complete-guide-to-links-and-buttons/)

```html
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
const button = document.getElementById("button")
button.addEventListener("click", event => {
    event.preventDefault();
    alertify.alert("Snowplow Challenge", "Well done!");
});
```
* the demo is available at [A Pen by Pavol Kutaj](https://codepen.io/pkutaj/pen/oNXGZJR)
* the case is documented 


### sources
* [DNS Failover: Basic Concepts and Limitations](https://ns1.com/resources/dns-failover-basic-concepts-and-limitations)
* [ConvertFrom-Json](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertfrom-json?view=powershell-7)
* [MX record - Wikipedia](https://en.wikipedia.org/wiki/MX_record)