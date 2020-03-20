/* 
 * the aim of this script is to left rotate an array passed into a functino
 */

/**
 * 
 * @param {number[]} array - array to be rotated
 * @param {number} rotations - number of rotations
 */

function rotateArray(array, rotations) {
  let i = 0; 
  for (i; i<rotations; i++) {
    array.push(array[0]);
    array.shift(array[0]);
    console.log(array);
  }
  
}

rotateArray([1,2,3,4,5], 45)