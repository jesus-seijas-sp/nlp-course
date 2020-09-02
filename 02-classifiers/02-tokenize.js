const natural = require('natural');
const { TokenizerEn } = require('@nlpjs/lang-en');

const input = "I didn't finish the task. I cannot end today. I'll end tomorrow";

function tokenize(text) {
    // return text.split(/\W+/g);
    return text.split(/[\s,.!?;:([\]'"¿¡)/]+/);
}

function tokenizeAggresive(text) {
    const tokenizer = new natural.AggressiveTokenizer();
    return tokenizer.tokenize(text);
}

function tokenizeTreebank(text) {
    const tokenizer = new natural.TreebankWordTokenizer();
    return tokenizer.tokenize(text);
}

function tokenizeNlpjs(text) {
    const tokenizer = new TokenizerEn();
    return tokenizer.tokenize(text, true);
}

console.log(tokenize(input));
console.log(tokenizeAggresive(input));
console.log(tokenizeTreebank(input));
console.log(tokenizeNlpjs(input));
