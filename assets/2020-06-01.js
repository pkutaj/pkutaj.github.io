function romanToInt(roman) {
let table = {
    "I" : 1, 
    "V": 5, 
    "X": 10,
    "L": 50, 
    "C": 100, 
    "D": 500,
    "M": 1000
}

return Array.from(String(roman), roman => table[roman]).reduce((a,b)=> a+b, 0)

}
module.exports = romanToInt;