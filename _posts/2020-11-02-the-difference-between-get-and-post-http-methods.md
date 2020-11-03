---
layout: post
title: 
categories:
---
## usecase
The concern is documenting the difference between `get` and `post`

<!-- TOC -->

- [1. safe vs unsafe](#1-safe-vs-unsafe)
- [2. different treatment](#2-different-treatment)

<!-- /TOC -->

### 1. safe vs unsafe
* GET is safe → reading
* POST is unsafe → updating a resource

### 2. different treatment

GET                       | POST
--------------------------|----------------------------------
state not changed         | state changed
refresh unlimited         | warned to refreshed (duplo,etc.);
query in URL query-string | query in message body

* note: there is Post-Redirect-Get pattern to avoid the refresh warning
