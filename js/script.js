'use strict';

const title = document.getElementsByTagName('h1')[0];

const btnStart = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];

const plus = document.querySelector('.screen-btn');

const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');

const range = document.querySelector('.rollback input');
const rangeValue = document.querySelector('.rollback.range-value');

const total = document.getElementsByClassName('.total-input')[0];
const totalCount = document.getElementsByClassName('.total-input')[1];
const totalCountOther = document.getElementsByClassName('.total-input')[2];
const totalFullCount = document.getElementsByClassName('.total-input')[3];
const totalCountRollback = document.getElementsByClassName('.total-input')[4];

let screen = document.querySelectorAll('.screen');




const appData = {
    title: '',
    screens: [], //aray property
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {}, //object property

    // проверка на число, ! дает противоположное значение
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    asking: function () {
        // appData.title = ''

        do {
            appData.title = prompt('Как называется ваш проект?')
        } while (appData.title === null || typeof appData.title !== 'string' || isNaN(appData.title) === false);


        for (let i = 0; i < 2; i++) {
            let name = ''
            let price = 0

            do {
                name = prompt('Какие типы экранов нужно разработать?')
            } while (name === null || typeof name !== 'string' || isNaN(name) === false)


            do {
                price = prompt('Сколько будет стоить данная работа?')
            } while (!appData.isNumber(price))

            appData.screens.push({ id: i, name: name, price: price })
        }

        for (let i = 0; i < 2; i++) {
            let name = ''

            let price = 0

            do {
                name = prompt('Какой дополнительный тип услуги нужен?')
            } while (name === null || typeof name !== 'string' || isNaN(name) === false)

            do {
                price = prompt('Сколько это будет стоить?')
            } while (!appData.isNumber(price))

            appData.services[name] = + price
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    addPrices: function () {
        for (let screens of appData.screens) {
            appData.screenPrice += +screens.price
        }
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
        }
    },

    getFullPrice: function () {
        appData.fullPrice = + appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },

    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
    },

    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10 %'
        } else if (price >= 15000) {
            return 'Даем скидку в 5%'
        } else if (price >= 0) {
            return 'Скидка не предусмотрена'
        } else if (price < 0) {
            return 'Что то пошло не так'
        }
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    },

    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();

        appData.logger();
    },

};


appData.start();



