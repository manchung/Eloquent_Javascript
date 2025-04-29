for(let i=1; i<=7; i++) {
    let s = ''
    for(let j=0; j<i; j++) {
        s += '#'
    }
    console.log(s)
}

for(let i=1; i<=100; i++){
    if (i%15 == 0) {
        console.log(`${i}: FizzBuzz`)
    } else if (i%3 == 0) {
        console.log(`${i}: Fizz`) 
    } else if (i%5 == 0) {
        console.log(`${i}: Buzz`)
    } else {
        console.log(i)
    }
}

let size=20;
for (let i=0; i<size; i++) {
    let s = ''
    if (i%2 == 0) {
        // leads with ' ', then '#'
        for (let j=0; j<size; j++) {
            if (j%2 == 0) {
                s += ' '
            } else {
                s += '#'
            }
        }
    } else {
        // leads with '#', then ' '
        for (let j = 0; j<size; j++) {
            if (j % 2 == 0) {
                s += '#'
            } else {
                s += ' '
            }
        }
    }
    console.log(s)
}