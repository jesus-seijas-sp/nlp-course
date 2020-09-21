const { NlgManager } = require('@nlpjs/nlg');

async function main() {
  const nlg = new NlgManager();
  nlg.add('en', 'greet', 'Hello');
  nlg.add('en', 'greet', 'Hi');
  nlg.add('en', 'greet', 'Hello hello!');
  nlg.add('en', 'bye', 'Goodbye');
  nlg.add('en', 'bye', 'Bye!');
  nlg.add('es', 'greet', 'Hola');
  nlg.add('es', 'greet', 'Buenas!');
  nlg.add('es', 'bye', 'Adiós');
  nlg.add('es', 'bye', 'Hasta luego!');
  const result = await nlg.run({ locale: 'es', intent: 'bye' });
  console.log(result.answer);
}

main();