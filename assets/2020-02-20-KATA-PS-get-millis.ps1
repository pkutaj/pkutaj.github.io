<# 
 # the concern of this script is to return the time in format yyyy-mm-dd hh:mm:ss:fff when provided a unix timestamp
 #>
<# FUNCTION DEFINITINO #>

function getMillis {
    param (
        $unixTimeStamp
    )
    $epochStart = Get-Date 01.01.1970 
    $millisStamp = ($epochStart + ([System.TimeSpan]::frommilliseconds($unixTimeStamp))).ToLocalTime().ToString("HH:mm:ss.ffffff")
    $millisStamp | clip
    write-host $millisStamp +  copied to the clipboard -foreground cyan
    
}

<# CALL #>
getMillis 1582019437368