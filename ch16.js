let plan = `
++@@++
!!!***
`

let mystery = plan.trim().split('\n').map(l => [...l]);
// console.log(mystery);

const f = l => [...l]
console.log(f('***'))