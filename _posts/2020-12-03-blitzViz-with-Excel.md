---
layout: post
title:
categories: []
---
## usecase
The concern is documenting what I would never say I'd document - blitz visualizations with Excel. 
Sometimes, I just need a picture/chart/data-crunch, for example vizualizing the durations of ETL jobs across a month to see a tendency, breaking it down with averages of calendar weeks. All of my data are in Redash

I just need to ETVO

* extract
* transform
* visualize
* operate

<!-- TOC -->

- [1. extract](#1-extract)
- [2. transform (example)](#2-transform-example)
- [3. visualize](#3-visualize)
- [4. operate](#4-operate)

<!-- /TOC -->

### 1. extract
* export in excel-format or in `.csv`, who cares

![extracted]({{ site.url }}/assets/img002329.png)

### 2. transform (example)
* open in excel
* if needed, filter (ALT+A+T)
* select and copy only visible cells (CTRL+G → select visible cells only → copy)
* create a new sheet and paste there
* extract date into a new column
* use a `=WEEKNUM()` to get week number
* run a subtotal with the average of job duration per week (ALT+A+B → subtot on week change → run average on job duration)

![transformed]({{ site.url }}/assets/img002328.png)

### 3. visualize
* ideally in excel as well, the ideal place for the art of throw-away-chart

![visualized]({{ site.url }}/assets/img002330.png)


### 4. operate
* depends on what need to be done. 
* contact the client or close as non-actionable insight
* this is done in ~5 minutes, with legacy excel skills
* maybe I just used to work with Excel and lack proper SQL competence, but the spreadsheet paradigm with the record manipulation instead of query-writing is a dirty magic I dig immensly
* here, GUI makes sense
