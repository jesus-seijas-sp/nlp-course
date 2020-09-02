function calculateOddPowersSum(arr) {
    const powers =  arr.filter(x => x % 2 === 1).map(x => x ** 2);
    return powers.reduce((prev, current) => prev + current, 0);
}

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(calculateOddPowersSum(numbers));
const numbers2 = [6, 1, 7, 3, 11, 99, 6, 7, 8, 9];
console.log(calculateOddPowersSum(numbers2));
const numbers3 = [6, 1, 77, 33, 11, 99, 6, 7, 8, 9];
console.log(calculateOddPowersSum(numbers3));

function dontKnow(name, age) {
    console.log(`Your name is ${name} and your age is ${age}`);
}

dontKnow('John', 30);
dontKnow('Alice', 25);

const fn = function (name, age) {
    console.log(`Your name is ${name} and your age is ${age}`);
}

fn('John', 30);
fn('Alice', 25);

const arrow = (name, age) => {
    console.log(`Your name is ${name} and your age is ${age}`);
}

arrow('John', 30);
arrow('Alice', 25);

