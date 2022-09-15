pyramid(5, "-");
pyramid(5);

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
    return numbers.shift() ?? 1 / multiply(numbers);
}
