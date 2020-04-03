---
layout: post
title: networking > smtp
categories: [networking]
---
## the case	of smtp
the question is the inner workings of the SMTP protol, the anchoring to the past 

## toc
<!-- TOC -->

- [smtp history](#smtp-history)
- [routing](#routing)
- [rubberduck](#rubberduck)
    - [STEP-1 sender client ➔ sender SMTP server](#step-1-sender-client-%E2%9E%94-sender-smtp-server)
    - [STEP-2 sender ➔ find recipient with DNS MX](#step-2-sender-%E2%9E%94-find-recipient-with-dns-mx)
    - [STEP-3 connection is established over port 25](#step-3-connection-is-established-over-port-25)
    - [STEP-4 recipient ➔ acknowledges with FQDN](#step-4-recipient-%E2%9E%94-acknowledges-with-fqdn)
    - [STEP-5 sender ➔ sends EHLO command](#step-5-sender-%E2%9E%94-sends-ehlo-command)
    - [STEP-6 recipient ➔ responds with HELLO](#step-6-recipient-%E2%9E%94-responds-with-hello)
    - [STEP-7 sender ➔ sends MAIL FROM](#step-7-sender-%E2%9E%94-sends-mail-from)
    - [STEP-8 recipient ➔ responds with OK](#step-8-recipient-%E2%9E%94-responds-with-ok)
    - [STEP-9 sender ➔ sends RCPT TO](#step-9-sender-%E2%9E%94-sends-rcpt-to)
    - [STEP-10 recipient ➔ OK](#step-10-recipient-%E2%9E%94-ok)
    - [STEP-11 sender ➔ DATA](#step-11-sender-%E2%9E%94-data)
    - [STEP-12 sender ➔ . + newline when done](#step-12-sender-%E2%9E%94---newline-when-done)
    - [STEP-13 recipient ➔ message accepted](#step-13-recipient-%E2%9E%94-message-accepted)
    - [STEP-14 sender ➔ quit](#step-14-sender-%E2%9E%94-quit)
- [sources](#sources)

<!-- /TOC -->

## findings
* SMTP = Simple Mail Transfer Protocol
* to follow the steps with telnet run `dism /online /Enable-Feature /FeatureName:TelnetClient` in the evelated prompt on windows client machines (WIN10)

### smtp history
* smtp protocol was defined in 1982, **RFC 821**
    * TCP 1981
    * IBM PC 1981
* originally not that much for microcomputers
* built for mainframes that became **MAIL SERVERS**
* most recent update is **RFC 5321**

### routing
* when sending a message from machine to machine
    * sometimes it went directly
    * other times routed through other machines

### rubberduck
* port 25 by default

#### STEP-1 sender client ➔ sender SMTP server
* mail client ➔ message ➔ own SMTP server

#### STEP-2 sender ➔ find recipient with DNS MX
* in order to establish a session you need **DNS**
* mail server establishes **CONNECTION** with mail-server
* sender's SMTP server queries DNS for the mail MX record of the recipient
* MX stands for **Mail Exchanger Record**
* the random example below is for `snowplowanalytics.com`
* in powershell run `Resolve-DnsName -name snowplowanalytics.com -type MX | select * | format-table` to see that email is managed by Google
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

#### STEP-3 connection is established over port 25
* sender sends a connection request with the obtained IP address 
* port 25

```
telnet smtp.kutaj.com 25
```

#### STEP-4 recipient ➔ acknowledges with FQDN
* `220: FQDN`
* recipient acknowledges the connection 
* it returns fully qualified domain name (FQDN)

```
220 smtp3s109.dnsserver.eu ESMTP Exim 4.92.3 Fri, 03 Apr 2020 05:59:34 +0200
```

#### STEP-5 sender ➔ sends EHLO command

```
EHLO gmail.com
```

#### STEP-6 recipient ➔ responds with HELLO

```
250-smtp3s109.dnsserver.eu Hello gmail.com [80.83.66.146]                                                               250-SIZE 104857600                                                                                                      250-8BITMIME                                                                                                            250-PIPELINING                                                                                                          250-AUTH LOGIN PLAIN                                                                                                    250-CHUNKING                                                                                                            250-STARTTLS                                                                                                            250 HELP
```

#### STEP-7 sender ➔ sends MAIL FROM
* MAIL FROM command contains sender's email address

```
MAIL FROM:pkutaj@gmail.com 
```

#### STEP-8 recipient ➔ responds with OK
* I can continue with the conversation

```
250 OK
```

#### STEP-9 sender ➔ sends RCPT TO
* RCPT TO command specifies a user to which the message is destined for
* `RCPT TO: pavol@kutaj.com`

```
RCPT TO: pavol@kutaj.com
```

#### STEP-10 recipient ➔ OK

```
 250 OK
```

#### STEP-11 sender ➔ DATA
* data is sent

```
DATA
```

#### STEP-12 sender ➔ . + newline when done
* single `.` and a newline is sent when the message is over

```
This is a test message.
.
```

#### STEP-13 recipient ➔ message accepted
* `250 Message accepted for delivery`

```
250 Message accepted for delivery
```

#### STEP-14 sender ➔ quit

```
QUIT
```

### sources
* [How to enable the telnet client in Windows 10](https://www.rootusers.com/how-to-enable-the-telnet-client-in-windows-10/)