---
layout: post
title: KATA > JavaScript > 2D-Array
---
## the case	
* the question is, what given a 6 x 6 2D array `arr` to write the function that prints the  hourglass-shapes

```
1 1 1 0 0 0
0 1 0 0 0 0
1 1 1 0 0 0
0 0 2 4 4 0
0 0 0 2 0 0
0 0 1 2 4 0
```

* ... you define an hourglass in `A` to be a subset of values with indices falling in this pattern in `arr` graphical representation

```
a b c
  d 
e f g
```

## findings
### 05:25:55 bs
* this is a combinatio of an iteration, nested, and conditioning
* the aim is to get a single hourglass and then stop at the last array at the last glass

### try to print just the hourglass

```js
let arr = [
    [1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [0, 0, 2, 4, 4, 0],
    [0, 0, 0, 2, 0, 0],
    [0, 0, 1, 2, 4, 0]
]
let i;
let j;
function hourGlasssum(arr) {
for(i=0; i < arr.length - 2; i++){
    for(j=0; j < arr.length - 2; j++) {
        let glass =`
            ${arr[i][j]} ${arr[i][j+1]} ${arr[i][j+2]}
              ${arr[i+1][j+1]} 
            ${arr[i+2][j]} ${arr[i+2][j+1]} ${arr[i+2][j+2]}
            `
        console.log(glass);
    }
}
```

### sources
* [source_file]({{ site.url }}/assets/2019-11-18-KATA-2D-array.js)