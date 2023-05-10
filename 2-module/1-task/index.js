function sumSalary(salaries) {
  if (!salaries || Array.isArray(salaries)) {
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
