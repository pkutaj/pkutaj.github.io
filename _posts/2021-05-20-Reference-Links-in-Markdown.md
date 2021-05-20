## usecase
The aim of this explainer💡 is mostly musings on the beauty of markdown reference links.

3TLDR: 
1. reference links in the body
2. inline links only bibliography part of the doc (i call this _sources_)

<!-- TOC -->

- [1. steps](#1-steps)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. steps
* there are 2 types of links in markdown
    1. inline, typical with `[example](www.example.com)`
    2. reference, see below
    
```
This is [an example][#1] reference-style link.
[#1]: http://example.com/ 
```

* label naming convention: `#<i>`; i.e. pound sign + incrementer
* rules 
    1. use reference links in the body of the document (readable). 
    2. use inline links in bibliography (fast)

### 2. sources
* <https://daringfireball.net/projects/markdown/syntax>
