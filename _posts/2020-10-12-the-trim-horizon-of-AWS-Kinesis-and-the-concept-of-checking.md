---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the concept of **TRIM HORIZON** and **CHECKING**

* This opens the understanding of the errors I am seeing these days such as

```
The consumer has checkpointed the shard at TRIM_HORIZON but hasn't started processing it
```

<!-- TOC -->

- [1. shards, streams, and iterators](#1-shards-streams-and-iterators)
- [2. shard iterator](#2-shard-iterator)
- [3. checkpointing](#3-checkpointing)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. shards, streams, and iterators
* `TRIM_HORIZON` is the **TYPE OF SHARD ITERATOR**
* **SHARD** is a unit of volume (data sequencing) within the **STREAM**
* shard iterator is what defines the **POSITION TO START CONSUMING DATA RECORDS SEQUENTIALLY**

* see [aws-kinesis-components](2020-09-08-aws-kinesis-components)

### 2. shard iterator
* these points can be of various types

NR | TYPE NAME               | Description
---|-------------------------|-------------------------------------------------------------------------------------------------------------------------------
1. | `AT_SEQUENCE_NUMBER`    | Start reading from the position denoted by a specific sequence number, provided in the value StartingSequenceNumber.
2. | `AFTER_SEQUENCE_NUMBER` | Start reading right after the position denoted by a specific sequence number, provided in the value StartingSequenceNumber.
3. | `AT_TIMESTAMP`          | Start reading from the position denoted by a specific time stamp, provided in the value Timestamp.
4. | `TRIM_HORIZON`          | Start reading at the last untrimmed record in the shard in the system, which is the **OLDEST** data record in the shard.
5. | `LATEST`                | Start reading just after the most recent record in the shard, so that you always read the **NEWEST** data record in the shard.

### 3. checkpointing
* **CHECKPOINTING** is essentially a mechanism allowing you to restart stream **PROCESSING** from the last checkpointed position 
* ...instead of at the earliest available record or "now"
* In general, the goal is to use Kinesis to drive useful processing - usually reprocessing duplicate records is not useful (and just costs you money, paid to AWS). 
* Checkpointing often means less time and money wasted reprocessing duplicate records.
* You can checkpoint on a time-basis (every X seconds), record-basis (every Y records), every batch, never, or whatever you want - it all depends on how much waste you can tolerate in the event of a failure.

— From <https://stackoverflow.com/a/52976281>

### 4. sources
* [GetShardIterator - Amazon Kinesis Data Streams Service](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html)
* [amazon web services - AWS Kinesis Stream Checkpointing - Stack Overflow](https://stackoverflow.com/questions/52825171/aws-kinesis-stream-checkpointing)
