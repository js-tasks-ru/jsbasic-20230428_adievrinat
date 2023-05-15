function getMinMax(str) {
  if (typeof str !== 'string') {
    return str;
  }

  const arrayFromString = str.split(' ');
  const numbers = arrayFromString.filter(numberForFilter => isFinite(Number(numberForFilter))).map(item => Number(item));

  return numbers.reduce((prev, number) => {
    let firstArg = name => prev[name];

    return {
      min: Math.min(firstArg('min'), number),
      max: Math.max(firstArg('max'), number)
    };
  }, {min: numbers[0], max: numbers[0]});
}
