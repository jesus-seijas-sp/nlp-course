const Recognizers = require('@microsoft/recognizers-text-suite');

const cultureEn = Recognizers.Culture.English;
console.log(Recognizers.recognizeNumber('It was 545', cultureEn));
console.log(Recognizers.recognizeNumber('It was five hundred and forty five', cultureEn));
console.log(Recognizers.recognizeOrdinal('It was 4th', cultureEn));
console.log(Recognizers.recognizeOrdinal('It was second', cultureEn));
console.log(Recognizers.recognizeDimension('It was 545 km', cultureEn));
console.log(Recognizers.recognizeDimension('It was 545 m3', cultureEn));
console.log(Recognizers.recognizePercentage('It was 545 percent', cultureEn));
console.log(Recognizers.recognizePercentage('It was 545%', cultureEn));
console.log(Recognizers.recognizeAge('It was 545 years old', cultureEn));
console.log(Recognizers.recognizeAge('It was 545 months old', cultureEn));
console.log(Recognizers.recognizeCurrency('It was 545 finnish markka', cultureEn));
console.log(Recognizers.recognizeTemperature('It was 545 C', cultureEn));
console.log(JSON.stringify(Recognizers.recognizeDateTime('It was on 28/10/2017', cultureEn), null, 2));
console.log(JSON.stringify(Recognizers.recognizeDateTime('It was yesterday', cultureEn), null, 2));
console.log(JSON.stringify(Recognizers.recognizeDateTime('It was 15 days ago', cultureEn), null, 2));
console.log(Recognizers.recognizePhoneNumber('+34 555 666 777', cultureEn));
console.log(Recognizers.recognizeIpAddress('192.168.1.1', cultureEn));
console.log(Recognizers.recognizeIpAddress('::ffff:c0a8:101', cultureEn));
console.log(Recognizers.recognizeBoolean('It was true', cultureEn));
console.log(Recognizers.recognizeBoolean('yes of course', cultureEn));
console.log(Recognizers.recognizeEmail('It was mail@mail.com', cultureEn));
console.log(Recognizers.recognizeHashtag('It was #nlp #ner', cultureEn));
console.log(Recognizers.recognizeMention('It was @nlp @ner', cultureEn));
console.log(Recognizers.recognizeURL('It was https://ner.com', cultureEn));

console.log(Recognizers.recognizeNumber('Eran quinientos cuarenta y cinco', Recognizers.Culture.Spanish));
console.log(Recognizers.recognizeDimension('It was 545 km', cultureEn));
console.log(Recognizers.recognizeDimension('Eran 545 km', Recognizers.Culture.Spanish));

