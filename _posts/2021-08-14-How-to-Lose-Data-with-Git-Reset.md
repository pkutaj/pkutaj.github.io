## usecase
The aim of this anti-playbook🏁 is to outline steps for losing your (albeit saved) changes just by running `git reset --hard`. This seems irreversible.

<!-- TOC -->

- [1. steps/notes](#1-stepsnotes)

<!-- /TOC -->

### 1. steps/notes

1. you commit a file
2. you change a tracked file (file already commited) in the working area and do not commit it the change
3. you run `git reset --hard` 

* the branch is moved to the HEAD
* the state HEAD of that move is **copied both to the index and the working area**
* if you made any changes to either working area/index, that's all **irreversibly lost** 
* intentionally, it is a nice way to discard your changes, or course :) 
* rule: no commit, no restore
