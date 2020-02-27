---
layout: post
title: C# > fields vs properties
---
## the case	
the question is how classes carry attributes with fields and properties and what is the difference between them

## toc
<!-- TOC -->

- [fields and properties](#fields-and-properties)
- [properties example](#properties-example)
- [properties longhand](#properties-longhand)
- [properties shorthand](#properties-shorthand)

<!-- /TOC -->

## findings
### fields and properties
* both belong to the group of **14 member types** in the language
* fields are **variables** — declared in a class
* properties are **methods** — similar to fields in that they:
    1. can encapsulate state
    2. can store data for an object
    3. they are accessed **as-if** they were the fields of the class
* different syntax than fields
* **more powerful** features than fields

### properties example
* there is a field for storing a Name called `public string Name;`
    * that piece of state is exposed to the outside world
    * accessible from outside the code
    * but that can be set to an empty string or `null`

### properties longhand
* **getter** is what reads the property of a class
* **setter** us what writes into properties
* for property setters, note there is an **implicit variable** called `value` that is passed from the outside into the setter method be assigned
* below is the syntax of property creation in the original syntax of c#

CODE                     | COMMENT
-------------------------|------------------------------------------------------------------------------
1. `private string name` | start of with a field storing the underlying state
2. `public`              | access modifier
3. `type`                | property type
4. `Name`                | the title / name of the property (name is Name here)
5. no parameters         | note, even though property is a method, there is no signature with ()
6. `get`                 | `get` keyword for the reading of the property value
7. `return name;`        | code to return when property is called ➔ for example the value of the binding
8. `set`                 | `set` keyword for the writing of the property value
9. `name = value`        | the implicit variable `value` is assigned to the field `name`

```c#
    public string Name          // 1. – 5.
        {                        
            get                 // 6.
            {
                return name;    // 7. 
            }

               set              // 8. 
            {                   
                name = value;   // 9. 
            }
        }
    
    private string name;        
```

### properties shorthand 
* in more current releases of c#, there is a shorthand form for creating properties
    * this is called auto-implemented property
    * used when `get` and `set` accessor methods do no other operation than retrieve and define a value (read/write) of a private backing field
    * it is **similar but not identical to public field**, but there are few places where it differs (serialization, reflextion)
    * the main difference to a public field is that you can apply differnt access modifiers to `get` and `set` 

CODE                    | COMMENT
------------------------|----------------------------------------------------------------------------------------------------------
1. `public string Name` | access modifier, type, name **capitalized**
2. `get;`               | `get` keyword allowing the reading of the property value
3. `private`            | access modifier restricting the possibility to actually rename the property from the outside of the class
4. `set;`               | `set` keyword for writing the property value (restricted for intra-class usage)

```c#
    public string Name          // 1. 
        {
            get;                // 2.
            private set;        // 3. – 4. 
                                
        }
```