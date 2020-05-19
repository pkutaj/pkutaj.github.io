var reverse = function(x) {
if(x >= Math.pow(2,31) || x < Math.pow(-2,31)) return 0
let intToArr = Array.from(String(x), Number)
let i = 0;
let size = intToArr.length; 
let mid = Math.floor(size/2);
while (i<mid) {
        let lastIndex = intToArr.length - 1
        if(intToArr[lastIndex] === 0) {
            intToArr.pop();
            continue;
        } else {
            
        }

    i++
}
return intToArr;
};
module.exports = reverse