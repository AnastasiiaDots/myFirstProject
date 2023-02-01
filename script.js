'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные");
const screenPrice = prompt('Сколько будет стоить данная работа?', "12000");
const rollback = 10;
const fullPrice = 30000;
const adaptive = confirm('Нужен ли адаптив на сайте?');

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);

console.log(screens.toLowerCase().split(", "));

console.log("Стоимость верстки экранов", screenPrice, "$");
console.log("Стоимость разработки сайта", fullPrice, "$");

console.log(fullPrice * (rollback / 100))

