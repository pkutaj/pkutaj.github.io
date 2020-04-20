---
layout: post
title: vscode > shortcuts cheat-sheet
categories: [vscode]
---

<!-- TOC -->

- [EDITING](#editing)
- [DELETION](#deletion)
- [SELECTION](#selection)
- [REGIONS](#regions)
- [COMMENTS](#comments)
- [LAYOUT](#layout)
- [PANEL](#panel)
- [TERMINAL](#terminal)
- [ZOOM](#zoom)
- [CODE](#code)

<!-- /TOC -->

### EDITING

COMMAND                                  | SHORTCUT                | COMMENTS
-----------------------------------------|-------------------------|---------------------------------------------
bracket select all                       | `ALT+A`                 | bracket select extension
copy line up or down                     | `ALT+SHIFT+UP`          |
"cursor - add above                      | `ALT+CTRL+SHIFT+UP    ` |
"cursor - add below                      | `ALT+CTRL+SHIFT+DOWN  ` |
go to the end of file                    | `CTRL+END             ` |
go-to symbol (go to heading in markdown) | `CTRL+SHIFT+O         ` |
go to the beginnign of file              | `CTRL+HOME            ` |
move line                                | `ALT+UP or DOWN       ` |
language change                          | `CTRL+K+M             ` |
open link (instead of ctrl+click)        | `CTRL+SHIFT+ALT+ENTER ` | open link command (`editor.action.openLink`)
overtype                                 | `CTRL+SHIFT+I         ` | overtype extension
transform lowercase                      | `CTRL+ALT+SHIFT+END   ` |
transform uppercase                      | `CTRL+ALT+SHIFT+HOME  ` |

### DELETION

COMMAND                                         | SHORTCUT                | COMMENTS
------------------------------------------------|-------------------------|---------
delete all  (carriage return w/delete)          | `CTRL+DELETE          ` |
delete line (return + delete line you start on) | `CTRL+SHIFT+DELETE    ` |
Delete Word Left/Rigth                          | `CTRL+DEL/BACKSPACE   ` |

### SELECTION

COMMAND               | SHORTCUT                | COMMENTS
----------------------|-------------------------|---------
expand selection      | `SHIFT+ALT+RIGHT`       |
select ALL occurences | `CTRL+SHIFT+L         ` |
select line           | `CTRL+L               ` |

### REGIONS

COMMAND         | SHORTCUT                | COMMENTS
----------------|-------------------------|---------
collapse ALL    | `CTRL+K CTRL+0        ` |
collapse region | `CTRL+SHIFT+] + [     ` |
uncollapse ALL  | `CTRL+K CTRL+J        ` |

### COMMENTS

COMMAND                 | SHORTCUT                | COMMENTS
------------------------|-------------------------|---------
comment / uncomment     | `ALT+SHIFT+A          ` |
Toggle Line Comment     | `SHIFT-ALT-A          ` |
javascript --> run task | `CTRL + SHIFT + B     ` |
remove tag              | `CTRL+SHIFT+K         ` |
select all in tag       | `CTRL+SHIFT+RIGHT     ` |

### LAYOUT

COMMAND                                   | SHORTCUT              | COMMENTS
------------------------------------------|-----------------------|-----------------------------------------------
activate sidebar and panel                | `CTRL + B + CTRL + J` |
increase col-size                         | `CTRL+ALT+SHIFT+.`    |
decrease col-size                         | `CTRL+ALT+SHIFT+,`    |
flip layout (from vertical to horizontal) | `SHIFT+ALT+0`         | combine with move to the next col to move down
focus to col0, 1, 2, 3                    | `CTRL+0+1+2+3`        | col0 being the file explorer sidebar
move to the next col                      | `CTRL+ALT+LEFT`       |
splitting the view ortogonally            | `CTRL-SHIFT-2`        |
toggle zen                                | `CTRL+K Z`            |
toggle centre mode                        | `CTRL+K + X`          |
toggle word wrap                          | `ALT+Z`               |
### PANEL

COMMAND       | SHORTCUT            | COMMENTS
--------------|---------------------|---------
open panel    | `CTRL+J`            |
problems      | `CTRL-SHIFT-M`      | problems
output        | `CTRL-SHIFT-U`      |
debug console | `CTRL-SHIFT-Y`      |
terminal      | `CTRL-ALT-backtick` |

### TERMINAL

COMMAND                       | SHORTCUT                | COMMENTS
------------------------------|-------------------------|---------
kill terminal                 | `CTRL+ALT+SHIFT+X     ` |
switch terminal windows       | `CTRL+ALT+SHIFT+S/D   ` |
terminal                      | `CTRL+ backtick       ` |
scroll up and down **1 line** | `CTRL+ALT+PAGEUP/DOWN`  |

### ZOOM

COMMAND    | SHORTCUT           | COMMENTS
-----------|--------------------|-----------------
zoom-in    | `CTRL+NUMPAD+`     | editor-font only
zoom-out   | `CTRL+NUMPAD-`     | editor-font-only
zoom-reset | `CTRL+SHIFT+ALT+0` | zoom reset

### CODE

COMMAND                      | SHORTCUT    | COMMENTS
-----------------------------|-------------|---------
gives you all the references | `SHIFT-F12` |