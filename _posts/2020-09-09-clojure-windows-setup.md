---
layout: post
title: clojure > VSCode 4 windows setup, define, dcall 
categories: [clojure]
---
## abstract
The concern is documenting starting to work with clojure in windows (clojure is made for linux & OSX is seems)

## contents
<!-- TOC -->

- [1. install leiningen](#1-install-leiningen)
- [2. install clojure plugin](#2-install-clojure-plugin)
- [3. open REPL](#3-open-repl)
- [4. define function](#4-define-function)
- [5. call function](#5-call-function)

<!-- /TOC -->

### 1. install leiningen
* use chocolatey
* leiningen is a build automation tool for clojure → you need this to run clojure on windows

```
choco install lein
```

### 2. install clojure plugin
* I am using `avli.clojure`

### 3. open REPL
* open the `.clj` file and the extension fires up the Leiningen REPL
* if the REPL is not started automatically, run command `>clojure: start nREPL`
* open the integrated terminal
* in the integrated terminal run 

```
lein repl :connect localhost:<port>
```

* the port matches the port of the REPL initiated by the extension

### 4. define function
* the first example is a recursive approach to return factorial

```clojure
(defn factorial [n]

  (if (= n 1)

    1

    (* n (factorial (- n 1)))))
```

### 5. call function
* run `Clojure Eval` command 
* this command imports the function into the REPL
* in REPL, you can call it with the selected parameter

![read_evaluate_print_loop]({{ site.url }}/assets/img001723.png)

```
(factorial 7)
5040
```
