---
layout: post
title: C# > refactoring statistics
---
## the case	
the question is, how to refactor a method that exists, but suddenly has to be used also by a sibling-class (that inherits the abstract method and should implement it on its own)

## toc
<!-- TOC -->

- [the situation](#the-situation)
- [STEP-1 extract inits into constructor](#step-1-extract-inits-into-constructor)
- [STEP-2 the question of average](#step-2-the-question-of-average)
- [sources](#sources)

<!-- /TOC -->

## findings
### the situation
* There are 2 siblings
    * `public class InMemoryBook : Book`
    * `public class DiskBook : Book`
* Their parent `Book` is an abstract class 

```c#
    public abstract class Book : NamedObject, IBook
    {
        public Book(string name) : base(name)
        {
        }

        public abstract event GradeAddedDelegate GradeAdded;

        public abstract void AddGrade(double grade);
        public abstract Stats GetStats();
    }
```
* The abstract method `public abstract Stats GetStats();` has to be implemented by children of the `Book`
* The `InMemoryBook` already has an implementation, while `DiskBook` was added only recently

![method_to_be_refactored]({{ site.url }}/assets/2020-01-17-method-for-refactoring.gif)

* The initial implementation of `GetStats()` in the new sibling is just 

```c#
public class DiskBook : Book
    {
//...
//START ➔ the initial implementation
        public override Stats GetStats()
        {
            throw new NotImplementedException();
        }
//END
    }
```

* But we need this method in order to get results when writing grades to disk
* Copy-Paste is a no-go (dry code, not spagetti code), we need a **single unambigous representation** of the `GetStats()`
* we need to extract the code from `InMemoryBook` into a separate unrelated class with reusable members

### STEP-1 extract inits into constructor

![extract_inits_into_constructor]({{ site.url }}/assets/2020-01-17-extract-inits-into-constructor.gif)


### STEP-2 the question of average
* the following code of the sibling class calculates an average grade

```c#
  public override Stats GetStats()
        {
          //...
          //START-Loop for grade calculations
            do
            {
             /* IRRELEVANT
              * result.highGrade = Math.Max(grades[i], result.highGrade);   
              * result.lowGrade = Math.Min(grades[i], result.lowGrade);     
              */
                result.averageGrade += grades[i];                           //generate running sum
                i++;
            } while (i < grades.Count);
        
            result.averageGrade = result.averageGrade / grades.Count;       //divide the sum with the count of grades
        //END
        //...
        }
```

### sources