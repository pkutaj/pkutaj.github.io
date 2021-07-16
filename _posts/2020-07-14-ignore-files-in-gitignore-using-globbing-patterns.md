## abstract
The concern is documenting how to ignore files in a git project with a `.gitignore` file using so called globbing pattens (aka standard wildcards). 

## video
## contents
<!-- TOC -->

- [1. globbing patterns](#1-globbing-patterns)
- [2. special characters](#2-special-characters)
- [3. my scenario](#3-my-scenario)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. globbing patterns
* [glob(7): globbing pathnames - Linux man page](https://linux.die.net/man/7/glob)

* glob is a pattern matching program since the earliest times of Unix (V6/1975?)
    - globbing patters are known as standard wildcards
* not regex

>Sixth Edition Unix, also called Version 6 Unix or just V6, was the first version of the Unix operating system to see wide release outside Bell Labs. It was released in May 1975 and, like its direct predecessor, targeted the DEC PDP-11 family of minicomputers. It was superseded by Version 7 Unix in 1978/1979, although V6 systems remained in regular operation until at least 1985.

— from [Version 6 Unix - Wikipedia](https://en.wikipedia.org/wiki/Version_6_Unix)

* powershell has globbing patterns implemented as well without any addition; DOS has some differences (see the wikipedia page)

### 2. special characters
1. `*` for any char
2. `?` for single char
3. `[]`for range
4. `!` for negation
5. `\` for escape 
6. `/` for directory
7. `#` for comment

### 3. my scenario
* in one particular example, I need to filter all docs that contain either `-prod1` string or `alert` string 
* also nothing in `/docs` folder

```
_site
.sass-cache
.jekyll-cache
.jekyll-metadata
vendor
gemfile.lock
*-prod1*
*alert*
/docs
```

### 4. sources
* [.gitignore file - ignoring files in Git | Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/saving-changes/gitignore)
* [Ignoring Files and Directories in Git (.gitignore) | Linuxize](https://linuxize.com/post/gitignore-ignoring-files-in-git/)
* [glob (programming) - Wikipedia](https://en.wikipedia.org/wiki/Glob_(programming))
* [Wildcards](https://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm)
