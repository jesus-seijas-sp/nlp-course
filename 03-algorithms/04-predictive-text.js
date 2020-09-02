const { MarkovChain } = require('@nlpjs/utils');
const fs = require('fs');

const input = fs.readFileSync('./data/book.txt', 'utf-8');

const chain = new MarkovChain({ text: input });
const actual = chain.predictNext('when Elizabeth had read', 3);
console.log(actual);

const sentence = chain.randomSentence();
console.log(sentence);
