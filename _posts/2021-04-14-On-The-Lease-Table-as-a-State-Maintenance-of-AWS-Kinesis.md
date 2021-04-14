## usecase
The aim of this explainer💡 is to explain the concept of the **Lease Table** within AWS Kinesis 

<!-- TOC -->

- [1. On Shard:Worker ratio and basic quotas](#1-on-shardworker-ratio-and-basic-quotas)
- [2. Lease Table](#2-lease-table)
- [3. Lease Concepts](#3-lease-concepts)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. On Shard:Worker ratio and basic quotas
* the **MINIMAL** is _1 shard : 1 worker_ mapping
* 1:2 is not possible — 2 workers cannot be loading from 1 shard
* 1 node can be loading from multiple shards, of course
* i.e. **shards cannot be distributed**
* the relationship between a worker from a consumer app and a shard from a stream is known as a **lease** and is maintained within a **lease table** — lease is kind-of a lock that a worker (node) has on shard while consuming its data
* the _ideal_ ratio (in my experience) of shard:workers is _3:1_, ie. a stream with 30 shards should have max 10 workers within the consumer app (auto-scaling group)

### 2. Lease Table
* At a high level, it is a **DynamoDB** table is used to keep track of your Kinesis application streams state
* The `LeaseKey` is a hash of the kinesis shard id and this is used as the hashkey in the DynamoDb table
* So, in order words, when your stream is processing there is a row for every shard in the lease table
* These rows contain information relating to the current state of processing of that shard — and this is known as _lease information_ 
* You can see the full table schema and meta data in regards to what each lease columns means in the table here:
> https://docs.aws.amazon.com/streams/latest/dev/kinesis-record-processor-ddb.html
* For each Amazon Kinesis Data Streams application, KCL uses a unique lease table (stored in a Amazon DynamoDB table) to keep track of the shards in a KDS data stream that are being leased and processed by the workers of the KCL consumer application.
* Important
    - KCL uses the name of the consumer application to create the name of the lease table that this consumer application uses, therefore each consumer application name must be unique.
* You can view the lease table using the Amazon DynamoDB console while the consumer application is running.
* If the lease table for your KCL consumer application does not exist when the application starts up, one of the workers creates the lease table for this application.
* Important
    - Your account is charged for the costs associated with the **DynamoDB** table, in addition to the costs associated with Kinesis Data Streams itself.
* Each row in the lease table represents a shard that is being processed by the workers of your consumer application. If your KCL consumer application processes only one data stream, then leaseKey which is the hash key for the lease table is the shard ID. If you are Processing Multiple Data Streams with the same KCL 2.x for Java Consumer Application, then the structure of the leaseKey looks like this: account-id:StreamName:streamCreationTimestamp:ShardId. For example, 111111111:multiStreamTest-1:12345:shardId-000000000336.
* In addition to the shard ID, each row also includes the following data:

FIELD                          | COMMENT
-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
`checkpoint`                   | The most recent checkpoint sequence number for the shard. This value is unique across all shards in the data stream.
`checkpointSubSequenceNumber`  | When using the Kinesis Producer Library's aggregation feature, this is an extension to checkpoint that tracks individual user records within the Kinesis record.
`leaseCounter`                 | Used for lease versioning so that workers can detect that their lease has been taken by another worker.
`leaseKey`                     | A unique identifier for a lease. Each lease is particular to a shard in the data stream and is held by one worker at a time.
`leaseOwner`                   | The worker that is holding this lease.
`ownerSwitchesSinceCheckpoint` | How many times this lease has changed workers since the last time a checkpoint was written.
`hashrange`                    | Used by the PeriodicShardSyncManager to run periodic syncs to find missing shards in the lease table and create leases for them if required.
`childshards`                  | Used by the LeaseCleanupManager to review the child shard's processing status and decide whether the parent shard can be deleted from the lease table.
`shardID`                      | The ID of the shard.
`streamname`                   | The identifier of the data stream in the following format `account-id:StreamName:streamCreationTimestamp`


### 3. Lease Concepts
* The lease itself is a (seems to me) is taken from the _leasehold_ which is an _ownership of a temporary right to hold land or property_ and where _Terms of the agreement are contained in a lease, which has elements of contract and property law intertwined._
* So a worker is temporarily owning a piece of a shard so that no other worker can access it

> In computer science, a lease is a contract that gives its holder specified rights to some resource for a limited period.  Because it is time-limited, a lease is an alternative to a lock for resource serialization. A traditional resource lock is granted until it is explicitly released by the locking client process. There could be a number of reasons why a lock may not be released and any of these  could end the availability of an important reusable resource until the system is reset. By contract, a lease is valid for a LIMITED PERIOD, after which it AUTOMATICALLY EXPIRES, making the resource available for reallocation by a new client.

— From [Lease (computer science) - Wikipedia](https://en.wikipedia.org/wiki/Lease_(computer_science))

* In this case, holder is a worker of a consumer app, and resource is a shard within the data stream. The current snapshot of the lease (kinesis application streams state as stated above) is within the DynamoDB Lease Table that contains the following fields

### 5. sources
* [What Is Amazon Kinesis Data Streams? - Amazon Kinesis Data Streams](https://docs.aws.amazon.com/streams/latest/dev/introduction.html)
* [Lease (computer science) - Wikipedia](https://en.wikipedia.org/wiki/Lease_(computer_science))
