import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal = null;
  modalBody = null;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product || typeof product !== 'object' || !product.hasOwnProperty('id')) {
      return false;
    }

    if (this.cartItems.find(item => item.product.id === product.id)) {
      this.updateProductCount(product.id, 1);
    } else {
      this.cartItem = {
        product: Object.assign({}, product),
        count: 1
      };

      this.cartItems.push(this.cartItem);
    }

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex(item => item.product.id === productId);
    this.cartItem = this.cartItems[index];

    this.cartItem.count = amount === 1 ? ++this.cartItem.count : --this.cartItem.count;

    if (!this.cartItems[index].count) {
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    if (!this.cartItems.length) {
      return this.cartItems.length;
    }

    return this.cartItems.reduce((accumulator, item, index) => {
      return index === 0 ? item.count : accumulator + item.count;
    }, this.cartItems[0].count);
  }

  getTotalPrice() {
    if (!this.cartItems.length) {
      return this.cartItems.length;
    }

    return this.cartItems.reduce((accumulator, item, index) => {
      return index === 0 ? item.product.price * item.count : accumulator + (item.product.price * item.count);
    }, this.cartItems[0]);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modalBody = document.createElement('DIV');
    const form = this.renderOrderForm();

    this.cartItems.forEach(item => {
      const product = this.renderProduct(item.product, item.count);

      product.querySelector('.cart-counter__button_minus').addEventListener('click', () => {
        this.updateProductCount(item.product.id, -1);

        if (!this.cartItems.length) {
          this.modal.close();
        }
      });

      product.querySelector('.cart-counter__button_plus').addEventListener('click', () => this.updateProductCount(item.product.id, 1));
      this.modalBody.append(product);
    });

    form.addEventListener('submit', e => this.onSubmit(e));
    this.modalBody.append(form);
    this.modal.setTitle('Your order');
    this.modal.setBody(this.modalBody);
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      const productId = cartItem.product.id;

      if (cartItem.count > 0) {
        const productCount = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        const productPrice = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = '€' + (cartItem.product.price * cartItem.count).toFixed(2);
      } if (cartItem.count === 0) {
        this.modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
      }

      const infoPrice = this.modalBody.querySelector('.cart-buttons__info-price');

      infoPrice.innerHTML = '€' + (this.getTotalPrice()).toFixed(2);
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    if (!event.target.querySelector('.cart-buttons__button[type="submit"]').classList.contains('is-loading')) {
      event.target.querySelector('.cart-buttons__button[type="submit"]').classList.add('is-loading');
    }

    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(event.target)
    });

    if (response.ok) {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.modalBody.remove();
      this.modalBody = createElement(`<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`);
      this.modal.setBody(this.modalBody);
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

