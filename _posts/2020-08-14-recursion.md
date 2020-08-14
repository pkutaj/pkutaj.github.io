v---
layout: post
title: cs > the case of recursive multiplication
categories: [programming]
---
## usecase
The concern is documenting the concept of recursion met in [SICP Distilled](http://www.sicpdistilled.com/section/1.2.1/)


<!-- TOC -->

- [1. solution](#1-solution)
- [2. definition](#2-definition)
- [3. example: factorial in clojure](#3-example-factorial-in-clojure)
- [4. example: string multiplication in JS](#4-example-string-multiplication-in-js)
- [5. example: reverse string](#5-example-reverse-string)
- [6. the elements of recursion](#6-the-elements-of-recursion)
    - [6.1. base case](#61-base-case)
    - [6.2. recurrence relation](#62-recurrence-relation)
    - [example: reverse string](#example-reverse-string)
- [7. sources](#7-sources)

<!-- /TOC -->

### 1. solution
a recursive function is calling itself in it's own body until it arrives to the base function, signalling that the work is done


### 2. definition
* recursion is a technique for iterating over an operation by having a function **call itself** repeatedly until it arrives at a result
* there are a few key features of recursion that must be insluded in order for it to work properly
    * **base case:** statememt, usually within a conditional clause like `if` that **STOPS** the recursion — it has to be **APPROACHABLE**
    * **recursive case:** statement where the recursive function is called on itself but modifies the call to that it **APPROACHES THE BASE**


![recursion_visualized]({{ site.url }}/assets/img001608.png)


### 3. example: factorial in clojure

```clojure
(defn factorial [n]

  (if (= n 1)

    1

    (* n (factorial (- n 1)))))
```

### 4. example: string multiplication in JS
```js
function repeatStringNumTimes(string, times) {
  if (times <= 0) return '';
  // BASE CASE
  if (times === 1) return string;
  // RECURSIVE CASE
  else {
    return string + repeatStringNumTimes(string, times - 1);
  }
}
console.log(repeatStringNumTimes('hello!', 15)); //hello!hello!hello!hello!hello!hello!hello!hello!hello!hello!hello!hello!hello!hello!hello!
```

### 5. example: reverse string
* in javascript

* <the result is constant> not growing, you have to ensure that this is balanced in the recursive vase → if one side grows, the other has to be reduced

```javascript
function rev(s){
  if(s === s[s.length-1]) return s[s.length-1]
  else return rev(s.slice(1)) + s.slice(0,1) 
}
```
![recursion_visualized]({{ site.url }}/assets/img001611.png)


* just for fun in clojure

```clojure
(defn recursive-reverse [coll]
    (if (empty? coll)
    []
    (conj (recursive-reverse (rest coll)) (first coll))))
```
— From <https://stackoverflow.com/a/16345932/11082684>


### 6. the elements of recursion
* 2 elements need crystalize to implement recursive function

#### 6.1. base case
* case you can get result without any further recursion. 
* the bottom case, reduced to the minimal scale. 

#### 6.2. recurrence relation
* the recursive relation is the relationship between the result of 
    * a problem 
    * its subproblems

* in general, the recursive function is called **according to the recurrence relation** until you reach the bottom

#### example: reverse string
* if you want to reverse a string, i.e. from `dog` make `god`
* you want to go until the last letter `g` and then add second `o` and then first `d`
* so you know the base case is that string is just the last letter of passed string
  * when that happens you stop "recurring", you stop with calling and start returning
* in base case you **test the reduced parameter** and if it hits the limit reduction level
  * return the atomic parameter

```
if(string.length === 1) return string
if("d".length === 1) return "d"

```

* the recurrence relation is an **equation**
  * the function itself on 1 side
  * the reduced function with an operation 

```
reverseString(string) = reverseString(String without 1st character) + firstCharacter
reverseString("dog")  = reverseString("og") + "d"
                      -> "go" + "d" 
```

### 7. sources
* [Three ways to repeat a string in JavaScript](https://www.freecodecamp.org/news/three-ways-to-repeat-a-string-in-javascript-2a9053b93a2d/)
