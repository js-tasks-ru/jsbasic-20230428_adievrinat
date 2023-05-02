function ucFirst(str) {
  if ((!str && str !== '') || (typeof str !== 'string')) {
    return console.log('ucFirst: the "str" argument is incorrect or undefined');
  }

  return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
