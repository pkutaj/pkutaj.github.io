---
layout: post
title: C# > Jumping and Switching
last_modified_at: 2019-12-10
---
## the case	
the question is the concept of jumping and switching in c#

## toc
<!-- TOC -->

- [jumping](#jumping)
- [switching](#switching)
    - [classical switch](#classical-switch)
    - [pattern matching with switch](#pattern-matching-with-switch)

<!-- /TOC -->

## findings
### jumping
* `break`: stop the **loop**

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

* `continue`: stop the **iteration**

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

### switching
* switch evaluates its own expression
* switch matches the expression's value to a case clause
* executes statements associated with that case
* proceeds to the next case
* if no matching case clause is found, the program looks for the optional default clause and executes it if found
    * by convention, the default clause is the last one
* the  break statement ensures that the program breaks from the switch once the matched statement is executed and continues execution at a statement following switch
 
> switch defenders try to prove a point that in some simple situations it is alright to use switch-case, like some really simple checking. My experience tells me other otherwise and I am belonging fully to the first group. These statements in these so-called “simple situations” often get out of hands, and what we usually end up with large unreadable chunks of code. Not to mention that if the requirements change (and we know that they do), the statement itself has to be modified, thus breaking Open-Close Principle. This is especially the case in enterprise systems and this kind of thinking leads to maintenance hell.

#### classical switch
```c#
     public void AddLetterGrade(char letter) //char type; a struct accepting single character
        {
            switch (letter) 
            {
                case 'A': // expression evaluated and matching cases
                    AddGrade(90);
                    break; // break is required in c# as oppposed to js

                case 'B':
                    AddGrade(80);
                    break;

                case 'C':
                    AddGrade(70);
                    break;

                case 'D':
                    AddGrade(60)
                   break;

                default:
                    AddGrade(0);
                    break;
            }
        }

```

#### pattern matching with switch
* starting with c# version 7 (2017) ➔ not only constant values as in classical switch
* typically binding is matched against a type, but here are additional features possible
    * not only average grade is 
* create a binding on the case level
    * the binding receives the value passed into the switch statement
* use when statement for creating conditions
    * condition that evaluates at runtime and only if this condition is met
* also type matching possible

```c#
// the aim of the code is to map a final grade to the set of ranges 

      switch (result.averageGrade)
            {
                case var d when d >= 90.0: // variable; when
                    result.letter = 'A';
                    break;
                case var d when d >= 80.0:
                    result.letter = 'B';
                    break;
                case var d when d >= 70.0:
                    result.letter = 'C';
                    break;
                case var d when d >= 60.0:
                    result.letter = 'D';
                    break;
                default:
                    result.letter = 'F';
                    break;
            }
```
 
## sources
* boolean operator
    * &&
    * || 
* branching
* control flow
* error conditions
* looping
* returning
