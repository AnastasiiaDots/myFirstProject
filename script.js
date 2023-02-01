const title = 'First Project';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 230;
const rollback = 10;
const fullPrice = 500;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);

console.log(screens.toLowerCase().split(", "));

console.log("Стоимость верстки экранов", screenPrice, "$");
console.log("Стоимость разработки сайта", fullPrice, "$");

console.log(fullPrice * (rollback / 100))

