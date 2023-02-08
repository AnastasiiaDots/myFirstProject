'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',

    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?')
        } while (!isNumber(appData.screenPrice));

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    // проверка на число, ! дает противоположное значение
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    getAllServicePrices: function () {
        let sum = 0

        for (let i = 0; i < 2; i++) {

            let servicPrice = 0

            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?')
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?')
            }

            do {
                servicPrice = prompt('Сколько это будет стоить?')
            } while (!isNumber(servicPrice))

            sum += + servicPrice
        }

        return sum
    },

    getFullPrice: function () {
        return + appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function () {
        return appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },

    getServicePercentPrices: function () {
        return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
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
        for (let key in appData) {
            console.log(key + appData[key]);
        }
    },

    start: function () {
        this.asking();
        this.allServicePrices = this.getAllServicePrices();
        this.fullPrice = this.getFullPrice();
        this.title = this.getTitle();
        this.servicePercentPrice = this.getServicePercentPrices();

        this.logger();
    },

};

// // appData.asking();
// // appData.allServicePrices = getAllServicePrices();
// // appData.fullPrice = getFullPrice();
// // appData.title = getTitle();
// // appData.servicePercentPrice = getServicePercentPrices();
appData.start();

// // console.log(appData.fullPrice);
// // console.log(appData.servicePercentPrice);

