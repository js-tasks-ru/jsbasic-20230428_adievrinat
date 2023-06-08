function createElement(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}

export default class StepSlider {
  #steps = 0;
  #value = 0;
  elem = null;

  constructor({ steps, value = 0 }) {
    if (typeof steps !== 'number') {
      return this.elem;
    }

    this.#steps = steps;
    this.#value = value;
    this.elem = this.#initSlider();
  }

  #initSlider() {
    const slider = this.#getTemplate(this.#steps, this.#value);
    this.#sliderLogic(slider);
    return slider;
  }

  #sliderLogic(slider) {
    const thumb = slider.querySelector('.slider__thumb');
    const progressBar = slider.querySelector('.slider__progress');

    progressBar.style.width = '0';

    slider.addEventListener('click', (e) => {
      if (e.target.closest('.slider__thumb') || e.target.className === 'slider__value') {
        return false;
      }

      const sliderCoords = slider.getBoundingClientRect();
      const activeStep = Math.round((e.clientX - sliderCoords.left) / (slider.clientWidth / (this.#steps - 1)));
      this.#value = activeStep;
      this.#changePosition(thumb, progressBar, slider, activeStep);

      slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.#value,
        bubbles: true
      }));
    });
  }

  #changePosition(thumb, progressBar, slider, activeStep) {
    thumb.style.left = progressBar.style.width = (100 / (this.#steps - 1)) * activeStep + '%';
    slider.querySelector('.slider__step-active').classList.remove('slider__step-active');
    slider.querySelectorAll('.slider__steps span')[activeStep].classList.add('slider__step-active');
    slider.querySelector('.slider__value').textContent = this.#value;
  }

  #getTemplate(steps, value) {
    const sliderTemplate = createElement(this.#geBasicTemplate());

    sliderTemplate.querySelector('.slider__value').textContent = value;

    for (let i = 0; i < steps; i++) {
      let span = i ? `<span data-step="${i}"></span>` : `<span class="slider__step-active" data-step="${i}"></span>`;
      sliderTemplate.querySelector('.slider__steps').insertAdjacentHTML('beforeend', span);
    }

    return sliderTemplate;
  }

  #geBasicTemplate() {
    return `<div class="slider">
        <div class="slider__thumb">
            <span class="slider__value">0</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
    </div>`;
  }
}
