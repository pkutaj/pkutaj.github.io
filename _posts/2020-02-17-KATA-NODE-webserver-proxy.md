---
layout: post
title: KATA > NODE > Webserver proxy
---
## the case	
the aim of this exercise is to build a node webserver with the home route fetching a daily foreign exchange rates
* not using the popular **request module**, just plain built-in node modules

* [2020-02-06-kata-js-node-promises.js]({{ site.url }}/assets/2020-02-06-kata-js-node-promises.js)

![screenshot_daily_rates]({{ site.url }}/assets/img000477.png)

## toc
<!-- TOC -->

- [CODE](#code)
- [sources](#sources)

<!-- /TOC -->

### CODE

```js
/* INITS */
const http = require("http");                       //1. httpModule
const https = require("https");

/* PROMISE */
function getRates() {
  return new Promise((resolve, reject) => {
    https.get("https://api.exchangeratesapi.io/latest?base=EUR", function (response) {
      let json = "";
      response.on("data", function (chunk) {
        json += chunk;
        console.log("dwarves brought chunks!")
      });
      response.on("end", function () {
        if (response.statusCode === 200) {
          try {
            var data = JSON.parse(json);
            resolve(data);
            console.log("dwarves are finished with their travels")
          } catch (e) {
            console.log('Error parsing JSON!');
          }
        } else {
          resolve('Status:', response.statusCode);
        }
      });
    }).on('error', function (err) {
      reject('Error:', err);
    });
  }
  )
}

/* REQUEST LISTENER */
function requestListener (req, response) {       //2. requestListener
  response.writeHead(200);
  const ratesPromise = getRates();
  ratesPromise.then( data => {
    const todayRates = data.rates
    for(currency in todayRates){
      response.write(currency + ": " + todayRates[currency] + "\n")
    }
    response.end();
  })
}

/* MAIN THREAD */
function main() {
const server = http.createServer(requestListener);  //3. serverCreation
server.listen(8080);                                //4. serverActivation
}

main();
```

### sources
* <https://stackoverflow.com/questions/11826384/calling-a-json-api-with-node-js/39612292#39612292>
* <https://nodejs.org/docs/latest-v10.x/api/https.html#https_https_get_options_callback>