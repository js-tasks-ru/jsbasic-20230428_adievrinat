function createElement(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}

export default class ProductCard {
  constructor(product) {
    const check = typeof product === 'object' && !Array.isArray(product) && product !== null;
    this.elem = check ? this.#createProductCart(product) : product;
  }

  #createProductCart(product) {
    const elem = createElement(this.#getTemplate(product));
    const button = this.#createBtn();

    button.addEventListener('click', function () {
      elem.dispatchEvent(new CustomEvent("product-add", {
        detail: product.id,
        bubbles: true
      }));
    });

    elem.querySelector('.card__body').appendChild(button);

    return elem;
  }

  #createBtn() {
    const button = document.createElement('BUTTON');

    button.setAttribute('type', 'button');
    button.classList.add('card__button');
    button.innerHTML = '<img src="/assets/images/icons/plus-icon.svg" alt="icon">';

    return button;
  }

  #getTemplate(data) {
    return `<div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${data.image}" class="card__image" alt="product">
        <span class="card__price">€${data.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${data.name}</div>
      </div>
    </div>`;
  }
}
