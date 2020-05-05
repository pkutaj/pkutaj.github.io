function Start-Recording {
    [CmdletBinding()]
    param (
        [string]$filePath
    )
    . "c:\Users\Admin\tools\Get-TimestampedFilename.ps1"
    $filePath = Get-TimestampedFilename -description "screencast" -extension "mp4"
    echo $filePath;
    
    $argumentList = '-rtbufsize 150M -f dshow -framerate 30 -i video="screen-capture-recorder" -c:v libx264 -r 30 -preset ultrafast -tune zerolatency -crf 28 -pix_fmt yuv420p -movflags +faststart -y "{0}"' -f $filePath

        Start-Process c:\Users\Admin\Documents\ShareX\Tools\ffmpeg.exe -ArgumentList $argumentList
}

Start-Recording