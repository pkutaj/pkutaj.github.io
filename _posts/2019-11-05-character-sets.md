---
layout: post
title: CS > ASCII, UTF-8, Unicode, character sets and CP850
---

## toc
<!-- TOC -->

- [ASCII and OEM](#ascii-and-oem)
- [ANSI standard & Codepages](#ansi-standard--codepages)
- [Unicode](#unicode)
    - [UTF-8](#utf-8)
- [strings and encodings](#strings-and-encodings)
- [example: get charset in console using git bash and dealing with German special characters and CP850 in VBA](#example-get-charset-in-console-using-git-bash-and-dealing-with-german-special-characters-and-cp850-in-vba)

<!-- /TOC -->

## findings
### ASCII and OEM
* ASCII maps characters to bits which are stored in memory

```
A ➔ 0100 001
```

* ASCII is 7-bit
* using a number 32-127 for basic characters, mostly in english languae
* most computers were using 8-bit ➔ 1 spare bit for a character (128-255)
* from there, several character sets were being developed intependently
    * IBM created the OEM character set

> In the 1960s the American Standards Association created a 7-bit encoding called the American Standard Code for Information Interchange (ASCII). In this encoding HELLO is 72, 69, 76, 76, 79 and would be transmitted digitally as 1001000 1000101 1001100 1001100 1001111. Using 7 bits gives 128 possible values from 0000000 to 1111111, so ASCII has enough room for all lower case and upper case Latin letters, along with each numerical digit, common punctuation marks, spaces, tabs and other control characters. In 1968, US President Lyndon Johnson made it official - all computers must use and understand ASCII.

— From [Unicode, UTF8 & Character Sets: The Ultimate Guide](https://www.smashingmagazine.com/2012/06/all-about-unicode-utf8-character-sets/)

### ANSI standard & Codepages
* later, ANSI standard arrived, codifiyng ASCII as the standard and agreeing that above from 128 it is handled by code pages (CPxxx)
* it was possible to have multiple codepages on in the OS
* it was **impossible** to properly render different languages simultaneously (Hebrew, German, Russian)

### Unicode
* Unicode is not just 16-bit code where each character takes 16 bits and there are 65,536 possible characters
* Unicode is different way of thinking about characters
* Unicode **does not** map characters to bits
* Unicode maps characters to **code point** which is a theoretical concept
    * Code point is a unique number with syntax **U+xxxx** 
    * Code point exists for every character in ever language
* Numbers are hexadecimal
    * Example: The Unicode code point H is usually written as `U+0048` rather than `72` (to convert from hexadecimal to decimal: 4*16+8=72).
* There is more than 65536 characters in unicode, currently arouna 110,000

```
Hello ➔ U+0048 U+0065 U+006C U+006C U+006F
```

#### UTF-8
* the new standard of encoding Unicode
* old is UTF-16 or UCS-2 (more complicated)
* another system for storing string of Unicode code points in memory using 8-bits
* every code point from 0-127 is stored in a single byte
* only code pointes 128 and above are stored using 2,3 or up to 6 bytes

### strings and encodings
* it does not make sense to have a string without knowing what encoding it uses
* plain text is not ASCII ➔ there is no plain text
* you need to know how the character is encoded and decode it properly then

### example: get charset in console using git bash and dealing with German special characters and CP850 in VBA
try using git
* set up git bash as a terminal in vsc
* navigate to the folder in question and run `file --mime-encoding` *
 
 ![2020-01-14-01.png]({{ site.url }}/assets/2020-01-14-01.png)
 
* but that file is unknown-8-bit (8-bit encoding, i.e. ASCII + 1bit) seems to be a choice, what what kind of charmap that is ? Not UTF-8 !
 
 ![2020-01-14-02.png]({{ site.url }}/assets/2020-01-14-02.png)
 
* The encoding is called CP850 and it correctly maps the the file with the german "sonderzeichen" 
 
 ![2020-01-14-03.png]({{ site.url }}/assets/2020-01-14-03.png)

 ![2020-01-14-04.png]({{ site.url }}/assets/2020-01-14-04.png)
 
* now we have all that we need in there --> but how to instruct VBA what you need to use Code Page 850 in order to parse my input ???
 
 ![2020-01-14-05.png]({{ site.url }}/assets/2020-01-14-05.png)
 
* how to do this with a script ? --> I made it into the phase when you are promted to open a file with a given extension, and also where you set the encoding (aka origin in excel) programmatically (xlMSDOS below)


```vb
Sub ImportUGL()
Dim vPath As Variant
Dim wb As Excel.Workbook
Dim ws As Excel.Worksheet
Set wb = Excel.ActiveWorkbook
Set ws = Excel.ActiveSheet
''//Show the file open dialog to allow user to select a UGL file
vPath = Application.GetOpenFilename("UGL (UGL) (*.ugl),*.ugl" _
, 1, "Select a file", , False)
''//Exit macro if no file selected
If vPath = False Then Exit Sub
''//crucial here is the Origin attribute that can programmatically set the character map
Workbooks.OpenText Filename:=vPath, Origin:=xlMSDOS, StartRow:=1 _
, DataType:=xlDelimited, TextQualifier:=xlDoubleQuote, Comma:=True _
, FieldInfo:=Array(Array(1, xlTextFormat), Array(2, xlTextFormat), _
Array(3, xlTextFormat))
```
* all Sonderzeichen show up properly (next step is parsing, but that is not done)
 
 ![2020-01-14-06.png]({{ site.url }}/assets/2020-01-14-06.png)
 
## sources
* [The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets (No Excuses!) – Joel on Software](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)
* [use git bash in vscode](https://stackoverflow.com/a/50527994/11082684)  
* [Unicode, UTF8 & Character Sets: The Ultimate Guide — Smashing Magazine](https://www.smashingmagazine.com/2012/06/all-about-unicode-utf8-character-sets/)
* [&what: Discover Unicode & HTML Character Entities](http://www.amp-what.com/)