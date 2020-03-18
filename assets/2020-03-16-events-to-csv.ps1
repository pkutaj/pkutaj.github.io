$i = 0;
Get-ChildItem *.evtx | ForEach-Object {
   $i++;
   $todayDate = Get-Date -UFormat "%Y-%m-%d-%H%M%S"
   $filePath = $_.BaseName + "-$todayDate-$i.csv"
   Write-Host "Creating $filePath..."

   try {   
   $Events = Get-WinEvent -path $_.FullName;

   ForEach ($Event in $Events) {            
   write-host "Creating $filepath"
   $eventXML = [xml]$Event.ToXml()            
   Add-Member -InputObject $Event -MemberType NoteProperty -Force -Name  "detailed_error_message" -Value $eventXML.Event.EventData.Data            
}            
   $Events | Export-Csv .\$filePath               
}
catch {
   write-host "something went wrong"
}

}