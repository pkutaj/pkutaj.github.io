---
layout: post
title: Applications > Crystal Reports versioning, a bit of history
categories: [applications]
---
## the case	
the question is, what versions can you find of Crystal reports (I find the versioning irritating and need a reference), but also what about Business Objects as a company acquired by SAP. It seems to have a role to play on the marked in the 1990s-early 2000s. 

## toc
<!-- TOC -->

- [HSTR](#hstr)
- [Versions and registry keys](#versions-and-registry-keys)
- [sources](#sources)

<!-- /TOC -->

## findings
### HSTR
* Crystal Reports version 9 is developed by Crystal Decisions
* Business Objects went public in 1994 and became the first French software company to be listed in the U.S.
* Business Objects was the first European Company to go public in the United States
* Crystal Decisions was acquired in December 2003 by BusinessObjects, which produced versions 10, 11 (XI) and version 12 (2008).
* SAP acquired BusinessObjects on October 8, 2007, and released Crystal Reports 2011 (version 14) on May 3, 2011. The latest version released is Crystal Reports 2016 (version 14.2.x) on March 8, 2016.

### Versions and registry keys
version       | release date | ownership         | hklm
--------------|--------------|-------------------|--------------------------------------------------------------
9             | 2002         | Crystal Decisions | HKEY_LOCAL_MACHINE\Software\Crystal Decisions\9.0\
10            | 2003         | Business Objects  | HKEY_LOCAL_MACHINE\Software\Crystal Decisions\10.0\
XI (11)       | 2004         | Business Objects  | HKEY_LOCAL_MACHINE\Software\Business Objects\Suite 11.0\
XI R2 (11.5)  | Nov 24, 2005 | Business Objects  | HKEY_LOCAL_MACHINE\Software\Business Objects\Suite 11.5\
2008 (12)     | Mar 31, 2008 | Business Objects  | HKEY_LOCAL_MACHINE\Software\ Business Objects\Suite 12.0\
2011 (14.0.x) | Aug 31, 2011 | SAP SE            | HKEY_LOCAL_MACHINE\Software\SAP BusinessObjects\Suite XI 4.0\
2013 (14.1.x) | Aug 29, 2013 | SAP SE            | HKEY_LOCAL_MACHINE\Software\SAP BusinessObjects\Suite XI 4.0\
2016 (14.2.x) | Mar 08, 2016 | SAP SE            | HKEY_LOCAL_MACHINE\Software\SAP BusinessObjects\Suite XI 4.0\

### sources
* [BusinessObjects - Wikipedia](https://en.wikipedia.org/wiki/BusinessObjects)