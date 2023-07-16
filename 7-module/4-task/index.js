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

    thumb.style.left = progressBar.style.width = (100 / (this.#steps - 1)) * this.#value + '%';

    this.#events(slider, thumb, progressBar);
  }

  #changeStepOnClick(e, thumb, progressBar, slider) {
    const sliderCoords = slider.getBoundingClientRect();
    const activeStep = Math.round((e.clientX - sliderCoords.left) / (slider.clientWidth / (this.#steps - 1)));
    this.#value = activeStep;
    this.#stepChangeRendering(thumb, progressBar, slider, activeStep);
    this.#activationStepInDOM(slider, activeStep);

    slider.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.#value,
      bubbles: true
    }));
  }

  #stepChangeRendering(thumb, progressBar, slider, activeStep) {
    thumb.style.left = progressBar.style.width = (100 / (this.#steps - 1)) * activeStep + '%';
    slider.querySelector('.slider__value').textContent = activeStep;
  }

  #activationStepInDOM(slider, activeStep) {
    slider.querySelector('.slider__step-active').classList.remove('slider__step-active');
    slider.querySelectorAll('.slider__steps span')[activeStep].classList.add('slider__step-active');
  }

  #dragNDrop(e, slider, thumb, progressBar) {
    slider.classList.add('slider_dragging');

    const mouseMove = event => {
      event.preventDefault();

      const sliderCoords = slider.getBoundingClientRect();
      const distance = ((event.clientX - sliderCoords.left) / (slider.offsetWidth / 100));

      switch (true) {
      case distance >= 0 && distance <= 100:
        this.#thumbMovement(thumb, progressBar, slider, distance, Math.round((event.clientX - sliderCoords.left) / (slider.clientWidth / (this.#steps - 1))));
        break;
      case distance < 0:
        this.#thumbMovement(thumb, progressBar, slider, 0, 0);
        break;
      case distance > 100:
        this.#thumbMovement(thumb, progressBar, slider, 100, this.#steps - 1);
      }
    };

    document.addEventListener('pointermove', mouseMove);

    const pointerUp = () => {
      thumb.style.left = progressBar.style.width = (100 / (this.#steps - 1)) * this.#value + '%';
      slider.classList.remove('slider_dragging');

      slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.#value,
        bubbles: true
      }));

      document.removeEventListener('pointermove', mouseMove);
      document.removeEventListener('pointerup', pointerUp);
    };

    document.addEventListener('pointerup', pointerUp);
  }

  #thumbMovement(thumb, progressBar, slider, distance, value) {
    thumb.style.left = progressBar.style.width = distance + '%';
    this.#value = value;
    this.#activationStepInDOM(slider, this.#value);
    slider.querySelector('.slider__value').textContent = value;
  }

  #events(slider, thumb, progressBar) {
    slider.addEventListener('click', e => this.#changeStepOnClick(e, thumb, progressBar, slider));

    thumb.onpointerdown = e => {
      e.preventDefault();

      this.#dragNDrop(e, slider, thumb, progressBar);
    };

    thumb.ondragstart = () => false;
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
