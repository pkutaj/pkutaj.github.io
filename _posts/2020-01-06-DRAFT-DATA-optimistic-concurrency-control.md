---
layout: post
title: DATA > optimistic concurrency control
last_modified_at: 
---
## the case	
the question is what is optimistic and pessimistic concurrecy control in the context of data science 

## toc
<!-- TOC -->



<!-- /TOC -->

## findings
* this is a control that transaction is doing to make sure a simultaneous / concurrent change is not taking place
* there are 2 attributes to each record added and checked for this purpose
    * version number
    * time stamp
* transaction checks the version number and timeStamp initially and then before the commit
* if they are not equal, the transaction has to be re-done
* good for lots of reads and few updates
* there is also **pessimistic concurrency control** when there is an explicit lock of the record during the edit
* see [Optimistic vs Pessimistic Locking - YouTube](https://www.youtube.com/watch?v=VxGKvqHhU5c)
