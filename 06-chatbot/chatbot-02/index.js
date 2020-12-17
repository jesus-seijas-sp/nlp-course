const { dock, dockStart } = require('@nlpjs/basic');
const { NlpAnalyzer } = require('@nlpjs/utils');
const corpus = require('../data/corpus-test-en.json');

async function trainFn(corpus) {
  const nlp = dock.get('nlp');
  nlp.addCorpus(corpus);
  await nlp.train();
  return nlp;
}

function testFn(utterance, nlp) {
  return nlp.process(utterance);
}

(async() => {
  await dockStart();
  const analyzer = new NlpAnalyzer();
  const analysis = await analyzer.analyze(corpus, trainFn, testFn);
  await analyzer.generateExcel('./measure.xlsx', analysis);
})();