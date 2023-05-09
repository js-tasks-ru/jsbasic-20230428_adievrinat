let calculator = {
  a: 0,
  b: 0,
  read(a, b) {
    this.a = typeof a === 'number' && isFinite(a) ? a : 0;
    this.b = typeof b === 'number' && isFinite(a) ? b : 0;
  },
  sum() {
    return this.a + this.b;
  },
  mul() {
    return this.a * this.b;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
