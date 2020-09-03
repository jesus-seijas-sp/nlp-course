const { SpellCheck } = require('@nlpjs/similarity');
const { NGrams } = require('@nlpjs/utils');
const fs = require('fs');

const features = {
  wording: 5,
  working: 10,
  other: 1,
}

const spellChecker = new SpellCheck({ features });
const result = spellChecker.check(['worling', 'hotter']);
console.log(result);

const lines = fs.readFileSync('./data/book.txt', 'utf-8').split(/\r?\n/);
const ngrams = new NGrams({ byWord: true });
const freqs = ngrams.getNGramsFreqs(lines, 1);
const spellCheckBook = new SpellCheck({ features: freqs });
const actual = spellCheckBook.check(['knowldge', 'thas', 'prejudize']);
console.log(actual);
console.log(freqs.this);
console.log(freqs.that);