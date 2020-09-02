const number = 2;

const name = 'David';

if (number < 5) {
    if (number % 2 === 1) {
        console.log('Is less than 5 and its odd');
    } else {
        console.log('Is less than 5 and its pair');
    }
} else {
    console.log('Is greater than or equal 5');
}

if (name === 'Alice') {
    console.log('Hello Alice, you\'re allowed');
} else if (name === 'David') {
    console.log('Hello David, talk with the administrator');
} else if (name === 'Robert') {
    console.log('Hello Robert, access denied');
} else {
    console.log(`I don\'t know who you are ${name}`);
}

switch (name) {
    case 'Alice':
    case 'Robert':
        console.log(`Hello ${name}, you\'re allowed`);
        break;
    case 'David':
    case 'Eve':
        console.log(`Hello ${name}, talk with the administrator`);
        break;
    default: 
        console.log(`I don\'t know who you are ${name}`);
}

console.log(number < 3 ? 'is lower than 3' : 'is greater or equal 3');