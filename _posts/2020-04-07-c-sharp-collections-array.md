---
layout: post
title: C# > collections > array
categories: [c-sharp]
---
## the case	of an array
* the question is what array is in the context of collections and the big3 general-purpose collections in c# / OOP

## toc
<!-- TOC -->

- [definition](#definition)
- [syntax](#syntax)
- [iteration](#iteration)
- [comparison: powershell](#comparison-powershell)
- [comparison: JavaScript](#comparison-javascript)
- [sources](#sources)

<!-- /TOC -->

## findings
### definition
* 2 essential attributes
    1. **FIXED** size
    2. **ORDERED** list

### syntax

![string[]_type_definition]({{ site.url }}/assets/img000589.png)

### iteration
* the essential action to iterate through every item in a collection is a **FOR EACH LOOP**
    * it is a type of a for loop
    * comparison: remember this being outdated in JavaScript (replaced by for in and for of)

### comparison: powershell
* PowerShell is not a strongly-typed language, therefore a basic array definition can contain items of various types

```powershell
> $arrayLose = 1, "a", 999, "true"
PS C:\Users\Admin\Documents\workspace\work.log\pkutaj\_posts> $arrayLose
1
a
999
true
PS C:\Users\Admin\Documents\workspace\work.log\pkutaj\_posts> $arrayLose[0]
1
PS C:\Users\Admin\Documents\workspace\work.log\pkutaj\_posts> $arrayLose.GetType()

IsPublic IsSerial Name                                     BaseType
-------- -------- ----                                     --------
True     True     Object[]                                 System.Array
```

* you can use the syntax of c# to create a **STRONGLY TYPED ARRAY**
* also, in powershell, **ARRAY IS OF FIXED SIZE** — you would need an **ARRAY LIST** to be able to `Add` and `Remove` items from an array
* is you need an array of **FLEXIBLE** size in PowerShell, you need to declare the type

```powershell
[System.Collections.ArrayList]$FooBar
```

### comparison: JavaScript
* no way of having a native fixed-size array
* need to either freeze or seal the object

### sources
* <https://stackoverflow.com/a/44853951/11082684>