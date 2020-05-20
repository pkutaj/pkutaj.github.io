/* The concern is to swap ingers using to the array and back approach */
var reverse = function(x) {
if(x >= Math.pow(2,31) || x < Math.pow(-2,31)) return 0

let intToArr = Array.from(String(x), Number)
let i = 0;
let size = intToArr.length; 
let mid = Math.floor(size/2);
while (i<mid) {
        let lastIndex = intToArr.length - 1
        let helper = 0;
        if(intToArr[lastIndex] === 0) {
            intToArr.pop();
            continue;
        } else {
        helper = intToArr[i];
        intToArr[i] = intToArr[lastIndex]
        intToArr[lastIndex] = helper;
        }

    i++;
    lastIndex--;
}
return Number(intToArr.join(""));
};
module.exports = reverse