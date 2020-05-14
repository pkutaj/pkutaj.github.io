var reverse = function(x) {
if(x >= Math.pow(2,31) || x < Math.pow(-2,31)) return 0
let intToString = x.toString();
let i = 0;
let size = intToString.length; 
let mid = Math.floor(size/2);
return mid;
};
module.exports = reverse