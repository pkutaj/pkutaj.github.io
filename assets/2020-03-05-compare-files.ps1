$x = (Get-FileHash 'C:\temp\sb1.reg').hash
$z = (Get-FileHash 'C:\temp\sb3.reg').hash
[bool]$w = $z.CompareTo($x)
if ($w) {
    Write-Host "Not the Same"
}
else { Write-Host "Same" }