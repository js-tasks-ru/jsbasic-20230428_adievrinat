function namify(users) {
  if (!Array.isArray(users)) {
    return users;
  }

  return users.reduce((prev, user) => user.hasOwnProperty('name') ? [...prev, user.name] : prev, []);
}
