---
layout: post
title: REGEX > * VS +
categories: [programming]
---
## the case	
the question is, what is the meaning of following

```
a*  ---> a{0,}  ---> Match a or aa or aaaaa or an empty string
a+  ---> a{1,}  ---> Match a or aa or aaaa but not a string empty
```

* What does it mean that you can match the string + you qualify on the preceding expression
* What does it mean that a* = a{0,} and a+ = a{1,}


## findings
* Each of them are quantifiers, the Kleene star quantifier (`*`) means that the preceding expression **CAN** match 
* Zero or more times can be expressed as `{0,} `

![kleene_star]({{ site.url }}/assets/2020-01-29-02.png)

* While the plus quantifier(+) indicate that the preceding expression **MUST** match at least 
* One time or multiple times can be expressed as `{1,}`

![plus_qualifier]({{ site.url }}/assets/2020-01-29-01.png)
