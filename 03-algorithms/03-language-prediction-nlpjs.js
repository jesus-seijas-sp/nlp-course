const { Language } = require('@nlpjs/language');

const language = new Language();
const allowList = ['en', 'es', 'fr'];
const output = language.guessBest('this is a sentence', allowList);
console.log(output);

console.log(language.guessBest('this sentence should be classified as english', allowList));
console.log(language.guessBest('Cette phrase doit être classée comme française', allowList));
console.log(language.guessBest('Esta frase debería ser clasificada como español',  allowList));
