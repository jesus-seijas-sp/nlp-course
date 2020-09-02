const tf = require('@tensorflow/tfjs-node');
const { CorpusLookup } = require('@nlpjs/utils');
const { TokenizerEn } = require('@nlpjs/lang-en');

class TensorflowClassifier {
  constructor(settings, stemmer) {
    this.settings = settings || {};
    this.tokenizer = new TokenizerEn();
    this.stemmer = stemmer || { tokenizeAndStem: (str) => this.tokenizer.tokenize(str, true) };
  }

  createModel(numFeatures, numClasses) {
    const model = tf.sequential();
    model.add(tf.layers.dense({
        inputShape: [numFeatures],
        activation: 'linear',
        units: numClasses, 
    }));
    model.add(tf.layers.softmax());
    model.compile({ optimizer: tf.train.adagrad(0.5), loss: 'categoricalCrossentropy' })
    return model;
  }

  getTrainingData() {
      const result = {
          xs: [],
          ys: [],
      }
      this.lookups.trainVectors.forEach(vector => {
        result.xs.push(vector.input);
        result.ys.push(vector.output);
      });
      return result;
  }
  
  async train(corpus) {
    this.lookups = new CorpusLookup(corpus, this.stemmer);
    this.net = this.createModel(this.lookups.numInputs, this.lookups.numOutputs);
    const data = this.getTrainingData();
    await this.net.fit(tf.tensor(data.xs), tf.tensor(data.ys), { epochs: 200 });
  }

  process(utterance) {
    const vector = this.lookups.inputToVector(utterance);
    const output = this.net.predict(tf.tensor([vector]));
    return this.lookups.vectorToClassifications(output.dataSync());
  }
}

module.exports = TensorflowClassifier;
