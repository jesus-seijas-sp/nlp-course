const fs = require('fs');

function convert(srcFile, tgtFile) {
  const src = JSON.parse(fs.readFileSync(srcFile, 'utf-8'));
  const result = {
    name: src.name,
    locale: 'en-us',
    data: [],
  }
  const intents = {};
  for (let i = 0; i < src.sentences.length; i += 1) {
    const sentence = src.sentences[i];
    let intent = intents[sentence.intent];
    if (!intent) {
      intent = {
        intent: sentence.intent,
        utterances: [],
        tests: [],
      }
      result.data.push(intent);
      intents[sentence.intent] = intent;
    }
    const text = sentence.text;
    if (sentence.training) {
      intent.utterances.push(text);
    } else {
      intent.tests.push(text);
    }
  }
  fs.writeFileSync(tgtFile, JSON.stringify(result, null, 2), 'utf-8');
}

convert('./data/sigdial22/askubuntu.json', './data/corpus-askubuntu.json');
convert('./data/sigdial22/chatbot.json', './data/corpus-chatbot.json');
convert('./data/sigdial22/webapp.json', './data/corpus-webapp.json');