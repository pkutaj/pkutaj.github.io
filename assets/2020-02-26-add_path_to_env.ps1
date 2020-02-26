Param (
    [Parameter (Mandatory = $true)]
    [ValidateScript ( { Test-Path $_ })]
    $NewPath
)
Begin {
    Clear-Host
} 
Process {
    Clear-Host
    $Reg = "Registry::HKLM\System\CurrentControlSet\Control\Session Manager\Environment"
    $OldPath = (Get-ItemProperty -Path "$Reg" -Name PATH).Path
    $EnvPath = $OldPath + ’;’ + $NewPath
    Set-ItemProperty -Path "$Reg" -Name PATH –Value $EnvPath -Confirm
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
    $updatedEnvPath = $env:path.Split(";")
    write-host @"
you should find the new path below
———————————————————————————————————
"@ -ForegroundColor green
    $updatedEnvPath | % { write-host $_ -ForegroundColor cyan }
} 
