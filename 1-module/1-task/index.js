function factorial(n) {
  if (Number(n) !== n && n % 1 !== 0 || Math.sign(n) === -1) {
    console.error('factorial: the argument "n" is incorrect');
    return NaN;
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;

  for (let num = 1; num <= n; num++) {
    result *= num;
  }

  return result;
}
