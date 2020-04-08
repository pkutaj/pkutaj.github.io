---
layout: post
title: DATA > optimistic concurrency control
categories: []
---
## the case	
the question is what is optimistic and pessimistic concurrecy control in the context of data science 

## findings
* this is a control that transaction is doing to make sure a simultaneous / concurrent change is not taking place
* there are 2 attributes to each record added and checked for this purpose
    * version number
    * time stamp
* a transaction checks the version number and timeStamp 
    * initially
    * before the commit
* if they are identical, the transaction has to be re-done
* this good for lots of reads and few updates, as its possible to read from records that accessed simultaneously by many users
* there is also **pessimistic concurrency control** when there is an explicit lock of the record during the edit, and, bad luck, you have to wait stand the queue for the read-access as well 
* see [Optimistic vs Pessimistic Locking - YouTube](https://www.youtube.com/watch?v=VxGKvqHhU5c)
