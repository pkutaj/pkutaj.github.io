---
layout: post
title: data > transactions, resources, managers and protocols
categories: [data]
---
## the case of the terminology of transaction
the question is what terminology, mechanisms, and principle are associated with **TRANSACTIONS** in the windows environment

## toc
<!-- TOC -->

- [on transactions in general](#on-transactions-in-general)
- [Resource Manager](#resource-manager)
    - [(1) durable RM](#1-durable-rm)
    - [(2) volatile RM](#2-volatile-rm)
- [ACID](#acid)
- [(1) atomic transactions](#1-atomic-transactions)
- [(2) long-running transactions](#2-long-running-transactions)
- [transaction protocols](#transaction-protocols)
    - [(1) Lightweight](#1-lightweight)
    - [(2) OleTx](#2-oletx)
    - [(3) WSAT](#3-wsat)
- [Transaction managers](#transaction-managers)
    - [(1) Leightweight Transaction Manager](#1-leightweight-transaction-manager)
    - [(2) Kernel Resource Manager](#2-kernel-resource-manager)
    - [(3) Distributed Transaction Manager](#3-distributed-transaction-manager)
- [Phase Commit Protocol (2PC)](#phase-commit-protocol-2pc)
- [Distributed transactions is a different game](#distributed-transactions-is-a-different-game)
    - [Internet: DTC are dead](#internet-dtc-are-dead)
- [sources](#sources)

<!-- /TOC -->

## findings
### on transactions in general
* in .NET
    * `using System.Transactiont`
* behind .NET Transactions there is a whole transaction architecture with
    1. resource managers (RMs)
    2. transaction protocol (TPs)
    3. transaction managers (TMs)

![transaction_dotnet_wcf]({{ site.url }}/assets/img000731.png)

### Resource Manager
* any component that manages data participating in the transaction
    * commits
    * rolls backs
* example
    * RDBMSs
    * Microsoft Messaging Queuing Service
    * Custom, in-memory RMs

####  (1) durable RM
* resilient to system failures
* SQL server, MSMQ
    
####  (2) volatile RM
* only in-memory
* system .NET `transaction` namespace

### ACID
* 4 properties of transactions
* available since the early 1970s

attribute      | description
---------------|----------------------------------------------------------------------------------------------------
1. Atomic      | all/nothing — no chance that partly succeeds and part not
2. Consistency | logical constraints (e.g. can't end up with negative balance); preserving **REFERENTIAL INTEGRITY**
3. Isolation   | concurrent have the same effect as serial; **SERIALIZATION ISOLATION LEVEL**
4. Durability  | reliably stored

* see the **ISOLATION** principle demonstrated with the serialization of concurrent transactions and locking of the current state

![serialization_ isolation_level]({{ site.url }}/assets/2020-04-14-isolation-explained.gif)

* (R)DBMS take care of all of that — **ON A SINGLE MACHINE**
    * local data
    * no network involved
* key focus on a single machine is the trade-off between isolation/consistency: 
    * if you lower guarantees, you can have higher throughput

### (1) atomic transactions
* take little time to finish
* committing and rolling back are done implicitly by resource managers
* locks can be applied without having much performance impact
* managed by **TRANSACTION MANAGER**
    * enlists both **RESOURCE MANAGERS**

### (2) long-running transactions
* aka business transactions
* take a long time to complete
* involve waiting for 
    * human actions
    * async messages
* the code is **EXPLICITLY RESPONSIBLE** for committing / rolling back operations
* rolling back in this context is known as **COMPENSATION**
* it does not support atomicity
    * responsibility for commit/rollback is on the application
    * consistency: could be yes
    * isolation: no; isolation needs locks, long-running avoid locks
    * durability: maybe
    
### transaction protocols
* dictate the type and scope of communication

#### (1) Lightweight
* when a single application is working with
    * single RM
    * multiple volatile RMs
    * no cross AppDomain calls
    * no client — service calls

#### (2) OleTx
* allows cross AppDomain
* allows cross-machine boundary calls
* multiple durable RMs
* **RPC calls only** — Windows environment
* no cross-platform communication
* usually not through firewalls
* used in Windows Intranet Scenario

![oletx]({{ site.url }}/assets/img000734.png)

#### (3) WSAT
* one of the WS-standards
* ideal for internet scenario
* allows interoperable communication

![WSAT]({{ site.url }}/assets/img000735.png)

### Transaction managers
* protocols define boundaries and communication rules
* transaction manager manages transactions practically
* **PROMOTION** happens automatically and this mechanism within `system.transaction` decides what transaction manager to use

![promotion]({{ site.url }}/assets/img000736.png)

#### (1) Leightweight Transaction Manager
* .NET 2.0
* Leightweight protocol

#### (2) Kernel Resource Manager
* lightweight protocol
* ability to call on the transactional file system (TXF) and transactional registry (TXR) on windows

#### (3) Distributed Transaction Manager
* DTC
* managing transactions **ACCROSS PROCESS—MACHINE—PLATFORM BOUNDARIES**

### 2 Phase Commit Protocol (2PC)
> how does DTC transaction manager ensure that atomicity is ensured on all participating resource managers when these are running on different machines
* the answer is **2 Phase Commit Protocol**

STEP | COMMENT
-----|------------------------------------------------------
1.   | TM asks RMs to vote
2.   | RM1 and RM2 submit their vote
3.   | TM gathers the votes
4.   | RM1 and RMS prepare to commit: they do not commit yet
5.   | TM decides the outcome based on the collected vote
6.   | TM informs RMs to either both commit or both rollback
7.   | RMs notify TM about the result

![2_phase_commit_schema]({{ site.url }}/assets/img000737.png)

* if there is more than 1 DTC, there is a **ROOT DTC** that collects the decisions of all other **DTC** to commit or rollback

![interoperability_dtc_wsat]({{ site.url }}/assets/img000740.png)

### Distributed transactions is a different game
* **CAP**
    * it is impossible to achieve both consistency and availability when your network is not perfect
    * tradeoff consistency or availability
* **MSDTC** is a coordinator 
* first call MSDTC with unique Tx ID until it's done
* then it starts the 2-phase commit
    * call coordinator ➔ **COORDINATOR** prepares commit
* also in the 1970s
* it is complex think to configure; this is not trivial
* largest problems are with performance due to all of these **ROUNDTRIPS**

#### Internet: DTC are dead
* 2007: new middleware will emerge that addresses this problem
* This hypothesis seems to be problematic and the prophecy does not seem to be fulfilled as of the 2020s

### sources
* [Demystifying Microsoft Distributed Transaction Coordinator and SQL Server HA Configurations - SQLHA - SQLHA](https://sqlha.com/2017/06/27/demystifying-microsoft-distributed-transaction-coordinator-and-sql-server-ha-configurations/)
* [Distributed Transactions are dead, long live distributed transaction! by Sergey Bykov - YouTube](https://www.youtube.com/watch?v=8A5bRdyZXJw)

