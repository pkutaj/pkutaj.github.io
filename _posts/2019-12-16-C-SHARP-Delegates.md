---
layout: post
title: C# > Function Delegates
last_modified_at: 2019-12-12
---
## the case	
the question is what are function delegates within c#

## toc
<!-- TOC -->

- [events are out](#events-are-out)
- [on delegates](#on-delegates)
    - [why delegates](#why-delegates)
    - [syntax](#syntax)
    - [delegate-matching-methods are lambda expression](#delegate-matching-methods-are-lambda-expression)
    - [multi-cast delegates](#multi-cast-delegates)

<!-- /TOC -->

## findings
### events are out
* function delegates are used in the context of events, usually
* events have been in c# from its beginnings
* **but** they not used as much in contemporary frameworks as they used to 
* **also**  they are hard
* **on the other hand** are in WPF, Xamarin Forms, Windows Forms, much used in legacy solutions still out there

### on delegates
* it does describe and build a new type
* neither a class...
* ...nor a struct
* defines what a method looks like
* if you initialize say `var x = GetInt()` this creates a binding that can hold differnt integer values
* delegate can **point to and invoke different methods** not **values** 
    * it is a type of method delegating the work to the lower-order function (i.e. functon aka lambda expressions)
* requirement: the binding of a method has to have a specific
    * shape
    * structure

####  why delegates
* need abstraction, need indirection, need encapsulation between my code and code that does the actual job

#### syntax
1. declare a delegate as a **type** 
    * example: for writing logs

```c#
/* DELEGATE-TYPE SYNTAX
 * public delegate string WriteLogDelegate (string logMessage);
 *  1. access modifier ➔ public
 *  2. delegate keyword ➔ delegate
 *  3. return type ➔ string
 *  4. method name ➔ WriteLogDelegate
 *   - may look confusing as it looks like a method definition
 *  5. parameters ➔ (string logMessage)
 *  - string as type; logMessage as parameter name
 */

public delegate string WriteLogDelegate (string logMessage); // 1–5
```

2. write a **delegate-matching-method** matching the delegate type that the delegates consumes as a parameter
    * this matching method will be used as a parameter of the delegate
    * this matching method will be consumed by the parameter
    * this is a building block to be used within the delegate

```c#
/* DELEGATE-MATCH-METHOD SYNTAX
 * 1. access modifier ➔ public
 * 2. matching return type ➔ string
 * 3. name of match ➔ ReturnMessage
 * 4. matching parameter type ➔ string
 * 5. name of parameter ➔ message
 */
 
 public string ReturnMessage(string message) // 1–5
        {
            return message;
        }
```

3. point delegate (1.) to the delegate-matching-method (2.)


```c#
/* POINTING DELEGATE TO DELEGATE-MATCHING-METHOD: LONGHAND
 *
 * WriteLogDelegate log;
 *  1. explicitely initialize a binding ➔ WriteLogDelegate
 *  2. name the binding ➔ log
 *
 * log = new WriteLogDelegate(ReturnMessage); // 3.–5.
 *  3. start writing the assign statement ➔ log =
 *  4. instantiate delegate with the constructor ➔ new WriteLogDelegate
 *  5. pass the name of the delegate-matching-method into the constructor of the delegate ➔ (ReturnMessage)
        * note: passing just a name of the method, without parenthesis, NOT (ReturnMessage()), just a symbol referencing the method located somewhere in the class
 */
   [Fact]
        public void WriteLogDelegateCanPointToMethod()
        {
            WriteLogDelegate log; // 1.–2.
            log = new WriteLogDelegate(ReturnMessage); // 3.–5.
            log("Hello!");                
            Assert.Equal("Hello!", result);

        }
   
/* POINTING DELEGATE TO DELEGATE-MATCHING-METHOD:  SHORTHAND
 * 1.—2. Same as longhand ➔  WriteLogDel egate log;
 * 3. start writing the assign statement for the pointer ➔ log =
 * 4. assign it to the name of the delegate-matching-method ➔ ReturnMessage;
 */
   [Fact]
        public void WriteLogDelegateCanPointToMethod()
        {
            WriteLogDelegate log; // 1.–2.
            log = ReturnMessage; // 3-4. 
            log("Hello!");                
            Assert.Equal("Hello!", result);

        }


```

#### delegate-matching-methods are lambda expression
* delegates encapsulate lambda expressions
* ➔ higher order abstractions allowing **functions to be passed around as data**
* the name is from lambda calculus, a mathematical concept, and lambda is an arbitrary chosen letter of greek alphabet, which is a mathematical convention
* with lambda expressions it is possible to pass function as a parameter into another function or return function as a value from the function

#### multi-cast delegates
* delegates can invoke multiple methods
    * they are **multi-case delegates**
* can be confusing
* is powerful and flexible
* delegate-matching-methods (lamdas) can have different logic, they only need to take and return identical types


comment                                                    | code
-----------------------------------------------------------|-----------------------------------------------
1. initialize a top-level binding                          | `WriteLogDelegate log;`
2. assign first lamba                                      | `log = new WriteLogDelegate(ReturnMessage);`
3. assign second lambda with the increment operator **+=** | `log += new WriteLogDelegate(ReturnMessage);`
4. assign third lambda, this time a different one          | `log += new WriteLogDelegate(IncrementCount)`
5. delegate-matching-method 1                              | `public string IncrementCount(string message)`
6. delegate-matching method 2                              | `public string ReturnMessage(string message)`


```c#
 public void WriteLogDelegateCanPointToMethod()
        {
            WriteLogDelegate log;                           // 1.
            log = new WriteLogDelegate(ReturnMessage);      // 2. 
            log += new WriteLogDelegate(ReturnMessage);     // 3. 
            log += new WriteLogDelegate(IncrementCount);    // 4. 

            var result = log("Hello!");

        }

        public string IncrementCount(string message) // 5. 
        {
            count++;
            return message.ToLower();
        }
        public string ReturnMessage(string message) // 6. 
        {
            count++;
            return message;
        }

```