---
layout: post
title: REGEX > * vs + 
---
## the case	
* What does it mean that you can match the string + you qualify on the preceding expression
* What does it mean that `a* = a{0,}` and `a+ = a{1,}` as outlined in the specifications

## solution
* Each of them is a **quantifier**
* The star quantifier(*) means that the preceding expression can match zero or more times it is like {0,}
* The plus quantifier(+) indicates that the preceding expression MUST match at least one time or multiple times and it is the same as {1,} . 

![2020-01-14-image1.png]({{ site.url }}/assets/2020-01-14-image1.png)

![2020-01-14-image2.png]({{ site.url }}/assets/2020-01-14-image1.png)
