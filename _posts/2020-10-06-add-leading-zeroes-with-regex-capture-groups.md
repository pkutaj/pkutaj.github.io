---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the use of regex capture groups to effectively do find&replace in `.csv` files within VSCODE

![add_leading_zeroes_here]({{ site.url }}/assets/img001968.png)

<!-- TOC -->

- [regex, capture groups](#regex-capture-groups)

<!-- /TOC -->

### regex, capture groups
* using capture groups
* find

STEP# | CODE   | COMMENT
------|--------|-----------------------------------------------------
01    | "      | start with "
02    | (      | start capturing all
03    | ..[    | ..it repeats
04    | ....\d | ....it is a digit (\d)
05    | ..]    | ..end of repeat string
06    | ..{    | ..start defining number of repeats
07    | ....1  | ....exactly once
08    | ..}    | ..end of block defining repetitions
09    | ..\.   | ends with dot (literal) - here `\` is an escape char
10    | )      | stop capturing

```
"([\d]{1}\.)
```

* the content captured within `()` can be called with `$1` (there can be more)
* the aim was to replace all 🠉 with `"0` — i.e. to add a leading 0 to enable sorting capabilities

```
"0$1
```

![result_with_added_leading_zero]({{ site.url }}/assets/img001941.png)
