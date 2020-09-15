const { Bench } = require('@nlpjs/utils');
const { Ner } = require('@nlpjs/ner');
const airports = require('./data/airports.json');

async function testNer() {
  const ner = new Ner();
  // heros
  //   - spiderman: spiderman, spider-man, peter parker
  //   - batman: batman, dark knight, bruce wayne
  // food
  //   - pasta: spaghetti, macaroni, raviolli, pasta
  //   - fruit: apple, banana, strawberry
  ner.addRuleOptionTexts('en', 'hero', 'spiderman', ['spiderman', 'spider-man', 'Peter Parker']);
  ner.addRuleOptionTexts('en', 'hero', 'batman', ['batman', 'dark knight', 'Bruce Wayne']);
  ner.addRuleOptionTexts('en', 'food', 'pasta', ['pasta', 'spaghetti', 'macaroni', 'raviolli']);
  ner.addRuleOptionTexts('en', 'food', 'fruit', ['apple', 'banana', 'macaroni', 'strawberry']);
  const result = await ner.process({ locale: 'en', text: 'I saw peter prker eating an aple in New York' });
  console.log(result);
}

// testNer();

async function airportNer() {
  const airportKeys = Object.keys(airports);
  console.log(airportKeys.length);
  const nerSimilar = new Ner();
  const nerEqual = new Ner({ threshold: 1 });
  airportKeys.forEach(key => {
    const airport = airports[key];
    nerSimilar.addRuleOptionTexts('en', 'airport', airport.icao, [airport.city, airport.name]);
    nerEqual.addRuleOptionTexts('en', 'airport', airport.icao, [airport.city, airport.name]);
  });
  const input = { locale: 'en', text: 'I want to travel to San francsco tomorrow' };
  const bench = new Bench({ duration: 10000 });
  bench.add('Similar', () => nerSimilar.process(input));
  bench.add('Equal', () => nerEqual.process(input));
  const result = await bench.run();
  console.log(result);
  // const resultSimilar = await nerSimilar.process(input);
  // const resultEqual = await nerEqual.process(input);
  // console.log(resultSimilar);
  // console.log(resultEqual);
}

airportNer();