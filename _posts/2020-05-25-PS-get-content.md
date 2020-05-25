---
layout: post
title: powershell > get-content (gc)
categories: [powershell]
---
## overview
The concern this document is to show the use of `get-command` alias `gc` that prints the content of the file on a screen. 

## toc
<!-- TOC -->

- [(1) scenario-1 show me content when setting up jekyll](#1-scenario-1-show-me-content-when-setting-up-jekyll)
- [(2) peeking](#2-peeking)

<!-- /TOC -->

## findings
### (1) scenario-1 show me content when setting up jekyll
* used heavily in an interactive shell when peaking into content of a file

```
gc .\index.markdown
---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
```

### (2) peeking
* if peeking into a file to validate if it contains a string, use **GC** + **SLS** (`select-string`)

![peeking_with_gc_and_sls]({{ site.url }}/assets/img000993.png)