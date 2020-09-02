const { dockStart } = require('@nlpjs/basic');
const { StemmerEn } = require('@nlpjs/lang-en');
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
  const outputs = [];
  for (let i = 0; i < classifiers.length; i += 1) {
    const classifier = classifiers[i];
    await classifier.train(corpus);
    const output = await measure(classifier);
    outputs.push(output);
  }
  for (let i = 0; i < outputs.length; i += 1) {
    const { name, good, total } = outputs[i];
    console.log(`${name} - ${good} good of a total of ${total} (${good * 100 / total}%)`); 
  }
}

main();