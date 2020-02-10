/* INITS */
const http = require("http");                       //1. httpModule
const https = require("https");

/* PROMISE */
function getRates() {
  return new Promise((resolve, reject) => {
    https.get("https://api.exchangeratesapi.io/latest?base=EUR", function (res) {
      let json = "";
      res.on("data", function (chunk) {
        json += chunk;
        console.log("dwarves brought chunks!")
      });
      res.on("end", function () {
        if (res.statusCode === 200) {
          try {

            var data = JSON.parse(json);
            resolve(data);
            console.log("dwarves are finished with their travels")
          } catch (e) {
            console.log('Error parsing JSON!');
          }
        } else {
          resolve('Status:', res.statusCode);
        }
      });
    }).on('error', function (err) {
      reject('Error:', err);
    });
  }
  )
}

/* REQUEST LISTENER */
function requestListener (req, res) {       //2. requestListener
  res.writeHead(200);
  const ratesPromise = getRates();
  ratesPromise.then( data => {
    const todayRates = data.rates
    for(currency in todayRates){
      res.write(currency + ": " + todayRates[currency] + "\n")
    }
    res.end();
  })
}

/* MAIN THREAD */
function main() {
const server = http.createServer(requestListener);  //3. serverCreation
server.listen(8080);                                //4. serverActivation
}

main();