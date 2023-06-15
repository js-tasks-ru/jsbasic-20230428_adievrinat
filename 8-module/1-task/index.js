import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  #initialTop = 0;

  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.#initialTop = this.elem.getBoundingClientRect().top + window.scrollY;
      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
      this.elem.removeAttribute('style');
      this.#initialTop = 0;
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth === 0 && this.elem.offsetWidth === 0) {
      return false;
    }

    this.elem.style.cssText = window.scrollY > this.#initialTop ? `position: fixed; top: 50px; left: ${this.getLeftPosition()}px; z-index: 1000;` : '';
  }

  getLeftPosition() {
    if ((document.documentElement.clientWidth) - (document.querySelector('.container').getBoundingClientRect().right + 20) < (this.elem.offsetWidth + 10)) {
      return document.documentElement.clientWidth - (this.elem.offsetWidth + 10);
    }
    return document.querySelector('.container').getBoundingClientRect().right + 20;
  }
}
