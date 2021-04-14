## usecase
The concern is documenting the effective use of yt-downloader combined with powershell to download/convert a youtube playlist. Use **mp3** format. Download into `/music/<custom>` with a single command. 

<!-- TOC -->

- [1. prereq: ffmpeg.exe](#1-prereq-ffmpegexe)
- [2. playlist](#2-playlist)
- [3. single file](#3-single-file)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. prereq: ffmpeg.exe
* you need to have `ffmpeg.exe` downloaded to make this work properly
* refer to `ffmpeg.exe` in the environmental variables PATHS

![ffmpeg.exe_in_env_vars]({{ site.url }}/assets/img002814.jpg)

### 2. playlist
* run the following to so that the list in the folder matches the order of the playlist by adding playlist index to the filename

```
youtube-dl https://www.youtube.com/playlist?list=PLZTb_yEaj_CwaMfWGfGyVT-xtB1KL57rb --extract-audio --audio-format mp3 -o "c:\Users\Admin\Music\2021\%(playlist_index)s-%(title)s.%(ext)s"
```

* todo: proper routing of the output to have
    * essential mixes
    * yearly playlists

* or put into your powershell $profile

```powershell
function ytdl([string]$url, [string]$year) {
    youtube-dl -o "c:\Users\$env:USERNAME\Music\$year\%(playlist_index)s-%(title)s.%(ext)s" --extract-audio --audio-format mp3 $url
}
```

### 3. single file

```
 youtube-dl https://www.youtube.com/watch?v=JUxXkS22pc0 --extract-audio --audio-format mp3 -o "c:\Users\Admin\Music\2020\'%(title)s.%(ext)s"
```

### 4. sources
* [ytdl-org/youtube-dl: Command-line program to download videos from YouTube.com and other video sites](https://github.com/ytdl-org/youtube-dl)
