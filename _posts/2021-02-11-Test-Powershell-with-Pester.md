---
layout: post
title: Test Powershell with Pester (finally there!)
categories: [powershell]
---
## usecase
The aim is of this tutorial🔍 is the introduction of Pester — the unit testing framework for Powershell

<!-- TOC -->

- [1. Install Pester](#1-install-pester)
- [2. File Name](#2-file-name)
- [3. BDD inspired syntax](#3-bdd-inspired-syntax)
- [4. Structure: USE AAA](#4-structure-use-aaa)
- [5. Should statement and its switches](#5-should-statement-and-its-switches)
    - [5.1. Should -Be](#51-should--be)
    - [5.2. Should -Exist](#52-should--exist)
    - [5.3. Should -FileContentMatch](#53-should--filecontentmatch)
- [6. Sources](#6-sources)

<!-- /TOC -->

### 1. Install Pester
* I use chocolatey

```
choco install pester
```

### 2. File Name
* test file needs to be called `*.tests.ps1`

### 3. BDD inspired syntax
* The basic snippet for unit tests I am using is

```
Describe "DescribeName" {
    Context "ContextName" {
        It "ItName" {
            Assertion
        }
    }
}
```

> The describe-driven inspiration for syntax can be largely attributed be traced back to Ruby land and the well known RSpec Ruby test framework. This nested style is usually called “BDD Style” for “Behavior driven development”.

— From [2 A first unit test - The Art of Unit Testing, Third Edition MEAP V04](https://livebook.manning.com/book/the-art-of-unit-testing-third-edition/chapter-2/v-4/172)

### 4. Structure: USE AAA 
* names of the whole test block is important as you should get from the test output all information
* USE AAA is the acronym combining the naming needed for the block
    * `U` for the Unit of work (function, usually) `describe`
    * `S` for scenario, usually introduced by the word `given...`
    * `E` for expectation, usually introduced by words `it should...`
* AAA is a traditional structure of the inner workings of a unit test
    * `A` for arrange — set up all bindings necessary (inputs) to call the function
    * `A` for act — call the function with a given input at its entry point
    * `A` for assert — test the function at one of its exit points

![USE AAA]({{ site.url }}/assets/img002561.jpg)


### 5. Should statement and its switches
* before running `Should` function, you need
    * arrange the tests by configuring proper inputs
    * act to run the unit to obtain result
* `Should` is combined with many built-in switches that are good to know

#### 5.1. Should -Be
* for value


```powershell
Describe "add" {
    Context "given 1 + 1" {
        It "returns 2" {
            $input1 = 1 
            $input2 = 1
            $result = add $input1 $input2
            $result | Should -Be 2
        }
    }
}
```


#### 5.2. Should -Exist

```powershell
Describe "createCodeFilesPyth" {
    Context "Given Python funcon" {
        It "creates .py and _test.py files" {
            $input = "foo"
            $result = @(".\foo.py", ".\foo_test.py")
            create-PythonFiles($input)
            $result | Should -Exist
        }
    }
}
```

#### 5.3. Should -FileContentMatch
* checks to see if a file contains the specified text
* note that the input is either an object or a path string

```python
Describe "createCodeFilesPyth" {
    Context "Given Python funcon" {
        It "adds 'from Filename import *' into test file" {
            $input = "foo"
            $result = "from foo import *"
            create-PythonFiles($input)
            "foo_test.py" | Should -FileContentMatch $result
        }

    }
}
```

### 6. Sources
* [2 A first unit test - The Art of Unit Testing, Third Edition MEAP V04](https://livebook.manning.com/book/the-art-of-unit-testing-third-edition/chapter-2/v-4/172)
