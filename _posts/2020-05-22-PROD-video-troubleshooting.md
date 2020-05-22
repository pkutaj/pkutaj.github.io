---
layout: post
title: applications > optimize video-troubleshooting
categories: [applications]
---
## the case	of frozen scrolling 
the question is, how to make the scrolling, sometimes even between frames, as smooth as possible    

## toc
<!-- TOC -->

- [VLC](#vlc)
    - [enhance performance](#enhance-performance)
    - [enable millis](#enable-millis)
    - [extract only relevant parts](#extract-only-relevant-parts)
        - [start+end point](#startend-point)
- [ShareX: record my session](#sharex-record-my-session)
- [gitTuna: rules for gifs](#gittuna-rules-for-gifs)
- [screenToGif](#screentogif)
- [Script + ShareX + GDrive](#script--sharex--gdrive)
- [sources](#sources)

<!-- /TOC -->

## findings
### VLC
#### enhance performance
* [How to Stop HD Video from Freezing while Playing in VLC](https://www.vlchelp.com/stop-hd-video-from-freezing-vlc/)

#### enable millis
* combine with [Procmon_Tactics]({% post_url 2020-02-09-WIN-procmon-tactics %}) to map an operation to a millisecond if needed
* use [Time v3.2 addon](https://addons.videolan.org/p/1154032/) to display ms on the screen

#### extract only relevant parts


##### start+end point
* Press `CTRL+R` 🠊 opens media options.
* Select Add button on the right of the File selection box to load the video which you want to cut

![add_option]({{ site.url }}/assets/img000795.png)

* Tick show more options on the bottom left side of the dialog box to show extended options.
* In the extended options, enter the start time which you noted earlier. Notice that in the Edit options field, a :start-time=#### string will be added. 
* Click on **CONVERT/SAVE** on the bottom right side and follow all the steps to convert a video in VLC.
* In the following dialog box, click on browse to select the destination where your trimmed video will be saved.
* Click **START** to begin the cutting process.

![video_extraction_relevant_section]({{ site.url }}/assets/2020-04-23-extract-relevant-part-video.gif)

### ShareX: record my session
* have a dedicated global shortcut for the start of the session
* [ShareX - Screen capture, file sharing and productivity tool](https://getsharex.com/)

### gitTuna: rules for gifs
* [GifTuna - A desktop video to gif converter for Mac, Windows, and Linux](http://giftuna.io/)
* open source tool using ffmpeg to convert .mp4 to gif **FAST**
* combine with ShareX to embed `.gif` into webpages as images
* ideal < **15 SEC** (the limit for GIPHY upload, ideal is 6 seconds)
* shell gifs are fine with **12 FPS**

### screenToGif
* a more proper recorder with an integrated "video" editor" 

### Script + ShareX + GDrive
* with ShareX I tend to create short silent tutorials for the blog
* beforehand, I write a "screenplay" in the right side
* afterwards I crop the proper section with ShareX and execute
* if need be, trim with VLC
* upload to Gdrive

### sources
* [How to Cut Videos with VLC Media Player](https://www.tweakandtrick.com/2017/01/cut-videos-vlc.html)
* [Cut Videos with VLC Media Player](https://www.vlchelp.com/cut-trim-videos-with-vlc-media-player/)
* [GIF Creation Best Practices – GIPHY](https://support.giphy.com/hc/en-us/articles/360019914771-GIF-Creation-Best-Practices)
* [ShareX - Screen capture, file sharing and productivity tool](https://getsharex.com/)