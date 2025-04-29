let a = new Promise((resolve, reject) => {
    resolve('a');
});

let b = new Promise((resolve, reject) => {
    resolve('b');
})

// let c = new Promise((resolve, reject) => {
//     reject('c');
// })

// let d = new Promise((resolve, reject) => {
//     reject('d');
// })


// let A = Promise.all([a, b, c]);
// A.then(console.log).catch(console.log);

const p1 = new Promise(res => setTimeout(() => res('one'), 8000));
const p2 = new Promise(res => setTimeout(() => res('two'), 5000));
const p3 = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Forced error after timeout'));
    }, 2000); // 1 second later
  });

const Promise_all = async function(list) {
    return new Promise(async (resolve, reject) => {
        list.map(p => p.catch(e => reject(e)));
        let good_list = [];
        for (let p of list) {
            try {
                const val = await p;
                good_list.push(val);
            } catch (e) {
                return reject(e)
            }
        }
        resolve(good_list);
    })
}

function Promise_all_2(list) {
    return new Promise((resolve, reject) => {
        let n = list.length;
        let new_list = Array(n);
        function dec_n() {
            n -= 1;
            if (n == 0) resolve(new_list);
        }
        list.map((p, i) => p.then(val => {
            new_list[i] = val;
            dec_n();
        }).catch((e) => reject(e)));
    })
}


function BB(msg) {
    console.log(`BB: ${msg}`)
}
function CC(msg) {
    console.log(`CC: ${msg}`)
}

// let B = Promise_all_2([a, b]);
// B.then(console.log).catch(console.log);

// // console.log([a, b]);
// let C = Promise_all([a, b]);
// C.then(CC).catch(CC)

// Promise.all([p1, p2, p3]).then(console.log).catch(BB)
// Promise_all([p1, p2, p3]).then(console.log).catch(BB)

async function f1() {
    console.log('f1 started');
    await Promise.all([p1, p2, p3]).then(console.log).catch(BB);
    console.log('f1 finished');
}

async function f2() {
    console.log('f2 started');
    await Promise_all_2([p1, p2, ]).then(console.log).catch(BB);
    console.log('f2 finished');
}

f1();
f2();