const { dockStart } = require('@nlpjs/basic');
const corpus = require('./data/corpus-en.json');

async function main() {
  const dock = await dockStart({ use: ['Basic', 'LangEn'] });
  const nlp = dock.get('nlp');
  nlp.addCorpus(corpus);
  await nlp.train();
  let total = 0;
  let good = 0;
  for (let i = 0; i < corpus.data.length; i += 1) {
    const item = corpus.data[i];
    for (let j = 0; j < item.tests.length; j += 1) {
      const test = item.tests[j];
      const output = await nlp.process(test);
      total += 1;
      if (output.intent === item.intent) {
        good += 1;
      }
    }
  }
  console.log(`${good} good of a total of ${total} (${good * 100 / total}%)`);  
}

main();