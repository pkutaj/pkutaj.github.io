<# TODO: BRANCH BASED ON THE POWERSHELL VERSION, use invoke-webrequest for non-posh-core #>

param(
    [Parameter(Mandatory = $true)][string]$domainName,
    [string]$apiKey = "JKS2XytCLNfkYg7i490AnSDo4QZ74lxn"
)
$domainIntro = @"

_|___|__                                                
___|___|     mrPaul's WHOIS in Terminal                   
_|___|__                                                
___|___|___|___|___|___|___|___|___|___|___|___|__                    
_|___|___|___|___|___|___|___|___|___|___|___|___|                    

"@

$domainInfo = curl "https://api.jsonwhois.io/whois/domain?key=$apiKey&domain=$domainName" | ConvertFrom-Json
Write-Host $domainIntro -ForegroundColor Cyan

Write-Host "1. THE BASICS" -ForegroundColor Cyan
$domainInfo.result | Select-Object name, created, changed, expires, dnssec, registered | Format-List

Write-Host "2. REGISTRAR" -ForegroundColor Cyan
$domainInfo.result.registrar | Format-List

Write-Host "3. NAMESERVERS" -ForegroundColor Cyan
$domainInfo.result.nameservers | Format-List
