const { dockStart } = require('@nlpjs/basic');

(async() => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  const result = await nlp.process('Please, When is your birthday?');
  console.log(result.answer);
})();