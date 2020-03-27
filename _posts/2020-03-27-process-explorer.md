---
layout: post
title: windows > Process Explorer (Sysinternals)
categories: [windows]
---
## the case	
* the question is, what can the most downloaded tool of the Sysinternals suite do for the general troubleshooting process
* this is a sibling of the post [on Procmon Tactics]({% post_url 2020-02-09-WIN-procmon-tactics %}) and is expected to grow incrementaly as I keep using the tool

## toc
<!-- TOC -->

- [TYPES](#types)
- [on own processes](#on-own-processes)
- [TACTIC-1 space-f5](#tactic-1-space-f5)

<!-- /TOC -->

## findings
### TYPES 
* with the order of precedence in case a process has more than one type
* go to **VIEW** ➔ **CONFIGURE COLORS**

![process_types]({{ site.url }}/assets/img000608.png)

### on own processes
* processes that are running in the same user account as Procexp
* Note that although they’re running in the same user account, they might be in
different Local Security Authority (LSA) logon sessions, integrity levels, or terminal sessions,and therefore are not all necessarily running in the same security context. Also note that if you started Procexp as a different user, other applications on the desktop will not be highlighted
as “own processes.”

### TACTIC-1 space-f5
* pause with `space`
* do the change (kill an app)
* hit `f5` to refresh 
* all changes will be properly highlighted with a color (green/red for new/old processes)
* hit `f5` to refresh again to make color highlights disappear