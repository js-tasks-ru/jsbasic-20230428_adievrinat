function ucFirst(str) {
  return typeof str === 'string' && str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
