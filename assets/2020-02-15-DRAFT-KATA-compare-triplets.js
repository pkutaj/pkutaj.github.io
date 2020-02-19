/* 
 * The concern of this script is to run a comparison between two arrays and produce a new array that returns the comparison score
 * The rule is that each winning comparison is one point in the final index with two items. 
 */

 /* INITS */
 const allScoresPersonA = [1,2,3];
 const allScoresPersonB = [1,2,3];
 const scoresLength = allScoresPersonA.length
 let i;
 let comparison = [];

 /* WORK */
 //fact: the length is the same, so you have a single-dimensional array with just one index running left-right
 //then you just need a proper incrementation logic to be set in place
 //you could possibly use for each loop to exercise a more semantical way of array-handling, but that is limited to a single array
 //you need a regular for loop
 //bonus: use ternary that's cool, multiple ternaries

 for(i=0; i<scoresLength; i++) { 
     allScoresPersonA[i] > allScoresPersonB
 }
// 2020-02-15 done at ##### 05:38:11 the nanosprint is over

