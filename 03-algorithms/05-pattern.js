const { composeFromPattern, composeCorpus } = require('@nlpjs/utils');
const corpusPattern = require('./data/corpus-en-pattern.json');

const input = 'I [am having|have] a [problem|question|issue] that I have to [solve|investigate]';
const result = composeFromPattern(input);
console.log(result);

const corpus = composeCorpus(corpusPattern);
console.log(JSON.stringify(corpus, null, 2));
