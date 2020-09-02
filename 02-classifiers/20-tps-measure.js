const { dockStart } = require('@nlpjs/basic');
const { StemmerEn } = require('@nlpjs/lang-en');
const { Bench } = require('@nlpjs/utils');
const corpus = require('./data/corpus-en.json');
const BrainClassifier = require('./classifiers/brain-classifier');
const NlpjsClassifier = require('./classifiers/nlpjs-classifier');
const TensorflowClassifier = require('./classifiers/tensorflow-classifier');
const OwnClassifier = require('./classifiers/own-classifier');

async function measure(classifier) {
  let total = 0;
  let good = 0;
  for (let i = 0; i < corpus.data.length; i += 1) {
    const item = corpus.data[i];
    for (let j = 0; j < item.tests.length; j += 1) {
      const test = item.tests[j];
      const output = await classifier.process(test);
      total += 1;
      const intent = Array.isArray(output) ? output[0].intent : output.intent;
      if (intent === item.intent) {
        good += 1;
      }
    }
  }
  return { total, good, name: classifier.constructor.name };
} 

async function main() {
  const dock = await dockStart({ use: ['Basic', 'LangEn'] });
  const nlp = dock.get('nlp');
  nlp.addCorpus(corpus);
  const classifiers = [];
  const stemmer = new StemmerEn();
  classifiers.push(new BrainClassifier(undefined, stemmer));
  classifiers.push(new TensorflowClassifier(undefined, stemmer));
  classifiers.push(new NlpjsClassifier(undefined, stemmer));
  classifiers.push(new OwnClassifier(undefined, stemmer));
  classifiers.push(nlp);
  const bench = new Bench({ transactionsPerRun: 256 });
  for (let i = 0; i < classifiers.length; i += 1) {
    const classifier = classifiers[i];
    bench.add(
      classifier.constructor.name, 
      async (net) => await measure(net), 
      async () => { await classifier.train(corpus); return classifier; });
  }
  const result = await bench.run();
  console.log(result);
}

main();