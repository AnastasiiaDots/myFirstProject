'use strict';

const title = document.getElementsByTagName('h1')[0];

const btnStart = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];

const btnPlus = document.querySelector('.screen-btn');

const otherItemPercent = document.querySelectorAll('.other-items.percent');
const otherItemNumber = document.querySelectorAll('.other-items.number');

const range = document.querySelector('.rollback input');
const rangeValue = document.querySelector('.rollback .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [], //aray property
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {}, //object property
    servicesNumber: {},

    init: function () {
        appData.addTitle();
        btnStart.addEventListener('click', appData.start);
        btnPlus.addEventListener('click', appData.addScreenBlock);

        function inputRange() {
            appData.rollback = +range.value;
            // appData.servicePercentPrice();
            rangeValue.innerHTML = +appData.rollback + '%';
        }
        range.addEventListener('input', inputRange)
    },

    addTitle: function () {
        document.title = title.textContent

    },

    addScreens: function () {
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value,
            })
        });
    },

    addServices: function () {
        otherItemPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        });
        otherItemNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })
        console.log(appData);
    },

    addScreenBlock: function () {
        const screens = document.querySelectorAll('.screen');
        const cloneScreen = screens[0].cloneNode(true);

        const inputs = cloneScreen.querySelectorAll('input[type="text"]');
        inputs.forEach(function (input) {
            input.value = '';
        });

        screens[screens.length - 1].after(cloneScreen)

    },

    addPrices: function () {
        appData.screenPrice = 0;
        appData.totalCount = 0;
        for (let screens of appData.screens) {
            appData.screenPrice += +screens.price,
                appData.totalCount += +screens.count
        }
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }
        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber

        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
    },

    showResult: function () {
        total.value = appData.screenPrice
        totalCount.value = appData.totalCount
        totalCountOther.value = appData.servicePercentPrice + appData.servicePricesNumber
        totalFullCount.value = appData.fullPrice
        totalCountRollback.value = appData.servicePercentPrice
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.totalCount);
    },

    checkScreenInputs: function () {
        const screenBlock = document.querySelectorAll('.screen')
        let isValid = true;

        screenBlock.forEach(function (screen) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            if (!input.value || isNaN(+input.value) || select.selectedIndex === 0) {
                isValid = false;
            }
        });

        return isValid;
    },

    start: function () {
        if (appData.checkScreenInputs()) {
            appData.addScreens();
            appData.addServices();
            appData.addPrices();
            appData.showResult();

        } else {
            alert('Fill the screen field')
        }
        appData.logger();
    },

};

appData.init();



