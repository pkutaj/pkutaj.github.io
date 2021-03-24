## usecase
The aim of this how-to-guide🏁 is to use AWS as a hosting and DNS solution for a Jekyll website. It does not show how to set up a Jekyll site, only how to configure an S3 bucket and Route53 so that you can redirect a domain to it. The domain however will not be masked. 

<!-- TOC -->

- [1. steps/?](#1-steps)
- [2. upload jekyll](#2-upload-jekyll)
- [3. issue: SSL validation failed](#3-issue-ssl-validation-failed)
- [4. DNS](#4-dns)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. steps/?
* create a bucket 
* give it the same name as the domain
* uncheck _Block all public access_

![newBucket]({{ site.url }}/assets/img002481.jpg)

* open the bucket → select _Properties_ → Static Website Hosting
* select _Enable_ → select default values for Index document (index.html) and Error document (rror.html)

![enable_static_website_hosting]({{ site.url }}/assets/img002482.jpg)

* select _Permissions_  → Edit _Bucket Policy_ and pass the following (change the _resource_ as well as _version_)
    * this limits all access to read-only

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::kutaj-zavodska.com/*"
        }
    ]
}
```

* Note that the Version is not **your** version but the **AWS** version and thus it should not be changed!
* create an index.html with <h1>Hello World</h1> in it and upload to the bucket
* open http://kutaj-zavodska.com.s3-website.eu-central-1.amazonaws.com/ to verify

![kutaj-zavodska-hello-world]({{ site.url }}/assets/img002486.jpg)

* permissions have now been created
* permissions to modify the bucket via API does not yet
    * create an **IAM policy** and assign that to IAM user account
    * go to services → IAM → Policies → Create Policy
    * <https://console.aws.amazon.com/iam/home?region=eu-central-1#/policies=edit> in my region

    ![IAM_policies]({{ site.url }}/assets/img002493.jpg)
    
    * expand resources → specify bucket name
    * seems to be done

* create a **user** in IAM Management service
* this generates an access key and secret for programmatic access
    * username: kutaj-zavodska
    * in step 2 → select _Attach existing policies directly_ → _Filter policies_ → _Customer managed_ → Select the policy you created earlier
    
    ![attach_policies_to_a_user]({{ site.url }}/assets/img002504.jpg)

    * once done, receive the secret

    ![get_key_when_done]({{ site.url }}/assets/img002505.jpg)

### 2. upload jekyll
* credential-wise, create environmental variables on your local machines and store the next 3 values there

```
AWS_ACCESS_KEY = [access key id]
AWS_SECRET_ACCESS_KEY = [your secret access key]
AWS_DEFAULT_REGION = [your bucket region]
```

* s3 sync si the AWS CLI tool used for uploading the site to S3

```
aws s4 sync [origin] [target] [options]
aws s3 sync _site s3://kutaj-zavodska.com --no-verify-ssl
```

### 3. issue: SSL validation failed
* if attempting to upload without --no-verify-ssl you'll get

> aws s3 sync _site s3://kutaj-zavodska.com fatal error: SSL validation failed for https://s3.eu-central-1.amazonaws.com/kutaj-zavodska.com?list-type=2&prefix=&encoding-type=url [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1076)

* links to fix SSL 
    * <https://superuser.com/a/641396/1083809>
    * <https://stackoverflow.com/a/55117069/11082684>

### 4. DNS

1. In S3, create an empty bucket `foo.bar.com`
2. In _Properties_ -> _Static Website Hosting_  → set _Redirect all requests to_ `foo.bar.com/example`
3. Test if it works just by clicking on the bucket endpoint
4. Open Route53 → Create Hosted Zone → enter `foo.bar.com` (it has to be **identical** to the S3 bucket name) into _Domain Name_  → finalize registration
5. Create an A record `foo.bar.com`
6. Enable "alias", and set alias target to the `foo.bar.com` bucket

![set_up_A_record_route53]({{ site.url }}/assets/img002677.jpg)


### 5. sources
* <https://stackoverflow.com/a/24046986/11082684>
