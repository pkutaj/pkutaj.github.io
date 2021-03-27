## usecase
The aim of this how-to-guide🏁 is to show redirection from a TLD into a GH repo.

![tld_to_gh]({{ site.url }}/assets/img002757.gif)


<!-- TOC -->

- [1. steps/?](#1-steps)

<!-- /TOC -->

### 1. steps/?
1. In S3, create an empty bucket `example.com` 
    - **NOTE:** it has be identical to the domain name you want to use
2. In _Properties_ -> _Static Website Hosting_  → set _Redirect all requests to_ → `github.com/example/example`
3. Test if it works just by clicking on the bucket endpoint
4. Open Route53 → Create Hosted Zone → enter `example.com` into _Domain Name_  → finalize registration
    - **RULE:** _Domain Name_ has to be **identical** to the _S3 bucket name_
5. Create an A record `example.com`
6. Enable _alias_, and set alias target to the `example.com` bucket

![set_up_A_record_route53]({{ site.url }}/assets/img002677.jpg)3
