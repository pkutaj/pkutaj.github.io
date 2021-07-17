## usecase
The aim of this how-to-guide🏁 is to automatically install all dependencies of a python script with a single command

* `requirements.txt` is a file that makes it easier for other devs to install the correct versions of required packeges

> How many times will we have to undergo this tedious back-and-forth? Why do we have to try to run the app just to be told one-at-a-time which packages we’re missing? Why can’t we just install all the packages this run.py script depends on, all at once? Are we even installing the right versions of the packages?

— Robert Boscacci

<!-- TOC -->

- [1. steps](#1-steps)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. steps
* write your code locally
* run `pip freeze > requirements.txt` — to automatically create/populate `requirements.txt`
* clean it up — as the `pip freeze` outputs all modules not just the imported ones in the project folder
    - this is up to 100 modules
    
```
GitPython==3.1.14
oyaml==1.0
```

* within `readme.md`, instruct users to run the following when initializing the program/script

```
pip install -r requirements.txt
```

### 2. sources
* [Why and How to make a Requirements.txt by Robert Boscacci](https://blog.usejournal.com/why-and-how-to-make-a-requirements-txt-f329c685181e)
