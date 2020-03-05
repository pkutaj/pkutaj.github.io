---
layout: post
title: BASH > parsing JSON with CURL + JQ
---
## THE CASE	OF PARSED JSON
* the question is using **BASH** terminal to parse **JSON**, i.e. to use the powershell alternative of `invoke-webrequest` or `curl` (...it's `curl` again)
* out of my **powershell**-y comfort zone, now!

![out_of_my_comfort]({{ site.url }}/assets/2020-03-05-out-of-my-comfort-zone.gif)

* a random placeholder used to demo the case is a `json` located at <http://jsonplaceholder.typicode.com/users>

## toc
<!-- TOC -->

- [git bash](#git-bash)
- [getting json](#getting-json)
- [create a binding](#create-a-binding)
- [install jq parser](#install-jq-parser)
- [on jq](#on-jq)
    - [jq: dot-operator for value selection when passed a key](#jq-dot-operator-for-value-selection-when-passed-a-key)
    - [jq: .[] iterator operatore](#jq--iterator-operatore)
    - [jq: iterating through the array of objects](#jq-iterating-through-the-array-of-objects)
- [sources](#sources)

<!-- /TOC -->

## findings
### git bash
 
* I am on Windows / VSCode, to use bash I am using [Git bash](https://www.atlassian.com/git/tutorials/git-bash)
* that has `curl` inside, nothing new as I have been using `curl` with powershell core already

###  getting json
* `curl -s http://jsonplaceholder.typicode.com/users` returns the whole JSON (powershell won't do this overview for you!)

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    //...
  }
```
###  create a binding
* Don't use full-uppercase variables for your script as they might conflict with a system variable with similar name
* There should not be spaces around = in the form variable=value
* In our case the right hand side is an expression; it should be wrapped it in backticks (``) which tells the shell that it encloses a command and should be substituted with the result.
* Backticks are legacy, using [ more capable ] `$()` instead of them.
* Finally double quote the command substitution to prevent word splitting.
* Now there is a variable holding the result to be extracted

```bash
$ json="$(curl -s http://jsonplaceholder.typicode.com/users)"
$ echo " $json "
 [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
```

###  install jq parser
* go to [Download jq](https://stedolan.github.io/jq/download/)
* place `jq.exe` into a folder that is reachable globally (see setting environental variables)
* I have a tools folder where I put all my scripts

### on jq
* The following is an adaptatino of [Working with JSON in bash using jq - Cameron Nokes](https://cameronnokes.com/blog/working-with-json-in-bash-using-jq/). Thanks! 
* jq works similarly to other unix commands: `sed` or `awk`, i.e. like a **FILTER** that you pipe to and extract values from. 
* like `sed` or `awk`, it basically has it’s own domain specific language (**DSL**) for querying JSON. 
* it is allegedly really intuitive.

#### jq: dot-operator for value selection when passed a key
* To print out the value of the foo property, we use the **. OPERATOR** followed by the property name.

```bash
echo '{ "foo": 123, "bar": 456 }' | jq '.foo'
# RETURNS 
# 123
```

* Use double quotes if string has white space or special characters

```bash
echo '{ "Version Number": "1.2.3" }' | jq '."Version Number"'
# RETURNS 
# "1.2.3"
```

#### jq: .[] iterator operatore
* `.[]` operator iterates through array items

```bash
echo '[1,2,3]' | jq '.[]'
# RETURNS 
# 1
# 2
# 3
```

#### jq: iterating through the array of objects
* there can be a repeated property in each object that is wrapped in an array
* then you combine `.[]` iterator operator + `.` select-operator

```bash
echo '[ {"id": 1}, {"id": 2} ]' | jq '.[].id'
# RETURNS
# 1
# 2
```

* for a more complicated `.json`...

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
  //...
  }]
```

* ... the following would return the list of `id`s

```bash
echo $json | jq '.[].id'
#RETURNS
#1
#2
#3
#4
#5
#6
#7
#8
#9
#10
```

* to return the values of a nested property, you would 
  * start with the `.[]` **ITERATOR OPERATOR**
  * combined with the chain of the nested keys with **. OPERATOR**
* to get a list of cities in the json above, just run]

```bash
json="$(curl -s http://jsonplaceholder.typicode.com/users)"
echo $json | jq '.[].address.city'
# RETURNS
# "Gwenborough"
# "Wisokyburgh"
# "McKenziehaven"
# "South Elvis"
# "Roscoeview"
# "South Christy"
# "Howemouth"
# "Aliyaview"
# "Bartholomebury"
# "Lebsackbury"
```

### sources
* [Parse JSON data using jq and curl from command line](https://medium.com/how-tos-for-coders/https-medium-com-how-tos-for-coders-parse-json-data-using-jq-and-curl-from-command-line-5aa8a05cd79b)
* [assignment - Bash - Set a variable - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/299858/bash-set-a-variable)

