---
layout: post
title: SQL > Verify Encryption
--- 

## the case	encrypted SQL Server
* TLS on SQL server (traffic encryption by applying additional, security layer on top of TCP/IP where the SQL is running as there is no application protocol dedicated to SQL)
* activation
* verification

## toc
<!-- TOC -->

- [activate](#activate)
- [verify](#verify)

<!-- /TOC -->

## findings
* more complicated than HTTPS in some ways
* note, in SSMS you **will not get** the information about the protocol being used for encryption (TLS 1.0, TLS 1.1, TLS 1.2)
* for this, you will have to disable all the protocols except the one you want to use
* either in Windows Registry
* or via an elegant free tool from [Nartac Software - IIS Crypto](https://www.nartac.com/Products/IISCrypto)


### activate

![activate_in_sql_configuration_manager]({{ site.url }}/assets/img000507.png)

### verify
* note the `true` in the `encrypt_option` column signifying the active encryption
* map the `session_ID` with the `SPID` in order to get furtner info about the session

```sql
SELECT session_id, encrypt_option
FROM sys.dm_exec_connections
exec sp_who2
```
* map session IDs

```
session_id | encrypt_option
-----------|---------------
52         | TRUE
53         | TRUE
65         | TRUE
67         | TRUE
69         | TRUE
71         | TRUE
72         | TRUE


SPID | Login       | HostName | ProgramName	SPID
-----|-------------|----------|-----------------------------------------------
52   | CRMW\cgreen | CRMW     | Microsoft SQL Server Management Studio
53   | CRMW\cgreen | CRMW     | Microsoft SQL Server Management Studio - Query
65   | CRMW\cgreen | CRMW     | Pivotal DataAccess
67   | CRMW\cgreen | CRMW     | Pivotal DataAccess
69   | sa          | crmw     | Insight	4
71   | CRMW\cgreen | CRMW     | Net SqlClient Data Provider
72   | CRMW\cgreen | CRMW     | Net SqlClient Data Provider
```