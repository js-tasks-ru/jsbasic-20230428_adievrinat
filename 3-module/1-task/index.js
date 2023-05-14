function namify(users) {
  if (!Array.isArray(users)) {
    return users;
  }

  return users.map(user => user.name);
}
