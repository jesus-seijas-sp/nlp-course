const { Ner } = require('@nlpjs/ner');
const { BuiltinMicrosoft } = require('@nlpjs/builtin-microsoft');

async function main() {
  const ner = new Ner();
  const builtin = new BuiltinMicrosoft({ builtins: ['Dimension', 'DateTime'] });
  ner.container.register('extract-builtin-??', builtin);
  const input = {
    text: 'tomorrow I will walk 10 kilometers #walk',
    locale: 'en',
  }
  const result = await ner.process(input);
  console.log(result);
}

main();