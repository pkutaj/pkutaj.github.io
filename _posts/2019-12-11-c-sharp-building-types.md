---
layout: post
title: C# > Properties and read-only Members
last_modified_at: 2019-12-12
---
## the case	
the question are elements of buildings types in c#

## toc
<!-- TOC -->

- [method overloading](#method-overloading)
- [properties](#properties)
    - [example](#example)
    - [longhand](#longhand)
    - [shorthand](#shorthand)
- [constants](#constants)
    - [read-only](#read-only)
    - [const](#const)

<!-- /TOC -->

## findings
### method overloading
* in general, you can't have multiple members using the same name within the class
* however, you can have multiple methods using the same name inside of a class ➔ **method overloading**
* the example below is a legit piece of code
* the compiler takes a look at the method signature, but **not at a return type**

```c#
public void AddGrade(char letter) // AddGrade method with character parameter
        {
            switch (letter)
            {
                case 'A':
                    AddGrade(90);
                    break;

                case 'B':
                    AddGrade(80);
                    break;

                case 'C':
                    AddGrade(70);
                    break;

                case 'D':
                    AddGrade(60);
                    break;

                default:
                    AddGrade(0);
                    break;
            }
        }


        public void AddGrade(double grade) //AddGrade method with double parameter
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
### properties
* similar to fields in that
    * can encapsulate state
    * can store data for an object
* different syntax than fields
* more features than fields

#### example
* there is a field for storing a Name called `public string Name;`
    * that piece of state is exposed to the outside world
    * accessible from outside the code
    * but that can be set to an empty string or `null`

#### longhand
* getter is what reads the property of a class
* setter us what writes into properties
* for property setters, note there is an **implicit variable** called `value` that is passed from the outside into the setter method be assigned
* below is the syntax of property creation in the original syntax of c#

```c#
    public string Name         // 1. access - 2. type - 3. Name - 4. no parameters
        {                       // 5. curly braces
            get                 // 6. get keyword - 7. curly braces
            {
                return name;    // 8. code to return when property is called ➔ e.g. value of a binding
            }

               set              // 9. set keyword
            {                   // 10. curly braces
                name = value;   // 11. assign a property an implicit variable "value"
            }
        }
    
    private string name;        // 12. initiate a backing field storing property values

```

#### shorthand 
* in newer releases of c#, there is a shorthand form for creating properties
    * this is called auto-property
    * it is similar to public field, but there are few places where it differs (serialization, reflextion)
    * the main difference to a public field is that you can apply differnt access modifiers to `get` and `set` 
```c#
    public string Name          // 1. access - 2. type - 3. name
        {
            get;                // 4. get keyword 
            private set;        // 5. set keyword - 6. private access ➔ readonly member
                                
        }
```

### constants
* couple different ways to declare `const`s in c#

#### read-only
* gives a field that can be initialized **only in constructor** or a **variable initializer**
    * constructors can be overloaded as long as signature is unique
* good practice to have a number of read-only fields
* such types have values assigned within a constructor
* those values are stable within the runtime no matter what happens during object's lifetime

#### const
* more strict than `read-only`
* you can't use a const field even in a constructor
* constant field can be private or public
* there is a convention to put consts in upper-case

```c#
public const string CATEGORY = "Science";
```

* const is not a piece of state ➔ it's much more efficient to have this associated as a static field ➔ refer to it with the class

## terminology
* constructor
* method overloading
* variable initializer

 
## sources