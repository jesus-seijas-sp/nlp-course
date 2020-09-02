const Perceptron = require('./perceptron');

const defaultSettings = {
  learningRate: 0.6,
  momentum: 0.5,
  alpha: 0.07,
  maxIterations: 2000,
  errorTresh: 0.00005,
}

class NeuralNetwork {
  constructor(settings) {
    this.settings = settings || defaultSettings;
  }

  initialize(numInputs, labels) {
    this.perceptrons = [];
    this.outputs = {};
    for (let i = 0; i < labels.length; i += 1) {
      const perceptron = new Perceptron({
        id: i,
        label: labels[i],
        numInputs,
        momentum: this.settings.momentum,
        alpha: this.settings.alpha,
        learningRate: this.settings.learningRate,
      });
      this.perceptrons.push(perceptron);
      this.outputs[labels[i]] = 0;  
    }
  }

  run(input) {
    for (let i = 0; i < this.perceptrons.length; i += 1) {
      const perceptron = this.perceptrons[i];
      this.outputs[perceptron.label] = perceptron.run(input);
    }
    return this.outputs;
  }

  train(data, numInputs, labels) {
    this.initialize(numInputs, labels);
    this.status = { error: Infinity, iterations: 0 };
    while (this.status.iterations < this.settings.maxIterations && this.status.error > this.settings.errorTresh) {
      const hrstart = new Date();
      this.status.iterations += 1;
      this.status.error = 0;
      for (let i = 0; i < this.perceptrons.length; i += 1) {
        const perceptron = this.perceptrons[i];
        this.status.error += perceptron.train(data);
      }
      this.status.error /= this.perceptrons.length * data.length;
      const hrend = new Date();
      const elapsed = hrend.getTime() - hrstart.getTime();
      console.log(`Iteration: ${this.status.iterations} Error: ${this.status.error} Time: ${elapsed}ms`);
    }
    return this.status;
  }
}

module.exports = NeuralNetwork;