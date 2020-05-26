function isPalindrome(x){
let arr = Array.from(String(x), Number)
let i = 0
let lastI = arr.length-1
return [arr[i], arr[lastI]];
}
module.exports.test = isPalindrome;