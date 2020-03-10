---
layout: post
title: C# > refactoring a method by extracting it into its own class
---
## the case	
* the question is, how to refactor a method that exists, but suddenly has to be used also by a sibling-class (that inherits the abstract method and should implement it on its own)
    * see <https://github.com/pkutaj/c-sharp-gradebook> 

## toc
<!-- TOC -->

- [the situation](#the-situation)
- [STEP-1 extract inits into constructor](#step-1-extract-inits-into-constructor)
- [STEP-2 add a number into the stats class](#step-2-add-a-number-into-the-stats-class)
- [STEP-3 the question of average](#step-3-the-question-of-average)
- [STEP-4 get max and min of entered grades](#step-4-get-max-and-min-of-entered-grades)
- [STEP-5 move letter grade into a statistics class](#step-5-move-letter-grade-into-a-statistics-class)
- [STEP-6 final result](#step-6-final-result)

<!-- /TOC -->

## findings
### the situation
* There are 2 siblings
    * `public class InMemoryBook : Book`
    * `public class DiskBook : Book`

* Their parent `Book` is an **ABSTRACT CLASS** 

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

* The abstract method `public abstract Stats GetStats();` is **REQUIRED** to be implemented by children of the `Book`
* The `InMemoryBook` already has an implementation of that class, while `DiskBook` was added only recently

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

* But we need a particular implementation of this method in order to achieve writing of the results to the disk
* Copy-Paste from a sibling is a no-go (dry code, not spaghetti code), we need a **single unambiguous representation** of the `GetStats()`
* we need to extract the code from `InMemoryBook` into a separate unrelated class with reusable members

### STEP-1 extract inits into constructor

![extract_inits_into_constructor]({{ site.url }}/assets/2020-01-17-extract-inits-into-constructor.gif)


### STEP-2 add a number into the stats class

CODE                                     | COMMENT
-----------------------------------------|------------------------------------------------------------------------------------------
`public void Add(double gradeParameter)` | public method, with no returning value, changing the state of the object / defined values
`runningSum += gradeParameter;`          | increment the running sum with the value of the next grade
`gradesCount++;`                         | increment the count of grades, necessary to compute the average

```c#
namespace GradeBook
{
    public class Stats
    {
        public Stats()
        {
            highGrade = double.MinValue;
            lowGrade = double.MaxValue;
            runningSum = 0.0;
            gradesCount = 0;

        }
        public void Add(double gradeParameter)
        {
            runningSum += gradeParameter;
            gradesCount++;
        }

```

### STEP-3 the question of average
* the following method of the sibling class calculates an average grade

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

* replace it with a property `Average` in the new `Stats` class that calculates the average when the property is called

CODE                               | COMMENT
-----------------------------------|-------------------------------------------------------------------------------------------------
`public double AverageGrade`       | properties are not parametrized
`get`                              | getter method is explicitly defined; there is **no setter**; the property is read-only
`return runningSum / gradesCount;` | the getter method divides the `runningSum` and `gradesCount` of the moment to produce an average

```c#
public class Stats
    {
        public Stats()
        {
            highGrade = double.MinValue;
            lowGrade = double.MaxValue;
            runningSum = 0.0;
            gradesCount = 0;

        }
        public void Add(double gradeParameter)
        {
            runningSum += gradeParameter;
            gradesCount++;
        }
        public double AverageGrade
        {
            get
            {
                return runningSum / gradesCount;
            }
        }
```

### STEP-4 get max and min of entered grades
* From having the calculation of limits inside of one of the sibling classes

```c#
// InMemoryBooks.cs
public override Stats GetStats()
   {
       Stats result = new Stats()
       var i = 0;
       do
       {
           result.Add(grades[i]);
           result.highGrade = Math.Max(grades[i], result.highGrade);
           result.lowGrade = Math.Min(grades[i], result.lowGrade);
           i++;
       } while (i < grades.Count);

```

* ... moving that into a separate file into the `Add` method, so that the limits are re-calculated with each addition of a new grade

```c#
// Stats.cs
using System;
using System.Collections.Generic;
namespace GradeBook
{
    public class Stats
    {
        public Stats()
        {
            highGrade = double.MinValue;
            lowGrade = double.MaxValue;
            runningSum = 0.0;
            gradesCount = 0;

        }
        public void Add(double gradeParameter)
        {
            runningSum += gradeParameter;
            gradesCount++;
            highGrade = Math.Max(gradeParameter, highGrade);
            lowGrade = Math.Min(gradeParameter, lowGrade);
        }
```

### STEP-5 move letter grade into a statistics class
* compute the letter grade upon invoking the property
* the value of the property does not exist before the call
* there is another **FORMULA** ran, in PS this is also called **CALCULATED PROPERTY**
* in C#, you have a **GETTER** method where you put this code
* initially, you only have a field `letter`, an assignable field of a class

```c#
/* INITIAL STATE: JUST A FIELD */
public double highGrade;
public double lowGrade;
public char letter;
public double runningSum;
```

* add a getter

### STEP-6 final result

```c#
using System;
namespace GradeBook
{
    public class Stats
    {
        public Stats()
        {
            highGrade = double.MinValue;
            lowGrade = double.MaxValue;
            runningSum = 0.0;
            gradesCount = 0;

        }
        public void Add(double gradeParameter)
        {
            runningSum += gradeParameter;
            gradesCount++;
            highGrade = Math.Max(gradeParameter, highGrade);
            lowGrade = Math.Min(gradeParameter, lowGrade);
        }
        public double AverageGrade
        {
            get
            {
                return runningSum / gradesCount;
            }
        }
        public double highGrade;
        public double lowGrade;
        public char letter
        {
            get
            {
                switch (AverageGrade)
                {
                    case var d when d >= 90.0:
                        return 'A';
                    case var d when d >= 80.0:
                        return 'B';
                    case var d when d >= 70.0:
                        return 'C';
                    case var d when d >= 60.0:
                        return 'D';
                    default:
                        return 'F';
                }
            }
        }
        public double runningSum;
        public int gradesCount;

    }
}
```