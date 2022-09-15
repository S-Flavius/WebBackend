//2.1
let a = 5;
console.log(typeof a);
a = "hallo"; // This works in JS but not TS
console.log(typeof a);

if (5 == 5) {
    console.log("hi");
} else {
    console.log("not hi");
}

//This works in JS but not TS
if (5 == "5") {
    console.log("hi");
} else {
    console.log("not hi");
}

// 2.2

let b = null;

b = 5; // Works

console.log(typeof b);

b = null; // Works too

if (b == undefined) { // True
    console.log("undefined");
} else {
    console.log("defined");
}

if (b === undefined) { // False
    console.log("undefined");
} else {
    console.log("defined");
}
