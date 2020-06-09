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
    let table = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    }

    return Array.from(String(romanExpanded), romanExpanded => table[romanExpanded]).reduce((a, b) => a + b, 0);

}
romanToInt("XLIV")
module.exports = romanToInt;