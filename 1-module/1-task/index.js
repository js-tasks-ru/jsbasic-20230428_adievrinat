function factorial(n) {
  if (!n || Number(n) !== n && n % 1 !== 0 || Math.sign(n) === -1) {
    console.error('factorial: the "n" argument is incorrect');
    return NaN;
  }

  let result = 1;

  for (let num = 1; num <= n; num++) {
    result *= num;
  }

  return result;
}
