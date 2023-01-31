const title = 'First Project';
const screens = 'Простые, Сложные, Интерактивные';
const lowScreens = screens.toLowerCase();
const screenPrice = 230;
const rollback = 10;
const fullPrice = 500;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);

console.log(lowScreens.split(", "));

console.log("Стоимость верстки экранов", screenPrice, "$");
console.log("Стоимость разработки сайта", fullPrice, "$");

console.log(fullPrice * (rollback / 100))

let num = (266219).toString();
console.log(num[0] * num[1] * num[2] * num[3] * num[4] * num[5]);