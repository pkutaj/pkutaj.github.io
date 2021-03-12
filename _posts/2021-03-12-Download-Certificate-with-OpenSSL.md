## usecase
The aim of this how-to-guide🏁 is to help downloading an TLS certificate with OpenSSL, which I need to attach to a ticket at times. 

<!-- TOC -->

- [1. steps/?](#1-steps)
- [2. on x509 -text](#2-on-x509--text)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. steps/?

* added a `download` switch for scenarios I need to dump this out into the download folder as well 

```powershell
function test-certificate($domain, $contextLength = 10, [switch]$download) {
    
    $cacertPath = "c:\cacert.pem"
    $connectDomain = $domain + ":443"
    #<feature> download certificate into a download folder
    if($download) {
        echo "q" | openssl s_client -servername $domain -connect $connectDomain -CAfile $cacertPath  | 
        openssl x509 -text | 
        out-file "C:\Users\$env:USERNAME\downloads\$domain.txt" -force
        Write-Host "~~~" -ForegroundColor darkcyan
        Write-Host "Cert Dumped to 'C:\Users\$env:USERNAME\downloads\$domain.txt'" -ForegroundColor darkcyan
        Write-Host "~~~" -ForegroundColor darkcyan
        Pause
    }
    echo "q" | openssl s_client -connect $connectDomain -CAfile $cacertPath  | openssl x509 -noout -enddate | sls "notAfter.*"
    echo "q" | openssl s_client -connect $connectDomain -CAfile $cacertPath  | sls "certificate chain" -Context $contextLength
    Write-Host "~~~" -ForegroundColor darkcyan
    Write-Host "→ If needed, pass a desired output length after domainname" -ForegroundColor darkcyan
    Write-Host "→ To update the list of trusted Certificates, run:" -ForegroundColor darkcyan
    Write-Host "→ Invoke-WebRequest https://curl.se/ca/cacert.pem -OutFile 'c:\cacert.pem'" -ForegroundColor darkcyan
    Write-Host "~~~" -ForegroundColor darkcyan
}
```

### 2. on x509 -text
* x509 is a standard defining the format of public key certificates originally from 1988, assuming a strict hierarchical system of certificate authorities (CAs) for issuing the certificates
* this differes from **web of trusts** like PGP where anyone (not just special CAs) may sign and thus attest to the validy of others key certificates

> The x509 command is a multi purpose certificate utility. It can be used to display certificate information, convert certificates to various forms, sign certificate requests like a "mini CA" or edit certificate trust settings.

— from [/docs/man1.0.2/man1/x509.html](https://www.openssl.org/docs/man1.0.2/man1/x509.html)

* the text switch 

> prints out the certificate in text form. Full details are output including the public key, signature algorithms, issuer and subject names, serial number any extensions present and any trust settings.

### 3. sources
* [kb/Fix-OpenSSL-error-unable-to-get-local-issuer-certificate.md at master · pkutaj/kb](https://github.com/pkutaj/kb/blob/master/ntw/2021-02-19-Fix-OpenSSL-error-unable-to-get-local-issuer-certificate.md)
* [linux - Using openssl to get the certificate from a server - Stack Overflow](https://stackoverflow.com/questions/7885785/using-openssl-to-get-the-certificate-from-a-server)
* [OpenSSL — /docs/man1.0.2/man1/x509.html](https://www.openssl.org/docs/man1.0.2/man1/x509.html)
* [X.509 - Wikipedia](https://en.wikipedia.org/wiki/X.509#History_and_usage)
