import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#getTemplate();
  }

  updateFilter(filter) {
    Object.assign(this.filters, filter);

    const filteredProducts = this.products.filter(product => this.#getConditionForFiltration(this.filters, product));

    while (this.elem.querySelector('.products-grid__inner').firstChild) {
      this.elem.querySelector('.products-grid__inner').removeChild(this.elem.querySelector('.products-grid__inner').firstChild);
    }

    filteredProducts.forEach(product => {
      const productCard = new ProductCard(product);

      this.elem.querySelector('.products-grid__inner').append(productCard.elem);
    });
  }

  #getConditionForFiltration(filters, product) {
    let nuts = filters.noNuts ? !product.nuts : true;
    let vegeterian = filters.vegeterianOnly ? product.vegeterian : true;
    let spiciness = filters.maxSpiciness >= 0 && filters.maxSpiciness <= 4 ? product.spiciness <= filters.maxSpiciness : true;
    let category = filters.category ? filters.category === product.category : true;

    return nuts && vegeterian && spiciness && category;
  }

  #getTemplate() {
    const base = createElement(this.#getBaseTemplate());

    this.products.forEach(product => {
      const productCard = new ProductCard(product);

      base.querySelector('.products-grid__inner').append(productCard.elem);
    });

    return base;
  }

  #getBaseTemplate() {
    return `<div class="products-grid"><div class="products-grid__inner"></div></div>`;
  }
}
