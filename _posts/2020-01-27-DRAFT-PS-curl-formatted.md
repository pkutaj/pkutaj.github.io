---
layout: post
title: PS > Currency Converter Front-end
---
## the case	
the question is, how to format a returned JSON and work with that as a UI element for the currency conversion app. **the node back-end is not included, the point is only to illustrate the front-end minimalism of powershell**

![cur_conv]({{ site.url }}/assets/2020-01-27-currency-converter.gif)

* The back-end written for Node is on <https://github.com/pkutaj/curcon>

## toc
<!-- TOC -->



<!-- /TOC -->

## CODE

```powershell
<# 
 # The concern of this module is to provide a poweshell front-end with a simple text-based UI to 
 # return the lasets currency exchange rates as well as pass the required parameters into the node-based 
 # back-end
 #>

$intro = @"
  ____     
 / __ \  
/ /  \ \ Mr. Paul's
\ \__/ / Currency Converter
 \____/  
"@

function curCon {
    param(
        [Parameter(Mandatory = $true)]
        [string]
        $base_currency,
        [Parameter(Mandatory = $true)]
        [string]
        $transaction_currency,
        [Parameter(Mandatory = $true)]
        [string]
        $exchange_amount
        
    )
    $base_currency = $base_currency.toUpper();
    $transaction_currency = $transaction_currency.toUpper();
    if ($baseCurrency -eq "q") { exit }
    node ..\..\app $base_currency $transaction_currency $exchange_amount
    Pause
    Clear-Host
}


write-host $intro
Pause
Clear-Host

$latestRates = Invoke-WebRequest -method GET https://api.exchangeratesapi.io/latest;
$latestRatesParsed = $latestRates | ConvertFrom-Json;
$output = $latestRatesParsed.rates | Out-String

Write-Host $output -ForegroundColor Cyan 
while ($true) {
    curcon
}
```