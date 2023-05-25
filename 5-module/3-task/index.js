function initCarousel() {
  const CSS = '.carousel';

  const carousel = document.querySelector(CSS);
  const container = carousel.querySelector(CSS + '__inner');
  const slides = carousel.querySelectorAll(CSS + '__slide');
  let transformXValue = 0;
  let activeSlideIndex = 0;

  const calculateTranslateX = value => {
    const slideLength = slides[0].offsetWidth;
    transformXValue = value === 'next' ? transformXValue - slideLength : transformXValue + slideLength;
  };
  const swipe = () => container.style.transform = `translateX(${transformXValue}px)`;
  const movement = (condition, func, type) => {
    if (condition) {
      func();
      calculateTranslateX(type);
      swipe();
    }
  };

  const showOrHideBtn = (btn, displayValue) => {
    btn.style.display = displayValue;
  };

  const buttonDisplayControl = (rightBtnOptions, leftBtnOptions) => {
    const [rightBtnCondition, rightBtnValue] = rightBtnOptions;
    const [leftBtnCondition, leftBtnValue] = leftBtnOptions;

    if (rightBtnCondition) {
      showOrHideBtn(carousel.querySelector(CSS + '__arrow_right'), rightBtnValue);
    }

    if (leftBtnCondition) {
      showOrHideBtn(carousel.querySelector(CSS + '__arrow_left'), leftBtnValue);
    }
  };

  const arrowRightClick = function () {
    movement(activeSlideIndex < slides.length - 1, () => ++activeSlideIndex, 'next');

    buttonDisplayControl(
      [activeSlideIndex === slides.length - 1, 'none'],
      [activeSlideIndex > 0, '']
    );
  };

  const arrowLeftClick = function () {
    movement(activeSlideIndex > 0, () => --activeSlideIndex, 'prev');

    buttonDisplayControl(
      [activeSlideIndex < slides.length - 1, ''],
      [activeSlideIndex === 0, 'none']
    );
  };

  container.style.transform = 'translateX(0)';
  carousel.querySelector(CSS + '__arrow_left').style.display = 'none';
  carousel.querySelector(CSS + '__arrow_right').addEventListener('click', arrowRightClick);
  carousel.querySelector(CSS + '__arrow_left').addEventListener('click', arrowLeftClick);
}
