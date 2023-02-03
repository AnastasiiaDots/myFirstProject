'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

// проверка на число, ! дает противоположное значение
const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
};

const asking = function () {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?')
    } while (!isNumber(screenPrice));

    adaptive = confirm('Нужен ли адаптив на сайте?');
}

const getAllServicePrices = function () {
    let sum = 0

    for (let i = 0; i < 2; i++) {

        let servicPrice = 0

        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?')
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?')
        }

        do {
            servicPrice = prompt('Сколько это будет стоить?')
        } while (!isNumber(servicPrice))

        sum += +servicPrice
    }

    return sum
};

const getFullPrice = function () {
    return +screenPrice + allServicePrices;
};

const getTitle = function () {
    return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
};

const getServicePercentPrices = function () {
    return fullPrice - (fullPrice * (rollback / 100))
};

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return 'Даем скидку в 10 %'
    } else if (price >= 15000) {
        return 'Даем скидку в 5%'
    } else if (price >= 0) {
        return 'Скидка не предусмотрена'
    } else if (price < 0) {
        return 'Что то пошло не так'
    }
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log('allServicePrices', allServicePrices);
console.log(getRollbackMessage(fullPrice));


console.log(screens.toLowerCase().split(", "));
console.log('servicePercentPrice', servicePercentPrice)


console.log("Стоимость верстки экранов", screenPrice, "$");
console.log("Стоимость разработки сайта", fullPrice, "$");

