/* the concern of this script is to enumerate matches of queries in inputs */

/* INITS */
const queries = ["ab", "abc", "bc"];
const strings= ["ab", "ab", "abc"];
const stringSize = strings.length;
const queriesSize = queries.length;
let i = 0;
let j = 0;
let results = new Array(queriesSize)

/* WORK */
for (i; i<queriesSize; i++) {
for (j; j<stringSize; j++) {
if(queries[i] === strings[j]) results[i]++;
}};

/* OUTPUT */
console.log(results);
