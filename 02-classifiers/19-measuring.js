const { dockStart } = require('@nlpjs/basic');
const { StemmerEn } = require('@nlpjs/lang-en');
const { NlpAnalyzer } = require('@nlpjs/utils');
const corpus = require('./data/corpus-en.json');
const BrainClassifier = require('./classifiers/brain-classifier');
const NlpjsClassifier = require('./classifiers/nlpjs-classifier');
const TensorflowClassifier = require('./classifiers/tensorflow-classifier');
const OwnClassifier = require('./classifiers/own-classifier');

function trainFn(corpus) {
  this.train(corpus);
  return this;
}

async function testFn(utterance, net) {
  const result = await net.process(utterance);
  if (result.classifications) {
    return result;
  }
  return { classifications: result };
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
  const analyzer = new NlpAnalyzer();
  for (let i = 0; i < classifiers.length; i += 1) {
    const classifier = classifiers[i];
    const analysis = await analyzer.analyze(corpus, trainFn.bind(classifier), testFn);
    await analyzer.generateExcel(`./data/${classifier.constructor.name}-stemmed.xlsx`, analysis);
  }
}

main();