const { removeEmojis } = require('@nlpjs/emoji');

const text = 'I ❤️  ☕️! -  😯⭐️😍';
const result = removeEmojis(text);
console.log(result);