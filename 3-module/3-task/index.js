function camelize(str) {
  if (typeof str !== 'string' || !str || !str.includes('-')) {
    return str;
  }

  const array = str.split('');

  array.forEach((item, index) => {
    if (item === '-' && array[index + 1] !== '-') {
      array[index + 1] = array[index + 1].toUpperCase();
    }
  });

  return array.filter(item => item !== '-').join('');
}
