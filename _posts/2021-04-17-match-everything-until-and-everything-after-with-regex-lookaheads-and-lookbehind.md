## usecase
The aim of this reference📚 is to provide a reference for PowerShell's regex lookarounds, i.e.:
1. lookahead
2. lookbehing


<!-- TOC -->

- [1. regex: lookaheads and lookbehinds](#1-regex-lookaheads-and-lookbehinds)
- [2. example: lookbehind with the lookup of a bucket from the HashiCorp Consul CV](#2-example-lookbehind-with-the-lookup-of-a-bucket-from-the-hashicorp-consul-cv)
- [3. example: use lookahead get the order number of the last downloaded playlist item to download only new items](#3-example-use-lookahead-get-the-order-number-of-the-last-downloaded-playlist-item-to-download-only-new-items)

<!-- /TOC -->

### 1. regex: lookaheads and lookbehinds
* concepts to define patterns that only match they they 
    * are / are not **followed** by a certain pattern → **lookahead** (positive / negative)
    * are / are not **preceded** by a certain pattern → **lookbehind** (positive / negative)

name       | pattern                                | example
-----------|----------------------------------------|-------------------------------------------------------------------------
lookahead  | `MATCH_PATTERN(?=LOOKAHEAD_PATTERN)`   | `[regex]::matches("39-JUNGLE - KEEP MOVING.mp3", "\d+(?=-)").value → 39`
lookbehind | `(?<=LOOKBEHIND_MATTERN)MATCH_PATTERN` | `[regex]::matches(‘mr paul’,’(?<=mr\s).*’).value → paul`

### 2. example: lookbehind with the lookup of a bucket from the HashiCorp Consul CV
* if I want to capture name that is after `mr` + an empty string (whitespace `\s`)
* i need to use lookbehind syntax

```
[regex]::matches(‘mr paul’,’(?<=mr\s).*’).value
→→→ paul
```

* I am getting the url of the s3 bucket that is preceded by `aws_setup_prod1/output/s3_bucket_kinesis_s3_enriched_id:` with Hashicorp Consul in this way (and copy to clipboard for efficiency)

```powershell
 "b" {
    $regex = "(?<=aws_setup_prod1/output/s3_bucket_kinesis_s3_enriched_id:).*"
    $returnedString = consul kv get -recurse customer/$consulName |
        Select-String -pattern $regex
        $streamingBucket = $returnedString.matches.value
        $streamingBucket | clip
        write-host $streamingBucket pasted to clipboard -foregroundcolor cyan
            
    }
```

### 3. example: use lookahead get the order number of the last downloaded playlist item to download only new items
* I am using this for making the wrapper around `youtube-dl` download last items of the youtube playlist just by passing `-newOnly` switch parameter

```powershell
function ytdl([string]$url, [string]$folder, [switch]$newOnly) {
    $musicFolder = "c:\Users\$env:USERNAME\Music\$folder"
    if ($newOnly) {
        $lastSong = (dir $musicFolder | sort Name -Descending | select -First 1).name
        $regex = "\d+(?=-)"
        [int]$lastSongId = (Select-String $regex -InputObject $lastSong).Matches.Value
        [string]$startFrom = $lastSongId + 1
        youtube-dl -o "$musicFolder\%(playlist_index)s-%(title)s.%(ext)s" --extract-audio --audio-format mp3 $url --playlist-start $startFrom
    }
    else { youtube-dl -o "$musicFolder\%(playlist_index)s-%(title)s.%(ext)s" --extract-audio --audio-format mp3 $url }
    }
```
