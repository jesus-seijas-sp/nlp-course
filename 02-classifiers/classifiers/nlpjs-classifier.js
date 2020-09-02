const { CorpusLookup } = require('@nlpjs/utils');
const { TokenizerEn } = require('@nlpjs/lang-en');
const { NeuralNetwork } = require('@nlpjs/neural');

class NlpjsClassifier {
  constructor(settings = {}, stemmer) {
    this.settings = settings;
    this.tokenizer = new TokenizerEn();
    this.stemmer = stemmer || { tokenizeAndStem: (str) => this.tokenizer.tokenize(str, true) };
  }
  
  train(corpus) {
    this.lookups = new CorpusLookup(corpus, this.stemmer, false);
    this.net = new NeuralNetwork(this.settings);
    this.net.train(this.lookups.trainData);
  }

  process(utterance) {
    const obj = this.lookups.prepareInput(utterance);
    const output = this.net.run(obj);
    return this.lookups.objToClassifications(output);
  }
}

module.exports = NlpjsClassifier;
