const range = function(start, end, step=1) {
    let result = [];
    for (let i=start; i<=end; i+=step) {
        result.push(i);
    }
    return result;
}

const sum = function(list) {
    let result = 0;
    for (let element of list) {
        result += element;
    }
    return result;
}

const reverseArray = function(list) {
    let result = []
    for (let i = list.length-1; i >= 0; i--) {
        result.push(list[i])
    }
    return result;
}

const reverseArrayInPlace = function(list) {
    let n = list.length
    for (let i = n-2; i >= 0; i--) {
        list.push(list[i])
    }
    list.splice(0,n-1)
}

// console.log(range(1,10,2))
// console.log(sum(range(1,10)))
// console.log(reverseArray(range(1,10)))
// ll = range(1,10)
// reverseArrayInPlace(ll)
// console.log(ll)

const arrayToList = function(arr) {
    let list = null
    let curr = null
    for (let elem of arr) {
        new_list_elem = {
            value: elem,
            next: null
        };
        if (curr === null) {
            curr = new_list_elem;
        } else {
            curr.next = new_list_elem;
            curr = new_list_elem;
        } 
        if (list === null) {
            list = curr;
        }
    }
    return list;
}

const listToArray = function(list) {
    let arr = []
    for (let curr = list; curr !== null; curr = curr.next) {
        arr.push(curr.value);
    }
    return arr;
}

// ll = arrayToList(range(1,10))
// console.log(ll)
// arr = listToArray(ll);

const prepend = function(element, list) {
    let head = {
        value: element,
        next: list
    };
    return head;
}

// ll_new = prepend(0, ll)
// console.log(ll_new)

const nth = function(list, n) {
    for (let i=0; i<n; i++) {
        if (list == null) {
            return undefined;
        } else {
            list = list.next;
        }
    }
    return list.value;
}

// console.log(nth(ll, 0))

const deepEqual = function(o1, o2) {
    if (typeof(o1) !== typeof(o2)) {
        return false;
    } else if (o1 === null) {
        return o2 === null;
    } else if (typeof(o1) != 'object') {
        return o1 === o2;
    } else {
        let o1_keys = Object.keys(o1)
        let o2_keys = Object.keys(o2)
        for (let o1_key of o1_keys) {
            if (!o2_keys.includes(o1_key) || !deepEqual(o1[o1_key], o2[o1_key])) {
                return false;
            }
        }
        for (let o2_key of o2_keys) {
            if (!o1_keys.includes(o2_key) || !deepEqual(o1[o2_key], o2[o2_key])) {
                return false;
            }
        }
    }
    return true;
}

console.log(deepEqual(
    {b: [2, 2], c: {c: 1}}, 
    {b: [2, 2], c: {c: 1}}
))