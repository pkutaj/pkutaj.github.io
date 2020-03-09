$outro = @"

_|___|__                                                
___|___|     thankyou for keeping sandboxes clean                   
_|___|__                                                
___|___|___|___|___|___|___|___|___|___|___|___|__                    
_|___|___|___|___|___|___|___|___|___|___|___|___|                    

"@
gps | ? {$_.MainWindowTitle} | % {if($_.ProcessName -ne "powershell") {kill $_.Id}}
kill -n explorer
write-host $outro
pause
exit