function showSalary(users, age) {
  if (!Array.isArray(users)) {
    return users;
  }

  return users.reduce((prev, item) => {
    let prevData = (typeof prev !== 'string') && (prev.age <= age) ? `${prev.name}, ${prev.balance}` : prev;

    return item.age <= age ? `${prevData}\n${item.name}, ${item.balance}` : prevData;
  });
}
