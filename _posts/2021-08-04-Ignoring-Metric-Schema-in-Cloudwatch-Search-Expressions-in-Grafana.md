## usecase
The aim of this playbook🏁 is to notice that search expressions don't always need to contain metric schema. Also, its avoidance is useful when filtering on dimensions containing a substring within one of the dimensions. 

<!-- TOC -->

- [1. Assignment](#1-assignment)
- [2. NOT working](#2-not-working)
- [3. IS working](#3-is-working)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. Assignment
* filter AWS/ECS containers dimensions with `ServiceName` containing a substring `rdb-loader-cluster`

### 2. NOT working
* the `{AWS/ECS,ServiceName}` is called _metric schema_

```
SEARCH(' {AWS/ECS,ServiceName} MetricName="MemoryUtilization" rdb-loader-cluster', 'Average', $period)
SEARCH(' {AWS/ECS} MetricName="MemoryUtilization" rdb-loader-cluster', 'Average', $period)
```

### 3. IS working 
* `ServiceName` is not even mentioned 
* `rdb-loader-cluster` is the substring of a service I need to filter the panel (there is a lot of services in the ECS)

```
SEARCH(' AWS/ECS MetricName="MemoryUtilization" rdb-loader-cluster', 'Average', $period)
SEARCH(' AWS/ECS MetricName="MemoryUtilization" rdb-loader-cluster', 'Average', $period)
```

### 4. sources
* [CloudWatch search expression syntax - Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/search-expression-syntax.html)
