import paymentSystem from './payment-system';
import valid from './valid';

export default class Widget {
  constructor(systemIMG, inputCardNumber, button) {
    this.images = systemIMG;
    this.input = inputCardNumber;
    this.button = button;
    this.timerId = null;
  }

  initEvent() {
    this.input.addEventListener('input', (e) => this.inputEvent(e));
    this.button.addEventListener('click', (e) => this.buttonOnClickEvent(e));
  }

  buttonOnClickEvent() {
    const v = valid(this.input.value);

    if (v) {
      if (this.input.classList.contains('invalid')) {
        this.input.classList.remove('invalid');
      }
      this.input.classList.add('valid');
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => this.input.classList.remove('valid'), 1500);
    }

    if (!v) {
      if (this.input.classList.contains('valid')) {
        this.input.classList.remove('valid');
      }
      this.input.classList.add('invalid');
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => this.input.classList.remove('invalid'), 1500);
    }
  }

  inputEvent(event) {
    const pSystem = paymentSystem(event.target.value);
    for (let index = 0; index < this.images.length; index += 1) {
      const element = this.images[index];
      if (!element.classList.contains('blackout')) {
        element.classList.add('blackout');
      }
      if (pSystem === 'Visa' && index === 0) {
        element.classList.remove('blackout');
      } else if (pSystem === 'MasterCard' && index === 1) {
        element.classList.remove('blackout');
      } else if (pSystem === 'Mir' && index === 2) {
        element.classList.remove('blackout');
      }
    }
  }
}
