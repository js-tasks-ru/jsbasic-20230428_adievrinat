import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modal = createElement(this.#geBasicTemplate());

  setTitle(title) {
    this.#modal.querySelector('.modal__title').textContent = title;
  }

  setBody(body) {
    this.#modal.querySelector('.modal__body').append(body);
  }

  open() {
    document.body.classList.add('is-modal-open');

    window.addEventListener('keydown', this.closeModalOnKeydown);
    this.#modal.querySelector('.modal__close').addEventListener('click', () => {
      this.close(this.closeModalOnKeydown);
    });

    document.body.append(this.#modal);
  }

  close(closeModal) {
    document.body.classList.remove('is-modal-open');
    this.#modal.remove();
    window.removeEventListener('keydown', closeModal);
  }

  closeModalOnKeydown = e => {
    if (e.code === 'Escape') {
      this.close(this.closeModalOnKeydown);
    }
  }

  #geBasicTemplate() {
    return `<div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
            <div class="modal__header">
                <button type="button" class="modal__close">
                    <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                </button>
                <h3 class="modal__title"></h3>
            </div>
            <div class="modal__body"></div>
        </div>
    </div>`;
  }
}
