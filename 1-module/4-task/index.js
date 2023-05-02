function checkSpam(str) {
  if (!str || (typeof str !== 'string')) {
    return console.error('checkSpam: the "str" argument is incorrect or undefined');
  }

  return str.toLowerCase().includes('xxx') || str.toLowerCase().includes('1xbet');
}
