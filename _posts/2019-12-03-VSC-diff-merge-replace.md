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
* there is only [beyond compare](https://www.scootersoftware.com/) at the moment to do this kind of work more fluently
* I found a flow which is fastest for me, by first associating a keyboard shortcut `ctrl+shift+alt+c` to "Compare Active File With..." . 
    * To do so, press `Ctrl-k Ctrl-s` to show Keyboard Shortcuts
    * Type compare on the top search box 
    * Double click the "Keybinding" column for "Compare Active File With...", press `ctrl+shift+alt+c` then Enter to assign it.
* Open or focus **target-file** (will be editable in compare view by default)+
    * E.g. by drag-drop from File Explorer to VS Code's center
* Open or focus **source-file**.
* Press `ctrl+shift+alt+c`, a quick open menu **will be shown with target-file focused**.
* **Press Enter**.
* Result: **source-file on left and target-file on right**
* [Copy-Paste is the way to go at the moment](https://github.com/microsoft/vscode/issues/25887)

## sources
* [Copy/replace/add left <-> Äright in compare views · Issue #25887 · microsoft/vscode](https://github.com/microsoft/vscode/issues/25887)
* [https://stackoverflow.com/a/52300744](https://stackoverflow.com/a/52300744)
