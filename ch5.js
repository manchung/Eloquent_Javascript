const flatten = function(arr) {
    return arr.reduce((a, b) => {
        if (typeof(b) == 'object') {
            return a.concat(flatten(b));
        } else {
            return a.concat(b)
        }
    }, [])
}

// console.log(flatten([1, [[2], [3, 4]], [5]]))

const my_for = function(val, test, update, body) {
    let result = undefined;
    while(test(val)) {
        result = body(val);
        val = update(val);
    }
    return result;
}

// let a = 1;
// my_for(a, s=>s<10, s=>s+1, s=>console.log(s))

const every = function(arr, pred) {
    return !arr.some(a => !pred(a));
}

ll = [-12, 4, 6, 8];
console.log(every(ll, s => s %2 == 0))
