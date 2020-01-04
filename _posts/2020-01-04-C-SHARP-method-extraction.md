---
layout: post
title: C# > method extraction
last_modified_at: 
---
## the case	
the question is, how to rearrange code with the technique of method extraction

## findings
### example: extract method from the main method
* **method extraction** is a refactoring technique used to rearrange code
* just highlight the code and let the editor to
    * analyze the return type
    * analyze what parameters are needed
    * place the code away from the existing method into a separate method
    * the details are abstracted away, the instruction is readable and the implementation encapsulated

![extract_method]({{ site.url }}/assets/2020-01-02-c-sharp-oop-polymorphism-1.gif) 