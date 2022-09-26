let iterations = 50000000;
// let size = 50000;

// console.time('init map');
// for (let i = 0; i < iterations; i++) {
//     let a = [...Array(size)].map((_, i) => i);
// }
// console.timeEnd('init map');

// console.time('init dynamic');
// for (let i = 0; i < iterations; i++) {
//     let a = [];
//     for (let j = 0; j < size; j++) {
//         a[i] = i;
//     }
// }
// console.timeEnd('init dynamic');

// console.time('init static');
// for (let i = 0; i < iterations; i++) {
//     let a = Array(size);
//     for (let j = 0; j < size; j++) {
//         a[i] = i;
//     }
// }
// console.timeEnd('init static');

// let a1 = [...Array(size)].map((_, i) => i);
// let a2 = [...Array(size)].map((_, i) => i);

// console.time('concat');
// for (var i = 0; i < iterations; i++) {
//     var a3 = a1.concat(a2);
// };
// console.timeEnd('concat');

// console.time('concat naive dynamic');
// for (var i = 0; i < iterations; i++) {
//     let a3 = Array();
//     for (let j = 0; j < a1.length; j++) {
//         a3[j] = a1[j];
//     }
//     for (let j = 0; j < a2.length; j++) {
//         a3[size + j] = a2[j];
//     }
// };
// console.timeEnd('concat naive dynamic');

// console.time('concat naive static');
// for (var i = 0; i < iterations; i++) {
//     let a3 = Array(2 * size);
//     for (let j = 0; j < a1.length; j++) {
//         a3[j] = a1[j];
//     }
//     for (let j = 0; j < a2.length; j++) {
//         a3[size + j] = a2[j];
//     }
// };
// console.timeEnd('concat naive static');


console.time('math.pow');
for (var i = 0; i < iterations; i++) {
    let a = Math.pow(i, 10);
};
console.timeEnd('math.pow');

console.time('dynamic **');
for (var i = 0; i < iterations; i++) {
    let a = i ** 15;
};
console.timeEnd('dynamic **');

console.time('static **');
for (var i = 0; i < iterations; i++) {
    let a = 15 ** 15;
};
console.timeEnd('static **');

console.time('pow manual');
for (var i = 0; i < iterations; i++) {
    let res = i;

    for (let j = 0; j < 10; j++) {
        res *= 10;
    }

    let a = res;
};
console.timeEnd('pow manual');
