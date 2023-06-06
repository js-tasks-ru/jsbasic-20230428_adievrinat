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

  get value() {
    return this.#value;
  }

  #initSlider() {
    const slider = this.#getTemplate(this.#steps, this.value);

    this.#sliderLogic(slider);

    return slider;
  }

  #sliderLogic(slider) {
    const thumb = slider.querySelector('.slider__thumb');
    const progressBar = slider.querySelector('.slider__progress');

    progressBar.style.width = '0';

    slider.addEventListener('click', (e) => {
      if (e.target.closest('.slider__thumb')) {
        return false;
      }

      const sliderCoords = slider.getBoundingClientRect();

      if (e.target.tagName === 'SPAN' && e.target.className !== 'slider__value') {
        const stepCoordinate = slider.querySelectorAll('.slider__steps span')[+e.target.dataset.step].getBoundingClientRect().left;

        this.#stepActivation(slider, thumb, progressBar, +e.target.dataset.step, stepCoordinate, sliderCoords);
        return false;
      }

      for (let i = 0; i < this.#steps; i++) {
        if (i > 0 && e.clientX < slider.querySelectorAll('.slider__steps span')[i].getBoundingClientRect().left) {
          const firstPoint = slider.querySelectorAll('.slider__steps span')[i - 1].getBoundingClientRect().left;
          const secondPoint = slider.querySelectorAll('.slider__steps span')[i].getBoundingClientRect().left;
          const condition = e.clientX < firstPoint + ((secondPoint - firstPoint) / 2);
          const point = condition ? firstPoint : secondPoint;

          this.#stepActivation(slider, thumb, progressBar, condition ? i - 1 : i, point, sliderCoords);
          break;
        }
      }
    });
  }

  #stepActivation(slider, thumb, progressBar, step, stepCoordinate, sliderCoords) {
    const coordinate = Math.round((stepCoordinate - sliderCoords.left) / (slider.clientWidth / 100)) + '%';
    this.#value = step;

    this.#changePosition(thumb, progressBar, slider, coordinate, step);

    slider.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  #changePosition(thumb, progressBar, slider, coordinate, activeIndex) {
    thumb.style.left = progressBar.style.width = coordinate;
    slider.querySelector('.slider__step-active').classList.remove('slider__step-active');
    slider.querySelectorAll('.slider__steps span')[activeIndex].classList.add('slider__step-active');
    slider.querySelector('.slider__value').textContent = activeIndex;
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
