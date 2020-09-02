const { NGrams } = require('@nlpjs/utils');
const fs = require('fs');

const gramsByChar = new NGrams();
const gramsByWord = new NGrams({ byWord: true, startToken: '[START]', endToken: '[END]' });

const input = 'one ring to rule them all';
const outputByChar = gramsByChar.getNGrams(input, 3);
const outputByWord = gramsByWord.getNGrams(input, 3);
console.log(outputByChar);
console.log(outputByWord);

const freqByChar = gramsByChar.getNGramsFreqs(input, 2, true);
console.log(freqByChar);

const lines = fs.readFileSync('./data/wikipedia_es.txt', 'utf-8').split(/\r?\n/);
console.log(lines);
const freqs = gramsByChar.getNGramsFreqs(lines, 3);
console.log(freqs);