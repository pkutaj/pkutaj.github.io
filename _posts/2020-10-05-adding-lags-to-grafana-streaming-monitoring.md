---
layout: post
title:
categories: []
---
## usecase
The concern is documenting monitoring Amazon Kinesis (streaming service) — notably so called "lags"; i.e. the amount of time a certain record is not consumed from the stream. The wildcard feature for cloudwatch allows an easy, but noisy panel,  I need to break that into per-stream panel for easier monitoring — there is 7 streams 🠋 for prod & qa environment for collector stream and then enrichment and bad data stream.

![custom_expression]({{ site.url }}/assets/img001954.png)

<!-- TOC -->

- [1. result](#1-result)
- [2. features](#2-features)
- [3. period dropdown](#3-period-dropdown)
- [4. panel broken down into 3](#4-panel-broken-down-into-3)
- [5. thresholds](#5-thresholds)

<!-- /TOC -->

### 1. result
![3_panels_per_dashboard]({{ site.url }}/assets/img001947.png)

### 2. features
### 3. period dropdown
* must be in seconds

![period_in_seconds]({{ site.url }}/assets/{{ site.url }}/assets/img001952.png)

* setup in _Settings_ → _Variables_ → _New_ 

![new_dropdown_in_secs]({{ site.url }}/assets/img001953.png)

* seems not to work with other time unitss
* note the variable reference is case-sensitive

### 4. panel broken down into 3
* as I want lags per stream, need to use the cloudwatch search expressions


![custom_expression]({{ site.url }}/assets/img001950.png)

* Custom Search expression

```
SEARCH(' {AWS/Kinesis,StreamName} MetricName="GetRecords.IteratorAgeMilliseconds" collector', 'Maximum', $Period)
```

### 5. thresholds

![thresholds]({{ site.url }}/assets/img001951.png)
