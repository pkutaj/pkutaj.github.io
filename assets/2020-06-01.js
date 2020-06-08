/* restore data point */
const expandRoman = roman => {
    const abbr = [
        ["IV", "IIII"],
        ["XL", "XXXX"],
        ["IX", "VIIII"],
        ["XC", "LXXXX"],
        ["CD", "CCCC"],
        ["CM", "DCCCC"]
    ]
    let i = 0;
    let romanExpanded = roman;
    for (i; i < 6; i++) {
        romanExpanded = romanExpanded.replace(abbr[i][0], abbr[i][1])
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

module.exports = romanToInt;