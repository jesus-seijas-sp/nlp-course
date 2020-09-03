const { similarity } = require('@nlpjs/similarity');

console.log(similarity('potatoe', 'potatoe'));
console.log(similarity('potatoe', 'potatoes'));
console.log(similarity('potatoe', 'potsatoe'));
console.log(similarity('potatoe', 'poattoe'));
console.log(similarity('potatoe', 'postatoé', true));
console.log(similarity('potatoe', 'Postatoé', true));