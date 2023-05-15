function getMinMax(str) {
  if (typeof str !== 'string') {
    return str;
  }

  const arrayFromString = str.split(' ');
  const numbers = arrayFromString.filter(numberForFilter => isFinite(Number(numberForFilter))).map(item => Number(item));

  return numbers.reduce((prev, number) => {
    let firstArg = name => typeof prev === 'number' ? prev : prev[name];

    return {
      min: Math.min(firstArg('min'), number),
      max: Math.max(firstArg('max'), number)
    };
  });
}
