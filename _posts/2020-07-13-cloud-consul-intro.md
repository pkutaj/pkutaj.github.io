---
layout: post
title: devops > intro to hashicorp consul
categories: [devops]
---

## abstract
The aim is documenting the benefits of hashicorp consul (part of hashicorp stack)

## TOC
<!-- TOC -->

- [1. services & service discovery](#1-services--service-discovery)
- [2. nodes & node failure detection](#2-nodes--node-failure-detection)
- [3. distributed key/value store](#3-distributed-keyvalue-store)
    - [3.1. side-step: key-value store](#31-side-step-key-value-store)
    - [3.2. the whys](#32-the-whys)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. services & service discovery
* traditionally, this is done via config files are used with hardcoded domain names
* done with
    * internal DNS 
    * this is more than just distributed key/value store

### 2. nodes & node failure detection
* nodes are the hosts where services reside

![nodes_in_consul]({{ site.url }}/assets/img001258.png)

* when the service/node goes down, consul takes corresponding services out of the DNS records via running a light-weight consul-agent diagnosing services running locally
* consul has distributed pool health-checks, which allows so scale to hundreds of nodes, difficult to pull off centrally
* checks by consul agents are performed very frequently

![consul_agents_distributes]({{ site.url }}/assets/img001259.png)

* agents are talking to each other viav gossip peer-2-peer protocol 
 
### 3. distributed key/value store
* similar to other service discovery tools
* used to 
    * store configuration for your applications
    * write data to fault-tolerant key/value store 
* benefit: **reactive** store —> if you store app config here, if you change it here, the change can be pushed into running application
    * for load balancer: the value can be tweaked here —> triggers an event —> reload the config file 
    * you don't need to **deploy a new config file** —> which is usually static, and you need to edit it by hand or to use it a tool 
    * usually takes a long time —> here, almost no delay

#### 3.1. side-step: key-value store
* key-value store is a type of No-SQL DB, with siblings such as graph DB, column and document-oriented
* it is opposed to RDB (a traditional relational database with structured cols storing records in tables linked via keys/relations)
* the most successful K/V store is Redis
* key/value stores data in an associative array, aka hash table, dictionary data structure

> Performance, a lack of standardization and other issues limited key-value systems to niche uses for many years, but the rapid move to cloud computing after 2010 has led to a renaissance as part of the broader NoSQL movement.

— [Key–value database - Wikipedia](https://en.wikipedia.org/wiki/Key%E2%80%93value_database)

#### 3.2. the whys
* configuring applications is tedious
* the best of apps have a simple config file that are in a proper place
* how were they dropped to the proper folder in the past ?
    1. package managers that copied default config files → modify **manually** to meet yr needs
    2. config files were checked in with the version control → package and deploy
        * and pushing the configuration is time-consuming (delay minutes and hours)
* cosul is a reactive system, you **listen** for things to happen and you **react** to it
* it listens to the changes in the **K/V** and listens to it as well


### 4. sources
* [Key–value database - Wikipedia](https://en.wikipedia.org/wiki/Key%E2%80%93value_database)