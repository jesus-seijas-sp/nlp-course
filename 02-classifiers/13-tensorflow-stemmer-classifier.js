const { StemmerEn } = require('@nlpjs/lang-en');
const TensorflowClassifier = require('./classifiers/tensorflow-classifier');
const corpus = require('./data/corpus-en.json');

async function main() {
    const stemmer = new StemmerEn();
    const classifier = new TensorflowClassifier(undefined, stemmer);
    await classifier.train(corpus);
    
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
}

main();
