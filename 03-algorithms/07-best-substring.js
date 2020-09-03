const { ExtractorEnum } = require('@nlpjs/ner');

const text = 'Morbi ainterd multricies neque varius condimentum. Donec volutpat turpis interdum metus ultricies vulputate. Duis ultricies rhoncus sapien, sit amet fermentum risus imperdiet vitae. Ut et lectus';
const str = 'interdum ultricies';

const extractor = new ExtractorEnum();
const result = extractor.getBestSubstring(text, str);
console.log(result);
