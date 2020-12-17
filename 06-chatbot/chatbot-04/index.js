const { dock, dockStart } = require('@nlpjs/basic');


(async() => {
  await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
})();