const { TokenizerEn } = require('@nlpjs/lang-en');
const { PorterStemmer } = require('natural');
const BrainClassifier = require('./classifiers/brain-classifier');
const corpus = require('./data/corpus-en.json');

const tokenizer = new TokenizerEn();
const stemmer = { tokenizeAndStem: (str) =>
  tokenizer.tokenize(str, true).map(token => PorterStemmer.stem(token))
}

const classifier = new BrainClassifier(undefined,stemmer);
classifier.train(corpus);

let total = 0;
let good = 0;
corpus.data.forEach(item => {
    item.tests.forEach(test => {
        const classifications = classifier.process(test);
        total += 1;
        if (classifications[0].intent === item.intent) {
            good += 1;
        }
    });
});

console.log(`${good} good of a total of ${total} (${good * 100 / total}%)`);