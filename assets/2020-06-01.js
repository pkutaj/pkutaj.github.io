/* restore data point */
const expandRoman = roman => {
    const abbr = {
        "IV": "IIII",
        "XL": "XXXX",
        "IX": "VIIII",
        "XC": "LXXXX",
        "CD": "CCCC",
        "CM": "DCCCC"
    }
    let romanExpanded = roman;
    for (abbrForms in abbr) {
        romanExpanded = romanExpanded.replace(abbrForms, abbr[abbrForms])
    };
    return romanExpanded;
}

function romanToInt(roman) {
    let romanExpanded = expandRoman(roman);
    let conversionTable = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    }
    
    const intArr = Array.from(String(romanExpanded), romanExpanded => conversionTable[romanExpanded]);
    const sumIntArr = intArr.reduce((a,b) => a+b, 0)
    return sumIntArr

}
romanToInt("XLIV")
module.exports = romanToInt;