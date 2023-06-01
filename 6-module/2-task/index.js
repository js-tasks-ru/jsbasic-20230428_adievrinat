import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    const check = typeof product === 'object' && !Array.isArray(product) && product !== null;
    this.elem = check ? this.#createProductCart(product) : product;
  }

  #createProductCart(product) {
    const elem = createElement(this.#getTemplate(product));

    elem.querySelector('.card__button').addEventListener('click', function () {
      elem.dispatchEvent(new CustomEvent("product-add", {
        detail: product.id,
        bubbles: true
      }));
    });

    return elem;
  }

  #getTemplate(data) {
    return `<div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${data.image}" class="card__image" alt="product">
        <span class="card__price">€${data.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${data.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
  }
}
