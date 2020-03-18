 Get-ChildItem *.evtx | ForEach-Object {
    $todayDate = Get-Date -UFormat "%Y-%m-%d-%H%M%S"
    $filePath = "$($todayDate)_event_extraction.csv"

 $Events = Get-WinEvent `
 -path "c:\Users\Admin\Documents\zoom\2115213 - 2020-03-12 - Intermittent System Errors 5.9\2020-03-16logs.evtx" 

 ForEach ($Event in $Events) {            
    # Convert the event to XML            
    $eventXML = [xml]$Event.ToXml()            
    Add-Member -InputObject $Event -MemberType NoteProperty -Force -Name  "detailed_error_message" -Value $eventXML.Event.EventData.Data            
    }            

$Events | Export-Csv $filePath            
$Events | Select-Object * | Out-GridView  
 }