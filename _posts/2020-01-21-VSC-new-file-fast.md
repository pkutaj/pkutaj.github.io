---
layout: post
title: Visual Studio Code > Extract selection into a newfile
---
## the case	
the question is, how to spin off a new file from the selection of text

## findings
* select **the title** only
* create a hyperlink (I have a shorcut `ctrl-shift-alt-k`)
* open the hyperlink with `ctrl+click` (I have a shortcut is `ctrl-shift-alt-enter`)
* you'll get an error message that the file does not exist — but also a **prompt to create the file**
* choose to create the file
* close the new window
* open the hyperlink again
* the new file opens in a new column ➔ easy to extract via copy&paste the selection now

![vsc-text-extraction]({{ site.url }}/assets/2020-01-21-text-extraction.gif)