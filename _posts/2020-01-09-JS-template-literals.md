---
layout: post
title: JavaScript > template literals
---
## the case
* there are several kind of literals (how values are represented, written directly in source_code)
* and similar to string literals (and array, objects, regex, boolean, integer, floating-points) there are **template literals**

<!-- TOC -->

- [use: multi-line strings](#use-multi-line-strings)
- [use: value interpolation](#use-value-interpolation)
- [use: concatenation with interpolation](#use-concatenation-with-interpolation)
- [syntax](#syntax)
- [template etymology](#template-etymology)

<!-- /TOC -->

## findings
### use: multi-line strings
* template literals are great for creating multi-line strings

![multiline_strings]({{ site.url }}/assets/2020-01-09-1.png)

### use: value interpolation
* great for **value interpolation**
* template literals evaluate the content inside of **`${}`**. you can do math there, call vars or property of objects

![value_interpolation]({{ site.url }}/assets/2020-01-09-2.png)

### use: concatenation with interpolation
![also_concatenation]({{ site.url }}/assets/2020-01-09-3.png)

### syntax
* their syntactical demarcation is with a backtik character

![backtick_as_demarcation]({{ site.url }}/assets/2020-01-09-4.png)

* in basic single-line strings they work identically
* but they get very helpful with multi-line strings (which gets helpful if you are generating HTML via JS) 

### template etymology
* template etymology
    * these literals can evaluate expressions and fill original placeholders dynamically later
* before interpolation (template)

![before_interpolation]({{ site.url }}/assets/2020-01-09-5.png)

* after interpolation (with user's input)

![after_interpolatio]({{ site.url }}/assets/2020-01-09-6.png)

![after_interpolation2]({{ site.url }}/assets/2020-01-09-7.png)

