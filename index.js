const { Corpora } = require('evaluate-nlp');
const { NeuralNetwork } = require('brain.js');
const { PorterStemmer } = require('natural');

async function calculate(engine) {
  const corpora = new Corpora();
  const result = await corpora.compareSigdial22(engine);
  sigdial = corpora.sigdial22toTable(result);
  console.log(result);
};

const tokenize = text => text.toLowerCase().split(/\W+/).filter(x => x !== '');

const stem = arr => arr.map(x => PorterStemmer.stem(x));

const featuresToDict = arr => arr.reduce((prev, current) => {
  prev[current] = 1;
  return prev;
}, {});

const synonyms = {
  remove: "delete",
  junk: "spam",
  transfer: "export",
  sync: "synchronization",
  synch: "synchronization"
};

const synonymStems = {};

Object.keys(synonyms).forEach(key => {
  synonymStems[PorterStemmer.stem(key)] = PorterStemmer.stem(synonyms[key]);
});

const utteranceToTokens = str => featuresToDict(stem(tokenize(str)).map(x => synonymStems[x] || x));

function augment(x, entities) {
  const result = [x];
  let augmented = x;
  entities.forEach(entity => {
    augmented = augmented.replace(entity.text, `%${entity.entity}%`);
  });
  if (augmented !== x) {
    result.push(augmented);
  }
  return result;
}

const networkConfig = { errorThresh: 0.00005, activation: 'leaky-relu', hiddenLayers: [] };
const engine = {
  createNetwork: () => new NeuralNetwork(networkConfig),
  train: (net, xs, ys, zs) => {
    const input = [];
    for (let i = 0; i < xs.length; i += 1) {
      const augmented = augment(xs[i], zs[i]);
      augmented.forEach(x => {
        input.push({ input: utteranceToTokens(x), output: { [ys[i]]: 1 } });
      });
    }
    return net.train(input);
  },
  predict: (net, x) => net.run(utteranceToTokens(x))
}

async function main() {
  calculate(engine);
}

main();