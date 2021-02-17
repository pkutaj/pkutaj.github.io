function disableResiliency {
    param(
        [Parameter(Mandatory = $true)]
        [string]$AddinName,
        [Parameter(Mandatory = $false)]
        [switch]$Force,
        [Parameter(Mandatory = $false)]
        [switch]$AllowUserControl
    )

    $AddinList = $null
    $CrashingAddinList = $null
    $DoNotDisableAddinList = $null

    function Get-Key
    (
        [string]$ParentKey,
        [string]$KeyName) {
        for ($i = 0; $i -lt $KeyName.Split("\").Count; $i++) {
            try {
                $Key = Get-Item -Path ("{0}:\{1}" -f $ParentKey, ($KeyName.split("\")[0..$i] -join "\"))
            }
            catch {
                $Key = New-Item -Path ("{0}:\{1}" -f $ParentKey, ($KeyName.split("\")[0..$i] -join "\"))
            }
        }
        return $Key
    }

    $ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop
    $OutlookVersion = GetOutlookVersion

    if ($Force) {
        $checkPoint = $null
    }
    else {
        try {
            $CheckPoint = (Get-Item "HKCU:\Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency" | Get-ItemProperty)."CheckPoint" -eq 1
        }
        catch {
            $checkPoint = $false
        }
    }

    if (-not $checkPoint) {
        if ($AllowUserControl.IsPresent) {
            Get-Key -ParentKey HKCU -KeyName "Software\Policies\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\AddinList" | Set-ItemProperty -Name $AddinName -Value "2"
        }
        else {
            Get-Key -ParentKey HKCU -KeyName "Software\Policies\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\AddinList" | Set-ItemProperty -Name $AddinName -Value "1"
        }
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\DoNotDisableAddinList" | Set-ItemProperty -Name $AddinName -Value 1
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\DisabledItems" | Remove-Item
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\DisabledItems" | Out-Null
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\CrashingAddinList" | Remove-Item
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\CrashingAddinList" | Out-Null
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\NotificationReminderAddinData" | Set-ItemProperty -Name ([string]::Format("{0}\dtype", $AddinName)) -Value 2
        Get-Key -ParentKey HKCU -KeyName "Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency\NotificationReminderAddinData" | Set-ItemProperty -Name $AddinName -Value 2524611661
        Get-Item "HKCU:\Software\Microsoft\Office\$OutlookVersion.0\Outlook\Resiliency" | Set-ItemProperty -Name "CheckPoint" -Value 1
    }
}

function GetOutlookVersion {
    return (Get-ItemProperty HKLM:\SOFTWARE\Classes\Outlook.Application\CurVer)."(default)".Replace("Outlook.Application.", "")
}

function listOutlookAddins {
    $OutlookVersion = GetOutlookVersion
    $outlookAddinKeys = "HKCU:\SOFTWARE\Microsoft\Office\$OutlookVersion.0\Outlook\Addins"
    $numberedAddins = $outlookAddinKeys | % { Get-ChildItem -Path $_ | 
            % { Get-ItemProperty -Path $_.PSPath } | 
            Select-Object @{n = "Name"; e = { Split-Path $_.PSPath -leaf } } } | 
            Sort-Object -Unique -Property name
$numberedAddins | ForEach-Object -Begin { $index = 0 } -Process {
    Add-Member -InputObject $_ -MemberType NoteProperty -Name Number -Value (++$index)
}
$numberedAddins | Out-String | Write-Host
$selectedKey = Read-Host "Enter the Number of an Addin you would like to force-enable"
$AddinName = $numberedAddins.Name[$selectedKey - 1]
return $AddinName
}
function openToolFolder {
    Start-Process "$pivotalToolFolder" -WindowStyle Maximized
}

function getAddins {
    $pivotalToolFolder = "c:\pivotalTools\";
    Write-Host "The list of the detected Outlook Addins" -Foregroundcolor cyan
    $AddinName = listOutlookAddins;
    $usercontrol = Read-Host "Would you like to allow the user to disable the addin in Outlook? (y/n)"
    if($usercontrol -eq "y") {disableResiliency -AddinName $AddinName -AllowUserControl -Force;}
    if($usercontrol -eq "n") {disableResiliency -AddinName $AddinName -Force;}
    Write-Host "Run Outlook and see if the Addin loads properly" -Foregroundcolor cyan
    Pause
    openToolFolder;
}

getAddins