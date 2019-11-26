---
layout: post
title: C# > Controlling the Flow of Execution (work in progress)
last_modified_at: 2019-11-22
---
## the case	
the question is, 

## toc
<!-- TOC -->

- [branching](#branching)
- [looping](#looping)
- [jumping](#jumping)

<!-- /TOC -->

## findings
### branching
* if 

### looping
* foreach, do while and for loops

### jumping
* `break`: stop looping

```c#
for(var i = 0; i < grades.count; i++) 
{
    if(grades[i] == 42.1) { //specific requirement: end loop if grade equals 42.1 
        break;
    }
       result.highGrade = Math.Max(grades[i], result.highGrade);
       result.lowGrade = Math.Min(grades[i], result.lowGrade);
}
```

* `continue`: stop the iteration

```c#
for(var i = 0; i < grades.count; i++) 
{
    if(grades[i] == 42.1) { //specific requirement: skip the iteration if grade equals 42.1 
        continue;
    }
       result.highGrade = Math.Max(grades[i], result.highGrade);
       result.lowGrade = Math.Min(grades[i], result.lowGrade);
}
```

* there is also `goto`; but this is not used anymore

## terminology
*
 
## sources
* boolean operator
    * &&
    * || 
* branching
* control flow
* error conditions
* looping
* returning
