---
layout: post
title: javascript > kata > longest common prefix
categories: [javascript]
---
### 1. abstract
The concern is to document [(Longest Common Prefix - LeetCode Kata](https://leetcode.com/problems/longest-common-prefix/)

## contents
<!-- TOC -->

- [1. abstract](#1-abstract)
- [2. aim](#2-aim)
- [3. sidestep: match the algorith with combinations of pairs without repetiton](#3-sidestep-match-the-algorith-with-combinations-of-pairs-without-repetiton)
- [4. solutions](#4-solutions)
    - [4.1. horizontal scan](#41-horizontal-scan)
- [5. sources](#5-sources)

<!-- /TOC -->

### 2. aim
* find the longest common prefix in an array of strings

### 3. sidestep: match the algorith with combinations of pairs without repetiton
* (5/2) = 5!/5!(5-2)! = 120 / 12 = 10
* the algoritm for the simple combination without repetition is here, this needs polithing, but the total runs will be (n/k)

```javascript
function longestPrefix(arrSize) {
    let arr = new Array(arrSize);
    let arrLen = arr.length;
    let runs = 0;
    let i = 0;
    for (i; i < arrLen; i++) {
        let j = i + 1
        for (j; j < arrLen; j++) {
            runs++;
        }
    }
    return runs;
}
```
* the example for combination of pairs within the array of 3 items could be computed / visualized as follows

![visualizing_combinations]({{ site.url }}/assets/img001144.png)

### 4. solutions 
* forked from [(4) Longest Common Prefix - LeetCode Articles](https://leetcode.com/articles/longest-common-prefix/)


#### 4.1. horizontal scan
* the point of the following is to take the first item

STEP# | CODE                                                     | COMMENT
------|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------
1     | `if (strs.length == 0) return "";`                       | edge for empty arr
2     | `String prefix = strs[0];`                               | init the `prefix` binding to be identical with the first arr item
3     | `for (int i = 1; i < strs.length; i++)..`                | loop through arr starting from 2nd item
4     | `..while (strs[i].indexOf(prefix) != 0)`                 | in each loop, run another while loop
4     | `..`                                                     | ..`.indexOf()` returns the position of the substring — for `s = dog` 🠊 `s.indexOf("o") === 1`
4     | `..`                                                     | ..`.indexOf() === 0` means there is a match of the prefix with the string — for `s = dog` 🠊 `s.indexOf("do") === 0`
4     | `..`                                                     | ..here you are looping until **not matching**
5     | `....prefix = prefix.substring(0, prefix.length() - 1);` | .... `substring()` returns a substring with first- and (excluded!) last-index — for `s=dog` 🠊 `s.substring(0,1)` 🠊 `d`
5     | `....`                                                   | .... 🠊 `prefix` is decremented by one character
6     | `....if (prefix.isEmpty()) return "";`                   | is you reach an empty string in the decrementing, quit function with an empty string
7     | `return prefix;`                                         | return the decremented prefix if such was found

```java
 public String longestCommonPrefix(String[] strs) {
    if (strs.length == 0) return "";                    //1
    String prefix = strs[0];                            //2
    for (int i = 1; i < strs.length; i++)               //3
        while (strs[i].indexOf(prefix) != 0) {          //4
            prefix = prefix.substring(0, prefix.length() - 1);  //5
            if (prefix.isEmpty()) return "";            //6
        }        
    return prefix;                                      //7
}
```

### 5. sources
* [(4) Longest Common Prefix - LeetCode](https://leetcode.com/problems/longest-common-prefix/)