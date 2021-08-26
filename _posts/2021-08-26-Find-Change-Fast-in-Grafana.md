## usecase
The aim of this tutorial🔍 is to identify if there is an increase weekly or monthly in grafana graph

Context: For deltas week-on-week, I had to export to excel and do this mathematically / statistically. This is a visual take

<!-- TOC -->

- [1. instructions](#1-instructions)

<!-- /TOC -->

### 1. instructions
* Edit panel -> Visualization
* Use lines not bars
* For Axes, switch _Y-Min_ to the value near the top instead of `0` 
* This zooms to the peaks of the values and by this you can easily identify the trend
* In the example below, I just enter `40 000 000` because I want to see how much traffic has exceeded that value in a time range

![]({{ site.url }}/assets/img003062.gif)
