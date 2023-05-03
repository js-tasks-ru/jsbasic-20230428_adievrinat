function factorial(n) {
  if (typeof n !== 'number' || !Number.isInteger(n) || Math.sign(n) === -1) {
    return NaN;
  }

  let result = 1;

  for (let num = n; num >= 2; num--) {
    result *= num;
  }

  return result;
}
