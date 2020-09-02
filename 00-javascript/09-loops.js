let i = 0;
while (i < 100) {
    // here
    console.log(i);
    i += 1;
}

for (let i = 0; i < 100; i += 5) {
    console.log(i);
}

// map
// filter
// reduce
// forEach

const arr = ['John','Alice', 'Robert', 'Eve'];
arr.forEach(name => console.log(name));