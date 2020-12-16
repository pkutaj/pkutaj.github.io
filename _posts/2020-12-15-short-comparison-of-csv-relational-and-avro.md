layout: post
title:
categories: []
---
## usecase
The concern is documenting short comparison of data formats: csv -vs - relational -vs- json -vs- avro

<!-- TOC -->

- [1. csv](#1-csv)
    - [1.1. cons](#11-cons)
- [2. relational tables](#2-relational-tables)
    - [2.1. cons](#21-cons)
- [3. json](#3-json)
    - [3.1. cons](#31-cons)
- [4. avro](#4-avro)
    - [4.1. cons](#41-cons)

<!-- /TOC -->

### 1. csv
* initially `.csv`
    * easy to parse
    * easy to read
    * easy to make sense of

![csv]({{ site.url }}/assets/img002331.png)

#### 1.1. cons
* data types have to be inferreed
* not guaranteed
* parsing is tricky with commas
* column names may or may not be there

### 2. relational tables
* have types
* DB will refuse any data not compatible with types
* and you have name columns
* data fits in a table

#### 2.1. cons 
* data has to be flat
    * for and columns
    * no depth
* data sits in DB - access accross DB is difficult
* you need a driver for that DB

### 3. json
* shared accross the network as much as you want
* nested values - does not have to be flat anymore
* all text based
* data can take any form you want
* widely accepted on the web — every language has a library to parse it

#### 3.1. cons
* data has no schema enforcing - well there is JSON schemas
* can be huge - there is lots of repeated keys

### 4. avro
* avro is described by a schema written in `.json`
* you can view Avro as JSON with a schema attached to it
* it has a 
    * schema
    * payload
* data is named and fully typed
* you can compress it automatically
* schema comes alongside with data - no lonely data
* you can embed the documentation in schema
* data can be read across any language - it is a binary protocol
    * mainly for java
* schema can evolve over time, in a safe manner (schema evolution)
* support from HADOOP and HIVE
* support from Confluent Schema Registry

#### 4.1. cons
* languages
* the data is compressed and serialized - you can't print the data as text (json)
