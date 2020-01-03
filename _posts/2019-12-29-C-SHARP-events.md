---
layout: post
title: C# > Events
last_modified_at: 2019-12-17 
---
## the case	
the scenario is:
* there is a gradebook
* there are components that **need to know when** grades are added 

>Hollywood Principle: "Don't call us; we'll call you." ... You implement the interfaces, you get registered. You get called when the time is right. This requires a distinctly different way of thinking to that which is taught in introductory programming where the student dictates the flow of control.

## toc
<!-- TOC -->

- [mechanics](#mechanics)
- [define a delegate for events](#define-a-delegate-for-events)
    - [STEP-1 define a delegate type (separate-file-location)](#step-1-define-a-delegate-type-separate-file-location)
    - [STEP-2 initiate an event (class-specific-location)](#step-2-initiate-an-event-class-specific-location)
    - [STEP-3 raise the event (line-specific-location)](#step-3-raise-the-event-line-specific-location)
    - [STEP-4 define the event handler (class-specific-location)](#step-4-define-the-event-handler-class-specific-location)
    - [STEP-5 call the event handler (method-specific-location?)](#step-5-call-the-event-handler-method-specific-location)

<!-- /TOC -->

## findings
### mechanics
* The main method contains a method that is within the book class

```c#
//program.cs
                try
                {
                    var grade = double.Parse(input);
                    book.AddGrade(grade); // method from the book class
                }
```

* The book class is in a dedicated file and contains a definition of the `AddGrade(grade)`

```c#
//book.cs
        public void AddGrade(double grade)
        {
            if (grade <= 100 && grade >= 0)
            {
                grades.Add(grade);
                
                // EVENT FIRES HERE - other piece of software needs to be called in
                // DELEGATE INVOCATION
            }
            else
            {
                throw new ArgumentException($"Invalid {nameof(grade)}");
            }
        }

```

* **it's not the responsibility of the book class (event source)** to keep track of everyone who needs to know
* this is where **delegates** step in
    * at runtime, someone can point that delegate to different pieces of code available somewhere else in the application

### define a delegate for events

* invoke a delegate at an appropriate time (right after the grade was added     )

![single-delegate-to-many-expressions]({{ site.url }}/assets/img000363.png)

#### STEP-1 define a delegate type (separate-file-location)
* this defines a delegate class often in a separate file
* often delegate would be put in a separate `.cs` file (as per file per type convention)
    * not here
* parameter 1 is `object`, the base type in .NET
* parameter 2 is `EventArgs`, allowing to pass along additional information about this event
    * there is a plethora in information that can be passed along with the event
    * e.g. value of the added grade in this scenario

CODE                    | COMMENT
------------------------|--------------------------------------------------------------------------------------------------------------
1. `public`             | access modifier
2. `delegate`           | delegate type declaration
3. `void`               | this delegate does not return a value, just announces grade addition
4. `GradeAddedDelegate` | delegate name
5. `object sender`      | first parameter **conventionally passed** in .NET as part of event delegate (object is the base type in .NET)
6. `EventArgs args`     | second parameter **conventionally passed** in .NET as part of event delegate


```c#
// STEP-1 define a delegate type
  public delegate void GradeAddedDelegate(object sender, EventArgs args)      //1-6
    {

    };
```

#### STEP-2 initiate an event (class-specific-location)
* this initiates an event at a specific class 
* event, much like a field, method or a property, can be a member of a class
* there's a dedicated keyword `event`
    * adds restrictions and capabilities that makes the delegate safer to use

CODE                    | COMMENT
------------------------|-----------------------------------------------------
1. `public`             | access modifier; everyone can call this member
2. `event`              | event keyword flagging the field as an event
3. `GradeAddedDelegate` | type declaration matching the defined delegate above
4. `GradeAdded`         | event name


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

    // STEP-2 defining event as a class field

    public event GradeAddedDelegate GradeAdded;     // 1-4
    
    // END OF STEP-2

```

#### STEP-3 raise the event (line-specific-location)
* raising the event is really just invoking the delegate
* this instantiates the initiated event at the specific line of code

CODE                         | COMMENT
-----------------------------|------------------------------------------------------
1. `if (GradeAdded != null)` | test if the event has any subscribers at all
2. `GradeAdded`              |
3. `this`                    | matching `sender`: `this` keyword as a usual argument
4. `new EventArgs()`         | matching `args`: a new instance of `EventArgs` class

```c#
public void AddGrade(double grade)
    {
        if (grade <= 100 && grade >= 0)
        {
            grades.Add(grade);

            // STEP-3 invoke the event
            if (GradeAdded != null)                 //1 
            {
                GradeAdded(this, new EventArgs());  //2-4
            }
            // END OF STEP-3
        }
        else
        {
            throw new ArgumentException($"Invalid {nameof(grade)}");
        }
    }
```

#### STEP-4 define the event handler (class-specific-location)
* handling is adding a particular delegate-matching-method, a function expression that is passed into a delegate with an event type
* this method, aka event-handler, does a what actually needs to be done
* thus the function expression is added to the instance of the event, whose role is to serve as an **invocation list**
    * use  `+=` operator to pack the invocation list with all existing delegate-matching-methods
* event handler needs to be defined
    * is a delegate-matching-method
    * in this case any method that returns `void` and takes `object` and `EventArgs`
    * located in the program class
    * is called from the static main method
    * also needs to be static in that case

CODE                              | COMMENT
----------------------------------|------------------------------------------------------------------
1. `static`                       | has to be static (1-only) since handled in a static `main` method
2. `void`                         | delegate-matchnig return type ➔ does not produce any expressions
3. `OnGradeAdded`                 | special name
4. `(object sender, EventArgs e)` | delegate-matching parameters

```c#
static void Main(string[] args)
        { //... 

// STEP-4 define the event handler
static void OnGradeAdded(object sender, EventArgs e) //1-4
        {

        }
        }
```

#### STEP-5 call the event handler (method-specific-location?)
* *Q: from where can the event be handled?*
    * ➔ From anywhere where event-source-class is instantiated
    * the first place to start is **right under the object instantiation**

CODE                 | COMMENT
---------------------|------------------------------------------------------------------------------------
1. `book.GradeAdded` | event belonging to the instance of the type Book
2. `+=`              | each handler is added to this event making it an invocation list / handler register
3. `OnGradeAdded`    | specific handler that is called when this

```c#

static void Main(string[] args)
        {
            Console.WriteLine("Enter a name for your Gradebook");
            var bookName = Console.ReadLine();
            Book book = new Book(bookName);
            
            // multi-cast delegate accepts as many methods as needed
            // STEP-5 call the event handler
            book.GradeAdded += OnGradeAdded; //1-3
            book.GradeAdded -= OnGradeAdded;
            book.GradeAdded += OnGradeAdded;
            book.GradeAdded += OnGradeAdded;

            while (true) //while not-done
            {

                Console.WriteLine("Enter a grade or 'q' to quit");
                var input = Console.ReadLine();
                //...

```
* **note:** in an event handler, it is not possible to use `=` operator to overwrite all the list with a single handler or even `null`

![only_+=_legal]({{ site.url }}/assets/img000369.png)

