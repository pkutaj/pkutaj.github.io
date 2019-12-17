---
layout: post
title: PS > the tricks with dir (set-location)
last_modified_at: 
---
## the case	
the question is, what all can be done with one of the most widely used commands, i.e. `dir`

## toc
<!-- TOC -->

- [format and sort](#format-and-sort)
- [filter](#filter)
- [recurse + oh -paging](#recurse--oh--paging)
- [search-string w/ dir](#search-string-w-dir)
- [filter multiple strings with -include](#filter-multiple-strings-with--include)
- [count files (with filter)](#count-files-with-filter)
- [search registry](#search-registry)

<!-- /TOC -->

## findings
### format and sort
* `dir -file | sort | fw -auto`
* the command must be in that order
    * i am very fond of using aliases for my personal use
    * `-file` filters output to files

![dir_sort_autosize]({{ site.url }}/assets/img000128.png)


### filter
- `-filter` can use only `*` and `?` wildcards, which is good enough for most of the time
- working nice with the combination with `-recurse`

![dir_filter_recurse]({{ site.url }}/assets/img000153.png)

### recurse + oh -paging
* I have been using the following to display a selected depth of the directory tree
* Thanks to [Displaying text one page at a time in PowerShell: more, less, head, tail – 4sysops](https://4sysops.com/archives/displaying-text-one-page-at-a-time-in-powershell-more-less-head-tail/)
```powershell
dir -recurse -depth 2 -directory | oh -paging
```
* Using `dir *foo.bar -recurse | oh -paging` as a quick search with possibility to instantly quit the search if I am happy with the first page

### search-string w/ dir
* just use `dir | sls "fooBar"` to get names of files with `fooBar` string in it
* ![search string with dir | sls]({{ site.url }}/assets/img000130.png) 

### filter multiple strings with -include
* `-Filter` only accepts a single string. 
* `-Include` accepts multiple values, but qualifies the `-Path` argument. 
* The trick is to append \* to the end of the queried path, and then use `-Include` to select multiple string. 
* `dir * -include *.dll, *.exe -recurse`

```powershell
dir * -include *.md, *.png -recurse | sort LastWriteTime -Descending | select -first 

  Directory: C:\Users\Admin\Documents\workspace\kb\powershell

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        10/18/2019    04:55           1825 display-friendly-fileSize.md
-a----        10/17/2019    17:00           2316 dir.md
-a----         10/9/2019    11:05           3640 change-directory-fast.md

    Directory: C:\Users\Admin\Documents\workspace\kb\powershell\img

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----         10/9/2019    11:02          26163 img000152.png

    Directory: C:\Users\Admin\Documents\workspace\kb\powershell

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----         10/8/2019    07:20           2087 extract_and_open.md
```

### count files (with filter)
* `(dir *foo* | measure).count`
```plaintext
PS C:\Users\Admin\Documents\workspace\XO\logs\pkutaj\_posts> (dir *2019-11-12* | measure).count
1
```
### search registry
* By default, the Registry provider creates two registry drives. 
* To find all of the drives that are exposed by the Registry provider, use the `Get-PSDrive` (`gdr`) cmdlet. 

```
New-PSDrive -PSProvider registry -Root HKEY_CLASSES_ROOT -Name HKCR
```

* Additional registry drives are created by using the `New-PSDrive` cmdlet. 
* `dir hklm:\ -rec -ErrorAction SilentlyContinue | ? {$_.Name -like "*foo*}`

```
 dir hklm:\ -rec -ErrorAction SilentlyContinue | ? {$_.Name -like "*7-Zip*"}


    Hive: HKEY_LOCAL_MACHINE\SOFTWARE

Name                           Property
----                           --------
7-Zip                          Path64 : C:\Program Files\7-Zip\
                               Path   : C:\Program Files\7-Zip\
```

* [How to Get, Edit, Create and Delete Registry Keys with PowerShell](https://blog.netwrix.com/2018/09/11/how-to-get-edit-create-and-delete-registry-keys-with-powershell/)
* [Use the PowerShell Registry Provider to Simplify Registry Access | Scripting Blog](https://devblogs.microsoft.com/scripting/use-the-powershell-registry-provider-to-simplify-registry-access/)
## terminology
* measure-object
    * measure
 
## sources
* https://stackoverflow.com/a/14716609/11082684
