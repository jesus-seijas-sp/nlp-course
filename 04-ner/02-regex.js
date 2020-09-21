const { Ner } = require('@nlpjs/ner');

async function testNer() {
  const ner = new Ner();
  const input = {
    locale: 'en',
    text: 'this is dbbbbbbd and ccdbbdcc the zip code is 12345 but not 345678 but yes 56789',
  }
  ner.addRegexRule('en', 'rule-dbd', /d(b+)d/);
  ner.addRegexRule('en', 'zip', /\b\d{5}\b/)
  const result = await ner.process(input);
  console.log(result);
}

testNer();