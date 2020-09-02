const { NeuralNetwork } = require('brain.js');
const abalone = require('./data/abalone.json');

function sexToNumber(sex) {
  switch(sex) {
    case 'F': return 0;
    case 'M': return 1;
    default: return 0.5;
  }
}

function prepareData(data, ratio = 29) {
  return data.map(row => {
    const values = Object.values(row).slice(0, -1);
    values[0] = sexToNumber(values[0]);
    return { input: values, output: [row.rings / ratio] };
  });
}

const shuffle = (arr) => arr.sort(() => Math.random() - .5);
const split = (arr, trainRatio = .75) => {
  const l = Math.floor(arr.length * trainRatio);
  return { train: arr.slice(0, l), test: arr.slice(l) };
}

const prepared = split(shuffle(prepareData(abalone)));

const net = new NeuralNetwork();
net.train(prepared.train, {
  iterations: 500,
  logPeriod: 10,
  log: (str) => console.log(str),
});
let totalError = 0;
prepared.test.forEach(item => {
  const output = net.run(item.input);
  console.log(`Expected: ${item.output * 29} Predicted: ${output * 29}`);
  totalError += (output - item.output) ** 2;
});

console.log(totalError / prepared.test.length);