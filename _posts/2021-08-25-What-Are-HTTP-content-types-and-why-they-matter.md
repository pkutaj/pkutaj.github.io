## usecase
The aim of this explainer💡 is to define `content types` for HTTP protocol

<!-- TOC -->

- [1. instructions](#1-instructions)

<!-- /TOC -->

### 1. instructions
* when you enter URL you typically want to view/access a resource
* in order for a host to properly serve a resource + in order for a client to properly display a resource:
* we need a specification of a resource type: *.jpg image* should not be rendered as text
* for this reason, host responds with content types within the header of the HTTP message

```
<!-- SYNTAX -->
<primary_type>/<sub_type>
application/json
```

* this depends on MIME standards: _Multi-purpose Internet Mail Extensions_
* originally this standard was designed for for email, but HTTP uses the same labels
* content types are configured on web server such as IIS
* there is a mapping between a file extension and MIME type 
* after mapping, web server serves content type in a *content-type header*
* for browser, **this** is the first-place to look to understand what it is receiving (not! file extension)
* browsers will do MIME sniffing in some cases and will not necessarily follow the value of this header
* to prevent this behavior, the header X-Content-Type-Options can be set to `nosnif`
* if requests (such as POST or PUT) include content-type headers, the client tells the server what type of data is actually sent in its body
