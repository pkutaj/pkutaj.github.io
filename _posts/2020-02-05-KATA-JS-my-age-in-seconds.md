---
layout: post
title: KATA > JS > Age in seconds
---
## the case	
the question (of my son) is, how old are you in seconds
the solution should look like this 

![age_in_seconds_and_seconds_to_population_ratio]({{ site.url }}/assets/2020-02-05-kata-ageInSeconds.gif)

## toc
<!-- TOC -->

- [STEP-1 get birthsecond](#step-1-get-birthsecond)
- [STEP-2 log now each second](#step-2-log-now-each-second)
- [STEP-3 delta](#step-3-delta)
- [STEP-4 display in browser](#step-4-display-in-browser)
- [STEP-5 compare age in seconds to world population](#step-5-compare-age-in-seconds-to-world-population)
- [STEP-6 make a simple, but reasonable-looking HTML](#step-6-make-a-simple-but-reasonable-looking-html)

<!-- /TOC -->

## findings
### STEP-1 get birthsecond

```js
/* DECLARES */
let birthSecond = new Date(2010, 10, 23, 4, 0, 0)

/* TEST-START */
//AIM: log birthSec
console.log(birthSecond)
//RESULT: PASS, month is from an array? 
/* TEST-END */
```

### STEP-2 log now each second
* use `setInterval()` asynchronous callback function and call it from `console.log`

```js
/* TEST-START */
//AIM: keep logging now every second
console.log(setInterval(function () {
  console.log(new Date().toString());
}, 1000))
//RESULT: PASS, IT HAS TO BE SET TO STRING
/* TEST-END */
```

### STEP-3 delta
* write a function to produce a different between the current second and the birth second
* use `SetInverval` to log this result every second

```js
let birthSecondAlex = new Date(2010, 10, 23, 4, 0, 0)

/* TEST-START */
//AIM: log birthSec
console.log(birthSecondAlex)
//RESULT: PASS, month is from an array? 
/* TEST-END */

//AIM: calculate ageInSeconds properly
/* TEST-START */
let ageInSeconds = function(birthSecond){
  return ((new Date() - birthSecond).toString().slice(0,9))
}
setInterval(function(){console.log(ageInSeconds(birthSecondAlex))}, 1000);
```

### STEP-4 display in browser
* create an `index.html` and plug bootstrap in, to make it at least responsive
* we need to return the string from setInterval function, would this be possible ? 

```html
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1,
      shrink-to-fit=no">
  <title>JS > KATA > Age In Seconds</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
</head>

<body>
  <div class="rough" data-splitting>
    <h1>My Age In Seconds</h1>
    <p id="ageInSeconds"></p>
    <script src="script.js"></script>
  </div>
</body>
</html>
```

### STEP-5 compare age in seconds to world population
* the questino is how many people would my son have to meet **every second of his 9-year old life** to meet everybody in the world

CODE                                       | COMMENT
-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------
`const worldPopulation = 7700000000`       | the constant world population as per Wikipedia
`function ageToPopulation(ageInSeconds)`   | you see this is a function delegate, as we're passing dynamically calculated age in second to get a different ratio each operation
`return worldPopulation / ageInSeconds;  ` | the value is just a single expression

```js
//STEP-5: COMPUTE AGE-POPULATION RATION
/* TEST-START */
const worldPopulation = 7700000000
function ageToPopulation(ageInSeconds) {
  return worldPopulation / ageInSeconds;  
}

setInterval( () => {document.getElementById("ageToPopulation").innerHTML = ageToPopulation((ageInSeconds(birthSecondAlex)))}, 1000);

/* TEST-END */
//RESULT: PASS
//------------```
```

### STEP-6 make a simple, but reasonable-looking HTML
* I am doing inline styling, this is javascript KATA anyways

```html
<!DOCTYPE html>
<html lang="cs">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1,
      shrink-to-fit=no">
  <title>JS > KATA > Age In Seconds</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  <!-- <link rel="stylesheet" href="style.css"> -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
</head>

<body>
  <h1>I am Alex. I was born on 23.11.2010. This is how many seconds I have been alive</h1>
  <ul>
    <li id="ageInSeconds" style="font-size: 200px;"></li>
  </ul>
  <h1>There is 7.7 billion (7700000000) people in the world. This is how many people-per-second I need to meet in order
    to meet you all</h1>
  <ul>
    <li id="ageToPopulation" style="font-size:  120px;"></li>
  </ul>
  <script src="script.js"></script>
</body>

</html>
```
