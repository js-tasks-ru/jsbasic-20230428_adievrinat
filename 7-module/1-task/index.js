import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#menuInit();
  }

  #menuInit() {
    const menu = this.#getTemplate(this.categories);

    this.#sliderLogic(menu);
    this.#activationMenuItem(menu);

    return menu;
  }

  #sliderLogic(menu) {
    const ribbonInner = menu.querySelector('.ribbon__inner');
    const arrowRight = menu.querySelector('.ribbon__arrow_right');
    const arrowLeft = menu.querySelector('.ribbon__arrow_left');
    const check = (isAddClass, scroll, arrow) => {
      return isAddClass ? scroll > 1 && !arrow.classList.contains('ribbon__arrow_visible') : scroll < 2 && arrow.classList.contains('ribbon__arrow_visible');
    };
    let scrollWidth = 0;
    let scrollLeft = 0;
    let clientWidth = 0;
    let scrollRight = 0;

    arrowLeft.addEventListener('click', () => ribbonInner.scrollBy(-350, 0));
    arrowRight.addEventListener('click', () => ribbonInner.scrollBy(350, 0));

    ribbonInner.addEventListener('scroll', function() {
      scrollWidth = ribbonInner.scrollWidth;
      scrollLeft = ribbonInner.scrollLeft;
      clientWidth = ribbonInner.clientWidth;
      scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (check(true, scrollRight, arrowRight) || check(false, scrollRight, arrowRight)) {
        arrowRight.classList.toggle('ribbon__arrow_visible', check(true, scrollRight, arrowRight));
      }

      if (check(true, ribbonInner.scrollLeft, arrowLeft) || check(false, ribbonInner.scrollLeft, arrowLeft)) {
        arrowLeft.classList.toggle('ribbon__arrow_visible', check(true, ribbonInner.scrollLeft, arrowLeft));
      }
    });
  }

  #activationMenuItem(menu) {
    const ribbonInner = menu.querySelector('.ribbon__inner');

    ribbonInner.addEventListener('click', function (e) {
      if (e.target.closest('.ribbon__item')) {
        e.preventDefault();

        if (ribbonInner.querySelectorAll('.ribbon__item_active').length) {
          ribbonInner.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        }

        e.target.closest('.ribbon__item').classList.add('ribbon__item_active');

        menu.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: e.target.closest('.ribbon__item').dataset.id,
          bubbles: true
        }));
      }
    });
  }

  #getTemplate(categories) {
    const basicTemplate = createElement(this.#getBasicTemplate());

    categories.forEach(category => {
      basicTemplate.querySelector('.ribbon__inner').append(createElement(this.#getLinkTemplate(category)));
    });

    return basicTemplate;
  }

  #getLinkTemplate(data) {
    return `<a href="#" class="ribbon__item" data-id="${data.id}">${data.name}</a>`;
  }

  #getBasicTemplate() {
    return `<div class="ribbon"><button class="ribbon__arrow ribbon__arrow_left">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button></div>`;
  }
}
