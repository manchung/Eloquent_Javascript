const isEven = function(n) {
    if (n < 0) {
        return isEven(-n);
    } else if (n == 0) {
        return true;
    } else if (n == 1) {
        return false;
    } else {
        return isEven(n-2);
    }
}

// console.log(isEven(50))
// console.log(isEven(-75))

const countChar = function(s, c) {
    count = 0;
    for (let i=0; i<s.length; i++) {
        if (s[i] == c) count++;
    }
    return count;
}

console.log(countChar('happppy', 'p'))