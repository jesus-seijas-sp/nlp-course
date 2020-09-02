const person = {
    name: 'Alice',
    surname: 'Johnson',
    age: 25,
    phone: '+555555555',
}

const person2 = {
    name: 'John',
    surname: 'Smith',
    age: '40',
    manager: person,
}

console.log(person.manager);

const dict = {};

dict['John'] = 12;
dict['Alice'] = 13;
dict['Robert'] = 20;
dict['Eve'] = 25;

console.log(dict);

class Person {
    constructor(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    doubleAge() {
        return this.age * 2;
    }
}

const alice = new Person('Alice', 'Johnson', 25);
const john = new Person('John', 'Smith', 40);
console.log(alice.doubleAge());
console.log(john.doubleAge());