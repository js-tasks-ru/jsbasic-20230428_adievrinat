import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.#carouselInit();
  }

  #carouselInit() {
    const carousel = this.#getTemplate(this.slides);

    this.#sliderLogic(carousel);
    this.#addProductAddEvt(carousel);

    return carousel;
  }

  #sliderLogic(carousel) {
    const baseSelector = '.carousel';
    const container = carousel.querySelector(baseSelector + '__inner');
    const slides = carousel.querySelectorAll(baseSelector + '__slide');
    let transformXValue = 0;
    let activeSlideIndex = 0;

    const calculateTranslateX = value => {
      const slideWidth = slides[0].offsetWidth;
      transformXValue = value === 'next' ? transformXValue - slideWidth : transformXValue + slideWidth;
    };
    const swipe = () => container.style.transform = `translateX(${transformXValue}px)`;
    const movement = (condition, func, type) => {
      if (condition) {
        func();
        calculateTranslateX(type);
        swipe();
      }
    };
    const showOrHideBtn = (condition, arrowType, value) => {
      if (condition) {
        carousel.querySelector(baseSelector + arrowType).style.display = value;
      }
    };
    const buttonDisplayControl = (rightBtnOptions, leftBtnOptions) => {
      const [rightBtnCondition, rightBtnDisplayValue] = rightBtnOptions;
      const [leftBtnCondition, leftBtnDisplayValue] = leftBtnOptions;

      showOrHideBtn(rightBtnCondition, '__arrow_right', rightBtnDisplayValue);
      showOrHideBtn(leftBtnCondition, '__arrow_left', leftBtnDisplayValue);
    };
    const swipeToNextSlide = function () {
      movement(activeSlideIndex < slides.length - 1, () => ++activeSlideIndex, 'next');

      buttonDisplayControl(
        [activeSlideIndex === slides.length - 1, 'none'],
        [activeSlideIndex > 0, '']
      );
    };
    const swipeToPrevSlide = function () {
      movement(activeSlideIndex > 0, () => --activeSlideIndex, 'prev');

      buttonDisplayControl(
        [activeSlideIndex < slides.length - 1, ''],
        [activeSlideIndex === 0, 'none']
      );
    };

    container.style.transform = 'translateX(0)';
    carousel.querySelector(baseSelector + '__arrow_left').style.display = 'none';
    carousel.querySelector(baseSelector + '__arrow_right').addEventListener('click', swipeToNextSlide);
    carousel.querySelector(baseSelector + '__arrow_left').addEventListener('click', swipeToPrevSlide);
  }

  #addProductAddEvt(carousel) {
    carousel.querySelectorAll('.carousel__slide').forEach(slide => {
      slide.querySelector('.carousel__button').addEventListener('click', function () {
        slide.dispatchEvent(new CustomEvent("product-add", {
          detail: slide.dataset.id,
          bubbles: true
        }));
      });
    });
  }

  #getTemplate(slides) {
    const carousel = createElement(this.#getBasicTemplate());

    slides.forEach(slideData => {
      const slide = createElement(this.#getSlide(slideData));

      carousel.querySelector('.carousel__inner').append(slide);
    });

    return carousel;
  }

  #getBasicTemplate() {
    return `<div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
    </div>`;
  }

  #getSlide(data) {
    return `<div class="carousel__slide" data-id="${data.id}">
      <img src="/assets/images/carousel/${data.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${data.price.toFixed(2)}</span>
        <div class="carousel__title">${data.name}</div>
        <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
  }
}
