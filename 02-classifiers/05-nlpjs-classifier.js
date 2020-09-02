const NlpjsClassifier = require('./classifiers/nlpjs-classifier');
const corpus = require('./data/corpus-en.json');

const classifier = new NlpjsClassifier({ log: true });
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