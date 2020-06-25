function longestPrefix(arr) {
if(arr.length === 0) return "";
let prefix = arr[0]
let i = 1; 
let arrLen = arr.length
for(i; i < arrLen; i++) {
while(arr[i].indexOf(prefix) != 0) {
    prefix = prefix.substring(0, prefix.length -1)
    if(prefix.length === 0) return ""
}
}
return prefix
}

module.exports = longestPrefix;