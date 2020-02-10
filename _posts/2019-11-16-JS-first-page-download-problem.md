---
layout: post
title:
---
## the case	
the question is, what is the major problem of single page applications and the way of overcoming this

## toc
<!-- TOC -->

- [SPAs: Single-Page-Apps](#spas-single-page-apps)
- [First-page-visit analysis](#first-page-visit-analysis)
- [The fix](#the-fix)
- [sources](#sources)

<!-- /TOC -->

## findings
### SPAs: Single-Page-Apps
* instead of navigating from one page to another, the user remains on a single webpage that is dynamically rewritten as you use it
* use react, angular, vue and others
* the problem is the first-page-download-problem

![example_ext_js_pivotal_ux_client]({{ site.url }}/assets/2020-02-08-first-download-problem.gif)

* SPAs give a great impression after the first download, but the initial load can be problematic
* there is a lot of back-and-forth
* ideally one request-one response and the page renders  

### First-page-visit analysis
1. Browser issues a GET request to the server
2. Stripped down HTML is returned that likely has just a single `<div>` and some javascript includes
    * the user has not seen anything
3. The browser issues more requests for the JavaScript files
4. Once downloaded, the JavaScript executes locally, the user is still **waiting**
    * JavaScript is doing all the appropriate DOM updates to generate HTML on the page
5. Assuming there is still no data to be displayed on the page, we still need to go get that
    * JavaScript makes REST GET calls and waits again for those to be completed
6. Once the REST calls GETS the `JSON` data, the JavaScript can compete
    * DOM is updated with the REST data retrieved and the **page is rendered**

> this is a lot of back and forth requests and responses before anything is being rendered and the internet is just not good at this. One request - One response - That's what the internet is great at. 

![first_page_download_on_npr_illustration]({{ site.url }}/assets/2020-02-10-01.gif)

### The fix
* figure out all of the HTML for the first load on the server
* download it
* sounds easy, but it can get complicated
    * not all JS will run on a server
    * event lifecycle is different on a server
    * asyng call completion is an issue before rendering on a server
* fix: use specified framework such as `next.js`

### sources
* <https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38>