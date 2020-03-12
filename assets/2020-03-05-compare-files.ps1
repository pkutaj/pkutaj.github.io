# Parameter help description
[Parameter(Mandatory = $true)]$file1,
[Parameter(Mandatory = $true)]$file1,

$file1hash = (Get-FileHash $file1).hash
$file2hash = (Get-FileHash $file2).hash
[bool]$different = $file2hash.CompareTo($file1hash)
if ($different) {
    Write-Host "Not the Same"
}
else { Write-Host "Same" }`