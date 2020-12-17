---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the concept of lookahead and lookbehind, in situation of extracting markdown image paths where I need to capture everything until the closing `)`

<!-- TOC -->

- [1. regex: lookaheads and lookbehinds](#1-regex-lookaheads-and-lookbehinds)
    - [1.1. testing lookbehind with regex](#11-testing-lookbehind-with-regex)

<!-- /TOC -->

### 1. regex: lookaheads and lookbehinds
* concepts to define patterns that only match they they 
    * are / are not followed by a certain pattern → **lookahead** (positive / negative)
    * are / are not preceded by a certain pattern → **lookbehind** (positive / negative)

name       | pattern                                | comment
-----------|----------------------------------------|----------------------
lookahead  | `(?=LOOKAHEAD_PATTERN)MATCH_PATTERN`   | ahead is to the right
lookbehind | `(?<=LOOKBEHIND_MATTERN)MATCH_PATTERN` | behind is to the left


#### 1.1. testing lookbehind with regex
* if I want to capture name that is after `mr` + an empty string (whitespace `\s`)
* i need to use lookbehind syntax

```
[regex]::matches(‘mr paul’,’(?<=mr\s).*’).value
→→→ paul
```

* I am getting the url of the s3 bucket that is preceded by `aws_setup_prod1/output/s3_bucket_kinesis_s3_enriched_id:` with Hashicorp Consul in this way (and copy to clipboard for efficiency)

```powershell
 "b" {
            $regex = "(?<=aws_setup_prod1/output/s3_bucket_kinesis_s3_enriched_id:).*"
            $returnedString = consul kv get -recurse customer/$consulName |
                Select-String -pattern $regex
                $streamingBucket = $returnedString.matches.value
                $streamingBucket | clip
                write-host $streamingBucket pasted to clipboard -foregroundcolor cyan
            
        }
```
