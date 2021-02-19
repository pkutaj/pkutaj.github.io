## usecase
The aim of this how-to🏁 is fixing 

```
verify error:num=20:unable to get local issuer certificate
```

when running certificate chain verifications using OpenSSL with for example

```
▶ openssl s_client -connect google.com:443
CONNECTED(00000184)
depth=1 C = US, O = Google Trust Services, CN = GTS CA 1O1
verify error:num=20:unable to get local issuer certificate
```

<!-- TOC -->

- [1. steps](#1-steps)
- [2. script](#2-script)
- [3. footnotes](#3-footnotes)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. steps
1. download `cacert.pem` provided by [curl - Extract CA Certs from Mozilla](https://curl.se/docs/caextract.html)

```
Invoke-WebRequest https://curl.se/ca/cacert.pem -OutFile c:\cacert.pem
```

2. verify again by using `-CAfile` flag and the absolute path

```
▶ openssl s_client -connect google.com:443 -CAfile c:\cacert.pem

CONNECTED(00000184)
depth=2 OU = GlobalSign Root CA - R2, O = GlobalSign, CN = GlobalSign
verify return:1
depth=1 C = US, O = Google Trust Services, CN = GTS CA 1O1
verify return:1
depth=0 C = US, ST = California, L = Mountain View, O = Google LLC, CN = *.google.com
verify return:1
```

### 2. script
* I am using the following script to both verify the chain and print the expiry date

```powershell
function test-certificate($domain, $contextLength = 10) {
    
    $cacertPath = "c:\cacert.pem"
    $domain += ":443"
    echo "q" | openssl s_client -connect $domain -CAfile $cacertPath  | openssl x509 -noout -enddate | sls "notAfter.*"
    echo "q" | openssl s_client -connect $domain -CAfile $cacertPath  | sls "certificate chain" -Context $contextLength
    Write-Host "~~~" -ForegroundColor darkcyan
    Write-Host "→ If needed, pass a desired output length after domainname" -ForegroundColor darkcyan
    Write-Host "→ To update the list of trusted Certificates, run:" -ForegroundColor darkcyan
    Write-Host "→ Invoke-WebRequest https://curl.se/ca/cacert.pem -OutFile 'c:\cacert.pem'" -ForegroundColor darkcyan
    Write-Host "~~~" -ForegroundColor darkcyan
}
```

![demo]({{ site.url }}/assets/img002620.gif)

### 3. footnotes
* OpenSSL cannot validate the chain because it comes **without a list of Trusted Root Certificate Authorities**
* You need to install the **CA** as trusted
* You can do it 
    - one-by-one by downloading a particular cert (with the help of a browser) 
    - in bulk by downloading for example `cacert.pem` package from [curl - Extract CA Certs from Mozilla](https://curl.se/docs/caextract.html)
* There are 2 parameters for the commands
    - `CAfile` → pointing to a single cert trusted as a Root CA
    - `CApath` → pointing to a folder with certs used as trusted Root CA
* In-Depth discussion in the accepted answer of [truststore - How to list certificates, trusted by OpenSSL? - Stack Overflow](https://stackoverflow.com/questions/25156180/how-to-list-certificates-trusted-by-openssl)

### 4. sources
*  [curl - Extract CA Certs from Mozilla](https://curl.se/docs/caextract.html)
* [truststore - How to list certificates, trusted by OpenSSL? - Stack Overflow](https://stackoverflow.com/questions/25156180/how-to-list-certificates-trusted-by-openssl)
