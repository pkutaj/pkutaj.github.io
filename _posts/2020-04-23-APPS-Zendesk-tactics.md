---
layout: post
title: applications > Zendesk tactics
categories: [applications]
---

## the case	of zendesk tactics
the question is, what tips and tricks and 3rd party tools can be used to work within zendesk properly

## toc
<!-- TOC -->

- [(1) csv + rbql (vscode)](#1-csv--rbql-vscode)
- [(2) search (chrome + quicktexpaste)](#2-search-chrome--quicktexpaste)
- [(3) shortcuts](#3-shortcuts)
- [(4) separate instance](#4-separate-instance)
- [(5) ticket id as a key throughout the system](#5-ticket-id-as-a-key-throughout-the-system)
- [(6) tags: 🠉🠊🠋](#6-tags-%F0%9F%A0%89%F0%9F%A0%8A%F0%9F%A0%8B)
- [(7) title: continuous improvement](#7-title-continuous-improvement)
- [(8) converse: inner-conversation priority](#8-converse-inner-conversation-priority)

<!-- /TOC -->

## findings
### (1) csv + rbql (vscode)
* export tickets as `.csv`
* import into VSCode
* query with the use of [RBQL - Rainbow Query Language](https://rbql.org/) extension

### (2) search (chrome + quicktexpaste)
* a preliminary help could be using [Chrome Extension That Allows Direct Link (and bookmarking) Searches in Zendesk Support](https://github.com/bhudgens/zendesk_search_bookmark_enabler)
* but dwares should run with a single order in all directions to check for results
    * guide
    * jira
    * zendesk tickets
    * stack overflow / public internet

### (3) shortcuts

AIM                  | BINDING      | COMMENT
---------------------|--------------|-------------------------------------------------
**PUBLIC/PRIVATE**   |              | note they are next to each other
toggle public        | `CTRL+ALT+C` |
toggle private       | `CTRL+ALT+X` |
**METADATA**         |              | note they are next to each other
toggle ticket fields | `CTRL+ALT+.` |
toggle user          | `CTRL+ALT+,` |
**SUBMITS**          |              |
submit as open       | `CTRL+ALT+O` |
submit as pending    | `CTRL+ALT+P` |
submit as on-hold    | `CTRL+ALT+D` |
submit as solved     | `CTRL+ALT+S` |
**SEARCH**           |              |
search               | `CTRL+ALT+F` | pass ticket id, open ticket directly
macro                | `CTRL+ALT+M` |
**OTHER**            |              |
close tab            | `CTRL+ALT+W` | close the ticket after submission
toggle apps          | `CTRL+ALT+A` | good to save space working 2 cols on screen mode

### (4) separate instance
* settings 🠊 more tools 🠊 create shortcut 🠊 separate window
* run as a self-standing instance

![separate_instance]({{ site.url }}/assets/img000785.png)

### (5) ticket id as a key throughout the system
- [x] [toggl](https://toggl.com/) to have the total time displayed with the ID displayed on top
- [x] dedicated filepath with ticket IDs folder name storing data and remote sessions
- [x] textfile (markdown) "branch" identified ith the ticket id (TDD inspired double entry) where all notes are aggregated and where the thinking happens

### (6) tags: 🠉🠊🠋
* traffic lights added to the ticket title
* use sparingly
* define what to work on with 🠉
* define KRs with 🠊

### (7) title: continuous improvement
* this is `h1` kind of thing
* should be clear what is meant and update continuously

### (8) converse: inner-conversation priority
* the conversations with colleagues have priority to conversation with customers
* higher frequency
* the cooperation is necessary
* there should be a symmetry in the roundtrip time
* the first working step is to check the mailbox
* the **EMPTY MAILBOX POLICY** is radical
    * see [Beyond the Inbox: Rules for Reducing Email - Study Hacks - Cal Newport](https://www.calnewport.com/blog/2020/04/14/beyond-the-inbox-rules-for-reducing-email/)
    * aggresive filtering
    * deleting notifications
    * moving to-dos into tasks

    