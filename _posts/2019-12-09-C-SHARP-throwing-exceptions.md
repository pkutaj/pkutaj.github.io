---
layout: post
title: C# > throwing exceptions
last_modified_at: 2019-12-11
---
## the case	
the question is how to program defensively by throwing exceptions

## toc
<!-- TOC -->

- [throw keyword](#throw-keyword)
- [try catch](#try-catch)

<!-- /TOC -->

## findings
### throw keyword
* use `throw` to create `exception` objects
* the original validation
```c#
public void AddGrade(double grade)
        {
            if (grade <= 100 && grade >= 0)
            {
                grades.Add(grade);
            }
            else
            {
                Console.WriteLine("Invalid value"); //produce line saying "invalid value" in the console
            }
        }
```
* there is a lots of built-in exceptions to use

![exceptions]({{ site.url }}/assets/2019-12-09-exceptions.gif

* in a more complex systems, you build you own exception types
* there is **either/or** logic to throwing exceptions
    * **either** it crashes
    * **or** it is caught 
* the runtime is actually looking for a piece of code **catching** this exception

```c#
public void AddGrade(double grade)
        {
            if (grade <= 100 && grade >= 0)
            {
                grades.Add(grade);
            }
            else
            {
                throw new ArgumentException($"Invalid {nameof(grade)}");
            }
        }
```

### try catch
* 1. use `try`
* 2. use `catch`
    * catch and process exceptions
    * when an exception is thrown, the rest of code is skipped and runtime goes looking for the closest `catch` statement

```c#
            while (true) // infinite loop until q
            {

                Console.WriteLine("Enter a grade or 'q' to quit");
                var input = Console.ReadLine();
                if (input == "q")
                {
                    break;
                }

                try // 1. run the following 
                {
                    var grade = double.Parse(input);
                    book.AddGrade(grade);
                }
                catch (Exception ex) // 2. if error, do the following and continue looping
                {
                    Console.WriteLine(ex.Message);
                    throw; // 3. throw an exception again and some other catch has to handle it, crash otherwise
                }
            }
```

![exceptions_in_action ]({{ site.url }}/assets/2019-12-10-exceptions.gif)

## sources
* [What language was the first to implement exception handling? - Stack Overflow](https://stackoverflow.com/questions/1449951/what-language-was-the-first-to-implement-exception-handling)