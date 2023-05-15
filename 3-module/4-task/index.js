function showSalary(users, age) {
  if (!Array.isArray(users)) {
    return users;
  }

  return users.filter(user => user.age <= age).map(item => `${item.name}, ${item.balance}`).join('\n');
}
