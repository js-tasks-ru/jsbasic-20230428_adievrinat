function hideSelf() {
  if (document.querySelector('.hide-self-button')) {
    document.querySelector('.hide-self-button').onclick = function () {
      this.hidden = true;
    };
  }
}
