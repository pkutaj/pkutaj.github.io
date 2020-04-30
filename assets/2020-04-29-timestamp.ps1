function Get-TimeStamped-Filenames {
    [CmdletBinding()]
    param (
        [string]$description,
        [string]$extension
    )
    
    begin {
        $today = (get-date).Date.ToString("yyyy-MM-dd");
        $i = 0;
        $downloadFolder = "$env:USERPROFILE\downloads"       
    }
    
    process {
        $destinationPath = -join (
            $downloadFolder, 
            "\",
            $today,
            "-",
            $description,
            "_",
            0,
            ".",
            $extension
        )  
        if (Test-Path $destinationPath) {
    
            while (Test-Path $destinationPath) {
                $i++;
                $destinationPath = $destinationPath -replace "\d{1,2}\.$extension", "$i.$extension"
            }
        }
        
        return $destinationPath

    }   
}