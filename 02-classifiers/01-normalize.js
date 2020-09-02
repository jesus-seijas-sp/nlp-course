const inputEn = 'Who is your developer?';
const inputEs = '¿Quién es tu desarrollador?';

function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

console.log(normalize(inputEn));
console.log(normalize(inputEs));
