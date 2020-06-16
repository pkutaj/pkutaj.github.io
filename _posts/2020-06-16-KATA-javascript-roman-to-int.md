---
layout: post
title: KATA > javascript > roman to int
categories: [javascript]
---
### abstract
The concern is to document the kata from [Roman to Integer - LeetCode](https://leetcode.com/problems/roman-to-integer/) for converting roman numbers into integers.

## contents
<!-- TOC -->

- [abstract](#abstract)
- [instructions](#instructions)
- [CODE-1](#code-1)
- [CODE-2](#code-2)
- [sources](#sources)

<!-- /TOC -->


## findings
### instructions
* convert a roman numeral from the range 1-3999 into an integer

Symbol | Value
-------|------
I      | 1
V      | 5
X      | 10
L      | 50
C      | 100
D      | 500
M      | 1000

* edge cases: 6 scenarios where it is not add up from largest to smallest
    * `1. + 2.` I can be placed before V (5) and X (10) to make 4 and 9. 
    * `3. + 4.` X can be placed before L (50) and C (100) to make 40 and 90. 
    * `5. + 6.` C can be placed before D (500) and M (1000) to make 400 and 900.

* i.e. expand the abbreviated forms

ABBREVIATED | EXPANDED
------------|---------
IV          | IIII
IX          | VIIII
XL          | XXXX
XC          | LXXXX
CD          | CCCC
CM          | DCCCC

### CODE-1

```javascript
const expandRoman = roman => {
    const abbr = {
        "IV": "IIII",
        "XL": "XXXX",
        "IX": "VIIII",
        "XC": "LXXXX",
        "CD": "CCCC",
        "CM": "DCCCC"
    }
    let i = 0;
    let romanExpanded = roman;
    for (i; i < 6; i++) {
        romanExpanded = romanExpanded.replace(abbr[i][0], abbr[i][1])
    };
    return romanExpanded;
}

function romanToInt(roman) {
    let romanExpanded = expandRoman(roman);
    let table = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    }
    return Array.from(String(romanExpanded), romanExpanded => table[romanExpanded]).reduce((a, b) => a + b, 0);
}
```

### CODE-2
* note the transformation of array into an object (it is enough to be enumerable, it is not necessary to be iterable, not making sense intentionally)

```javascript
const expandRoman = roman => {
    const abbr = {
        "IV": "IIII",
        "XL": "XXXX",
        "IX": "VIIII",
        "XC": "LXXXX",
        "CD": "CCCC",
        "CM": "DCCCC"
    }
    let romanExpanded = roman;
    for (abbrForms in abbr) {
        romanExpanded = romanExpanded.replace(abbrForms, abbr[abbrForms])
    };
    return romanExpanded;
}

function romanToInt(roman) {
    let romanExpanded = expandRoman(roman);
    let conversionTable = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    }
    
    const intArr = Array.from(String(romanExpanded), romanExpanded => conversionTable[romanExpanded]);
    const sumIntArr = intArr.reduce((a,b) => a+b, 0)
    return sumIntArr

}
```

### sources
* [Array.prototype.map() - JavaScript ~ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
* [Array.from() - JavaScript ~ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)