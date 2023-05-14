function namify(users) {
  if (!Array.isArray(users)) {
    return users;
  }

  return users.reduce((prev, user) => [...prev, user.name], []);
}
