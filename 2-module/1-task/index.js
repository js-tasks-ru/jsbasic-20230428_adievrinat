function sumSalary(salaries) {
  if (typeof salaries !== 'object' || salaries === null || Array.isArray(salaries)) {
    return 0;
  }

  let sum = 0;

  for (let option in salaries) {
    if (typeof salaries[option] === 'number' && isFinite(salaries[option])) {
      sum += salaries[option];
    }
  }

  return sum;
}
