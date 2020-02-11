<# 
 # the concern of this script is to return the time in format yyyy-mm-dd hh:mm:ss:fff when provided a unix timestamp
 #>
<# FUNCTION DEFINITINO #>

function getMillis {
    param (
        $unixTimeStamp
    )
    $epochStart = Get-Date 01.01.1970;
    $millisStamp = $epochStart + ([System.TimeSpan]::frommilliseconds($unixTimeStamp))
    
}

<# CALL #>
getMillis 1581337071630