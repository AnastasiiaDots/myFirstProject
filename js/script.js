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
        this.addTitle();
        btnStart.addEventListener('click', this.start.bind(this));
        btnReset.addEventListener('click', function () {
            this.reset()
        }.bind(this));
        btnPlus.addEventListener('click', this.addScreenBlock.bind(this));

        function inputRange() {
            this.rollback = +range.value;
            rangeValue.innerHTML = +this.rollback + '%';
        }
        range.addEventListener('input', inputRange.bind(this))
    },

    addTitle: function () {
        document.title = title.textContent
    },

    addScreens: function () {
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value,
            })
        });
    },

    addServices: function () {
        otherItemPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        });
        otherItemNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },

    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);

        const inputs = cloneScreen.querySelectorAll('input[type="text"]');
        inputs.forEach((input) => {
            input.value = '';
        });

        screens[screens.length - 1].after(cloneScreen);

        screens = document.querySelectorAll('.screen');
    },

    addPrices: function () {
        this.screenPrice = 0;
        this.totalCount = 0;
        for (let screens of this.screens) {
            this.screenPrice += +screens.price,
                this.totalCount += +screens.count
        }
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }
        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber

        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100))
    },

    showResult: function () {
        total.value = this.screenPrice
        totalCount.value = this.totalCount
        totalCountOther.value = this.servicePercentPrice + this.servicePricesNumber
        totalFullCount.value = this.fullPrice
        totalCountRollback.value = this.servicePercentPrice
    },

    logger: function () {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
        console.log(this.screens);
        console.log(this.totalCount);
    },

    checkScreenInputs: function () {
        let isValid = true;

        screens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            if (!input.value || isNaN(+input.value) || select.selectedIndex === 0) {
                isValid = false;
            }
        });

        return isValid;
    },

    reset: function () {
        this.resetScreens();
        this.resetServices();
        this.resetRange();
        this.resetData();

        this.title = '';
        this.screens = [];
        this.adaptive = true;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.screenPrice = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.count = 0;
        this.rollback = 0;
    },

    resetScreens: function () {
        screens.forEach((screen, index) => {
            if (index > 0) {
                screen.remove();
            } else {
                const select = screen.querySelector('select');
                const input = screen.querySelector('input[type=text]');
                select.selectedIndex = 0;
                input.value = '';
            }
        });
    },

    resetServices: function () {
        otherItemPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });
        otherItemNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });
    },

    resetRange: function () {
        range.value = 0;
        rangeValue.innerHTML = '0%';
    },
    resetData: function () {
        const inputsAndSelects = document.querySelectorAll('input[type=text], select, .screen-btn,input[type=checkbox], input[type=range]');
        inputsAndSelects.forEach((input) => {
            if (!input.classList.contains('total-input')) {
                input.disabled = false;
            }
        });

        btnReset.style.display = 'none';
        btnStart.style.display = 'inline-block';

        total.value = '';
        totalCount.value = '';
        totalCountOther.value = '';
        totalFullCount.value = '';
        totalCountRollback.value = '';
    },

    start: function () {
        if (this.checkScreenInputs()) {
            this.addScreens();
            this.addServices();
            this.addPrices();
            this.showResult();

            const inputsAndSelects = document.querySelectorAll('input[type=text], select, .screen-btn,input[type=checkbox], input[type=range]');
            inputsAndSelects.forEach((input) => {
                if (!input.classList.contains('total-input')) {
                    input.disabled = true;
                }
            });

            btnStart.style.display = 'none';
            btnReset.style.display = 'inline-block';

        } else {
            alert('Fill the screen field')
        }
        this.logger();

    },

};

appData.init();


