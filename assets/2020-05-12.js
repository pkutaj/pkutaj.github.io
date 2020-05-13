var reverse = function(x) {
if(x >= Math.pow(2,31) || x < Math.pow(-2,31)) return 0
let intToString = x.toString();
return typeof intToString
};
module.exports = reverse;