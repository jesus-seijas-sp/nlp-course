require('dotenv').config();
const { StemmerEn } = require('@nlpjs/lang-en');
const fs = require('fs');
const { NluLuis } = require('@nlpjs/nlu-luis');
const corpus = require('./data/corpus-en.json');

function stemCorpus(corpus) {
  const stemmer = new StemmerEn();
  corpus.data.forEach(item => {
    for (let i = 0; i < item.utterances.length; i += 1) {
      item.utterances[i] = stemmer.tokenizeAndStem(item.utterances[i]).join(' ');
    }  
    for (let i = 0; i < item.tests.length; i += 1) {
      item.tests[i] = stemmer.tokenizeAndStem(item.tests[i]).join(' ');
    }  
  });
}

stemCorpus(corpus);
console.log(JSON.stringify(corpus, null, 2));

const luis = new NluLuis({ luisUrl: process.env.LUIS_URL_STEMMED });

function exportCorpus() {
  const json = luis.fromCorpus(corpus);
  fs.writeFileSync('./data/corpus-en-luis-stemmed.json', JSON.stringify(json, null, 2), 'utf-8');
}

async function main() {
  let total = 0;
  let good = 0;
  for (let i = 0; i < corpus.data.length; i += 1) {
    const item = corpus.data[i];
    for (let j = 0; j < item.tests.length; j += 1) {
      const test = item.tests[j];
      const output = await luis.processUtterance(test);
      total += 1;
      if (output.prediction && output.prediction.topIntent === item.intent) {
        good += 1;
      }
      console.log(`${good} good of a total of ${total} (${good * 100 / total}%)`);      
    }
  }
  console.log(`${good} good of a total of ${total} (${good * 100 / total}%)`);  
}

main();
// exportCorpus();