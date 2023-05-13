function namify(users) {
  if (!users || !Array.isArray(users)) {
    return users;
  }

  return Array.from(users, item => {
    if (item.hasOwnProperty('name')) {
      return item.name;
    }
  }).filter(arrayItem => arrayItem !== undefined);
}
