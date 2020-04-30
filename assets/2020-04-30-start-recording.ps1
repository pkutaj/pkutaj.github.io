function Start-Recording {
    [CmdletBinding()]
    param (
        [string]$filePath
    )
    
    $argumentList = '-rtbufsize 150M -f dshow -framerate 30 -i video="screen-capture-recorder" -c:v libx264 -r 30 -preset ultrafast -tune zerolatency -crf 28 -pix_fmt yuvgit 420p -movflags +faststart -y "c:\Users\Admin\Downloads\output.mp4"'

        Start-Process c:\Users\Admin\Documents\ShareX\Tools\ffmpeg.exe -ArgumentList $argumentList
 <# this should dissapear #>
}

Start-Recording