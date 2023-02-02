'use strict';

let title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные");
const screenPrice = +prompt('Сколько будет стоить данная работа?', "12000");
const adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

let outsourcePrice = fullPrice * (rollback / 100);

const getAllServicePrices = function () {
    return servicePrice1 + servicePrice2;
};

const getFullPrice = function () {
    return screenPrice + allServicePrices;
};

const getTitle = function () {
    return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
};

const getServicePercentPrices = function () {
    return fullPrice - outsourcePrice
};

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return "Даем скидку в 10 %"
    } else if (price >= 15000) {
        return "Даем скидку в 5%"
    } else if (price >= 0) {
        return "Скидка не предусмотрена"
    } else if (price < 0) {
        return "Что то пошло не так"
    }
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
}

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(getRollbackMessage(fullPrice));


console.log(screens.toLowerCase().split(", "));

console.log("Стоимость верстки экранов", screenPrice, "$");
console.log("Стоимость разработки сайта", fullPrice, "$");

