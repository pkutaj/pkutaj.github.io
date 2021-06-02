## usecase
The aim of this playbook🏁 is to define a command that lists all branches in the order they were manipulated (in a descending fashion). 
<!-- TOC -->

- [1. steps](#1-steps)
- [sources](#sources)

<!-- /TOC -->

### 1. steps
```
git branch -a --sort=-committerdate --format='%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(color:red)%(objectname:short)%(color:reset) - %(contents:subject) - %(authorname) (%(color:green)%(committerdate:relative)%(color:reset))'
```

![]({{ site.url }}/assets/img002890.jpg)

### sources
* [version control - How can I get a list of Git branches, ordered by most recent commit? - Stack Overflow](https://stackoverflow.com/questions/5188320/how-can-i-get-a-list-of-git-branches-ordered-by-most-recent-commit)
