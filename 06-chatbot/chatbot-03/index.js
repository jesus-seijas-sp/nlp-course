const { dock, dockStart } = require('@nlpjs/basic');


(async() => {
  await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  let result = await nlp.process('please, Who are you');
  console.log(result);
  result = await nlp.process('por favor Quién eres?');
  console.log(result);
})();