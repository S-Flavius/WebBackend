pyramid(5, "-");
pyramid(5);
console.log(power(5, 2));

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
    throw 'At least 2 parameters should be supplied';
}

function power(base: number, exponent: number): number {
    return exponent == 0 ? 1
        : exponent < 0 ? 1 / power(base, -exponent)
            : power(base, exponent - 1) * base;
}

const potentiate = (base: number, exponent: number) => base ** exponent;
const boredom = (...ignored: any[]) => "Boredom";
console.log(typeof boredom);

// Optional Parameters
// No 2nd function with the same name


const arbitraryArguments = (array: number[],
    callback: (a: number, b: number) =>
        number) => {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        result = callback(result, array[i]);
    }
    return result;
};
