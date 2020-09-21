const { Template, Evaluator } = require('@nlpjs/evaluator');
const { NlgManager } = require('@nlpjs/nlg');

const evaluator = new Evaluator();
const context = { numbers: [1, 2, 3] };
const text = 'numbers.map(function(x) { return x * 2 })';
console.log(evaluator.evaluate(text, context));

async function main() {
  const nlg = new NlgManager();
  nlg.container.use(Template);
  nlg.container.use(Evaluator);
  nlg.add('en', 'greet', '(Hello|Hi) user! How (are you doing|are you|is it going)?');
  nlg.add('en', 'greet', 'Hello hello!');
  nlg.add('en', 'bye', 'Goodbye');
  nlg.add('en', 'bye', 'Bye!');
  nlg.add('es', 'greet', 'Hola');
  nlg.add('es', 'greet', 'Buenas!');
  nlg.add('es', 'bye', 'Adiós');
  nlg.add('es', 'bye', 'Hasta luego!');
  nlg.add('en', 'messages', 'You have {{ messages }} new messages', 'messages > 1'); // messages > 1
  nlg.add('en', 'messages', 'You have {{ messages }} new message', 'messages === 1'); // messages === 1
  nlg.add('en', 'messages', 'You have no new messages', 'messages <= 0'); // messages <= 0
  nlg.add('en', 'price', 'Total price is {{ price + price * vat / 100 }}$');
  const result = await nlg.run({
    locale: 'en',
    intent: 'messages',
    context: { messages: 3 }
  });
  console.log(result.answer);
}

main();