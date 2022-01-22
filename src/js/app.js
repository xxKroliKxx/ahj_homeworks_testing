import Widget from './widget';

const systemIMG = document.getElementsByClassName('payment_system');
const inputCardNumber = document.getElementsByClassName('card_number_input')[0];
const button = document.getElementsByClassName('card_button')[0];

const widget = new Widget(systemIMG, inputCardNumber, button);
widget.initEvent();
