function namify(users) {
  if (!users || !Array.isArray(users)) {
    return users;
  }

  const names = [];

  for (let user of users) {
    if (user.hasOwnProperty('name')) {
      names.push(user.name);
    }
  }

  return names;
}
