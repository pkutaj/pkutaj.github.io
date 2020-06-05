---
layout: post
title: applications > Kibana within Elastic Stack (ELK)
categories: [applications]
---
## overview
The concern this document gives an intro to Kibana within the larger context of the Elastic Stack (ELK)

## toc
<!-- TOC -->

- [(1) elastic stack (ELK)](#1-elastic-stack-elk)
- [(2) logstash 🠊 elasticsearch 🠊 kibana](#2-logstash-%F0%9F%A0%8A-elasticsearch-%F0%9F%A0%8A-kibana)
- [(3) filter](#3-filter)
- [(4) fields](#4-fields)
- [(5) search](#5-search)
- [(6) visualize](#6-visualize)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) elastic stack (ELK)
* there is an attlasian stack (jira, confluence, bitbucket, opsgenie)
* there is also elastic stack, which is a combinatino of 
    * elasticsearch 🠊 search/analtics **ENGINE**
    * kibana 🠊 **UI**
    * beats
    * logstash

![ELK_stack]({{ site.url }}/assets/img000951.png)

![ELK_stack]({{ site.url }}/assets/img000964.png)

* elastic search for log analysis — logs are an essential, most important piece of data you can generate for the business

### (2) logstash 🠊 elasticsearch 🠊 kibana

![ELK_logstash_elasticSearch_Kibana]({{ site.url }}/assets/img000965.png)

### (3) filter  
* create a filter for querying only filtered data
* select fields to output only selected fields

### (4) fields
* Select particular fields you would like to be to have in the output instead of the generic/noisy _souce

### (5) search
* optionally, you can enter a string into a query box-like searching for a string within the page_title
* save filter and fields 

### (6) visualize
* go to _Visualize_ 🠊 _Create a visualization_🠊 Select _Visualization type_
    * For example _Vertical Bar_
* select Index or Saved Search
* select _Split Series_🠊 select _Term_ in the Aggregation dropdown 🠊 select a _Field_ that you want to report on
    * E.g. _Page Title_
* click on _Apply Changes_ arrow 

![setup_for_reporting_on_pageviews]({{ site.url }}/assets/img000977.png)

* go to _Metrics & Axes_ 🠊 select _Mode_ 🠊 click on _Normal_ if you don't want to have the stacked view

![setup_for_reporting_on_pageviews]({{ site.url }}/assets/img000976.png)

### sources
* [Kibana Tutorial @ YouTube](https://www.youtube.com/watch?v=gQ1c1uILyKI)