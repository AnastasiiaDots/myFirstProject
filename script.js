'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные");
const screenPrice = +prompt('Сколько будет стоить данная работа?', "12000");
const rollback = 10;

const adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = +prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = +prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let outsourcePrice = fullPrice * (rollback / 100);
let servicePercentPrice = Math.ceil(fullPrice - outsourcePrice);

switch (true) {
    case fullPrice >= 3000:
        console.log("Даем скидку в 10 %");
        break;
    case fullPrice >= 15000:
        console.log("Даем скидку в 5%");
        break;
    case fullPrice >= 0:
        console.log("Скидка не предусмотрена");
        break;
    case n < 0:
        console.log("Что то пошло не так");
};

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);

console.log(screens.toLowerCase().split(", "));

console.log("Стоимость верстки экранов", screenPrice, "$");
console.log("Стоимость разработки сайта", fullPrice, "$");

console.log(servicePercentPrice)

