const maxWithIndex = (values: number[]): [number, number] => [Math.max(...values), values.indexOf(Math.max(...values))];

console.log(maxWithIndex([1, 5, 2, 10, 5, 11, 13]));

const [max, index] = maxWithIndex([1, 5, 2, 10, 5, 11, 13]);

console.log(max);
console.log(index);

// maxWithIndex = console.log
// Return changes
