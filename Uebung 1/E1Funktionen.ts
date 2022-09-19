pyramid(5, "-");
pyramid(5);
console.log(power(5, 4));

const multiply = (...numbers: number[]) => numbers.reduce((a, b) => a * b);
let product = multiply;

console.log(product(5, 10, 5));
console.log(division(10, 10, 5));

function pyramid(height: number, symbol: string = "*") {
    for (let i = 0; i < height; i++) {
        console.log(" ".repeat(height - i)
            + symbol.repeat(2 * i + 1));
    }
}

function division(...numbers: number[]) {
    if (numbers.length > 2) {
        return numbers.shift() ?? 1 / multiply(...numbers);
    }
    return Math.min;
}

function power(base: number, exponent: number): number {
    if (exponent != 1) {
        return power(base, exponent - 1) * base;
    } else {
        return base;
    }
}
