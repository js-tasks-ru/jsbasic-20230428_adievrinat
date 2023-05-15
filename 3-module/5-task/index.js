function getMinMax(str) {
  if (typeof str !== 'string') {
    return str;
  }

  const arrayFromString = str.split(' ');
  const numbers = arrayFromString.filter(numberForFilter => isFinite(Number(numberForFilter))).map(item => Number(item));

  return numbers.reduce((prev, number) => {
    return {
      min: Math.min(prev.min, number),
      max: Math.max(prev.max, number)
    };
  }, {min: numbers[0], max: numbers[0]});
}
