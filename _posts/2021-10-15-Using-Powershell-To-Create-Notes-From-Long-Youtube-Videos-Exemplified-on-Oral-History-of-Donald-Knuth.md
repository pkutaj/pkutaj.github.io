## usecase
The aim of this page📝 is to show how to highlight interesting parts of long youtube videos. 
I am using this for listening [Oral Histories of Computer History Museum](https://www.youtube.com/watch?v=a5Rm-wwLTI4&list=PLQsxaNhYv8daKdGi7s85ubzbWdTB36-_q).

This is how I open a [video at 28 min 51 second](https://youtu.be/Wp7GAKLSGnI?t=1731) - based on timestamp from the transcript provided by Youtube.  

![open_youtube_in_minute_second]({{ site.url }}/assets/2021-10-30-389.gif)

<!-- TOC -->

- [Steps](#steps)

<!-- /TOC -->

### Steps
* open long youtube video of oral history
* click `...` → _Open Transcript_  and copy the whole transcript into separate `.txt` file
* for programmatic retrieval of the transcript see something like [youtube-transcript-api · PyPI](https://pypi.org/project/youtube-transcript-api/)

```
28:51
mathematics now I have a feeling that a
28:57
lot of the brightest students don't go
29:01
into mathematics because they
29:07
a curious thing that that they they
29:13
don't need algebra at the level I did I
```

* find and replace the above with the following regex
* find `(\d{1,}:\d{1,})\n`
* replace `$1 `
* this brings

```
28:51 mathematics now I have a feeling that a
28:57 lot of the brightest students don't go
29:01 into mathematics because they
29:07 a curious thing that that they they
29:13 don't need algebra at the level I did I
```

* during listening make note an interesting timestamp
* map it to the transcript - which is in minutes
* to create a link, you need to convert that to seconds and use youtube's own naming convention for starting video from a given place
* for this use a following powershell function that I have in `$profile`

```powershell
function yt ($url, $min, $sec) {
    $second_stamp = (New-TimeSpan -Minutes $min -Seconds $sec).TotalSeconds
    $yt_url = $url + "?t=" + $second_stamp
    $yt_url | Set-Clipboard
    Start-Process Chrome $yt_url
    Write-Host $yt_url clipped
}
```

* it copies the URL to the clipboard and opens the video in a given moment


