---
layout: post
title: VSC > compare & merge
last_modified_at: 2019-12-03
---
## the case	
the question is, how to quickly compare two files in vscode and ideally, merge changes when needed

## toc
<!-- TOC -->

- [- diff, merge, replace](#--diff-merge-replace)

<!-- /TOC -->

## findings
### - diff, merge, replace 
* there is only beyond compare at the moment to do this kind of work more fluently
* I found a flow which is fastest for me, by first associating a keyboard shortcut `ctrl+shift+alt+c` to "Compare Active File With..." (#a). (Similar to wisbucky's answer but further improved and more step-wise.)
    *to do so, press Ctrl-k Ctrl-s to show Keyboard Shortcuts, type compare on the top search box, and double click the "Keybinding" column for "Compare Active File With...", press `ctrl+shift+alt+c` then Enter to assign it.
* Open or focus file B (will be editable in compare view by default). E.g. by drag-drop from File Explorer to VS Code's center.
* Open or focus file A.
* Press `ctrl+shift+alt+c`, a quick open menu will be shown with file B focused.
* Press Enter.
* Result: file A on left and file B on right. (Tested on VS Code 1.27.1)
* Copy-Paste is the way to go at the moment

## sources
* [Copy/replace/add left <-> Äright in compare views · Issue #25887 · microsoft/vscode](https://github.com/microsoft/vscode/issues/25887)
* [https://stackoverflow.com/a/52300744](https://stackoverflow.com/a/52300744)
