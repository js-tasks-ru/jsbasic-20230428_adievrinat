import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    return new Promise(async (reslove, reject) => {
      const carousel = new Carousel(slides);
      const ribbonMenu = new RibbonMenu(categories);
      const stepSlider = new StepSlider({steps: 5, value: 3});
      const cartIcon = new CartIcon();
      const cart = new Cart(cartIcon);

      document.querySelector('[data-carousel-holder]').append(carousel.elem);
      document.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem);
      document.querySelector('[data-slider-holder]').append(stepSlider.elem);
      document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

      const response = await fetch('products.json');

      if (response.ok) {
        const result = await response.json();
        const productsGrid = new ProductsGrid(result);
        document.querySelector('[data-products-grid-holder]').innerHTML = '';
        document.querySelector('[data-products-grid-holder]').append(productsGrid.elem);

        productsGrid.updateFilter({
          noNuts: document.getElementById('nuts-checkbox').checked,
          vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
          maxSpiciness: stepSlider.value,
          category: ribbonMenu.value
        });

        document.body.addEventListener('product-add', e => {
          cart.addProduct(productsGrid.products.filter(product => product.id === e.detail)[0]);
        });

        stepSlider.elem.addEventListener('slider-change', e => {
          productsGrid.updateFilter({
            maxSpiciness: e.detail
          });
        });

        ribbonMenu.elem.addEventListener('ribbon-select', e => {
          productsGrid.updateFilter({
            category: e.detail
          });
        });

        document.getElementById('nuts-checkbox').addEventListener('change', e => {
          productsGrid.updateFilter({
            noNuts: e.currentTarget.checked
          });
        });

        document.getElementById('vegeterian-checkbox').addEventListener('change', e => {
          productsGrid.updateFilter({
            vegeterianOnly: e.currentTarget.checked
          });
        });

        reslove(true);
      } else {
        reject(false);
      }
    });
  }
}
