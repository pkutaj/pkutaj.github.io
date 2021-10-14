## usecase
The aim of this page📝 is to give code for getting the count of files in subfolders — note that this works only in direct subfolders right, it is not recursive. Also note the power of what is called Calculated Properties, basically a map function over the object passed through the pipeline within the query. 

<!-- TOC -->

- [1. notes](#1-notes)

<!-- /TOC -->

### 1. notes
```powershell
 Get-ChildItem -Recurse -Directory |
 Select-Object Name, @{
 Name="FileCount";
 Expression={(Get-ChildItem $_ -File | Measure-Object).Count }
}
```

* Output

```
Name           FileCount
----           ---------
.pytest_cache          3
.vscode                2
assets              1059
AWS                   30
bash                  13
bi                    32
books                  2
c-sharp               35
clojure               18
cloud                 21
cs                    61
csgt                   3
DATA                   9
db                     2
devops                12
family                 6
gas                    7
git                  100
history               18
hmm                    0
jekyll                 1
js                    66
kata                  12
kybel                  3
leet                   4
lisp                   2
node                  16
ntw                   22
ops                    5
powershell           238
productivity         144
python               325
regex                 14
sicp                 109
solr                   1
sources               10
sql                   23
uiux                   2
unix                   2
vsc                   30
web                   40
windows               37
windows_server        10
```
