const vector = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(vector);
console.log(vector.length);
console.log(vector.slice(3, 7));

const another = [0, 'hello', undefined, null, true];
console.log(another[0]);
console.log(another[1]);
console.log(another[2]);
console.log(another[3]);
console.log(another[4]);

console.log(another[-1]);
console.log(another[5]);

const matrix = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
console.log(matrix.length);
console.log(matrix[0]);
console.log(matrix[1]);
console.log(matrix[2]);
console.log(matrix[1][2]);

const arr = [0, 1, 2, 3, 4];
arr.push(5);
console.log(arr);
arr.unshift(-1);
console.log(arr);
const value = arr.pop();
console.log(value);
console.log(arr);
const value2 = arr.shift();
console.log(value2);
console.log(arr);

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const filtered = numbers.filter(x => x % 2 === 1);
console.log(filtered);
const powers = filtered.map(x => x ** 2);
console.log(powers);
const sum = powers.reduce((prev, current) => prev + current, 0);
console.log(sum);

const numbers2 = [0, 1, 3, 6, 7, 8, 9,  2, 4, 5, 31, -2];
numbers2.sort((a, b) => a - b);
console.log(numbers2);