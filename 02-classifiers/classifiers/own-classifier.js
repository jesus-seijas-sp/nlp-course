const { CorpusLookup } = require('@nlpjs/utils');
const { TokenizerEn } = require('@nlpjs/lang-en');
const NeuralNetwork = require('./neural-network');

class OwnClassifier {
  constructor(settings = {}, stemmer) {
    this.settings = settings;
    this.tokenizer = new TokenizerEn();
    this.stemmer = stemmer || { tokenizeAndStem: (str) => this.tokenizer.tokenize(str, true) };
  }
  
  train(corpus) {
    this.lookups = new CorpusLookup(corpus, this.stemmer, false);
    this.net = new NeuralNetwork();
    this.net.train(this.lookups.trainObjects, this.lookups.numInputs, this.lookups.outputLookup.items);
  }

  process(utterance) {
    const obj = this.lookups.inputToObj(utterance);
    const output = this.net.run(obj);
    return this.lookups.objToClassifications(output);
  }
}

module.exports = OwnClassifier;
