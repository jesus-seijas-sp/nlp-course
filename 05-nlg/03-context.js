const { Template } = require('@nlpjs/evaluator');
const { NlgManager } = require('@nlpjs/nlg');

const template = new Template();
const context = {
  items: [100, 10],
  numMessages: 3,
  calculateTotal: (price, vat) => price + price * vat / 100 };
const text = `Price is {{ items[0] }} and VAT is {{ items[1] }} Total {{ calculateTotal(items[0], items[1]) }}`;
console.log(template.compile(text, context));
console.log(template.compile('You have {{ numMessages }} new Messages', context));

async function main() {
  const nlg = new NlgManager();
  nlg.container.use(Template);
  nlg.add('en', 'greet', '(Hello|Hi) user! How (are you doing|are you|is it going)?');
  nlg.add('en', 'greet', 'Hello hello!');
  nlg.add('en', 'bye', 'Goodbye');
  nlg.add('en', 'bye', 'Bye!');
  nlg.add('es', 'greet', 'Hola');
  nlg.add('es', 'greet', 'Buenas!');
  nlg.add('es', 'bye', 'Adiós');
  nlg.add('es', 'bye', 'Hasta luego!');
  nlg.add('en', 'messages', 'You have {{ messages }} new messages');
  nlg.add('en', 'price', 'Total price is {{ price + price * vat / 100 }}$');
  const result = await nlg.run({
    locale: 'en',
    intent: 'messages',
    context: { messages: 3 }
  });
  console.log(result.answer);
  const result2 = await nlg.run({
    locale: 'en',
    intent: 'price',
    context: { messages: 3, price: 100, vat: 20 }
  });
  console.log(result2.answer);
}

main();