function camelize(str) {
  if (typeof str !== 'string' || !str || !str.includes('-')) {
    return str;
  }

  const filtering = (item, index, array) => {
    if (!item.localeCompare('-') && array[index + 1] && array[index + 1].localeCompare('-') !== 0) {
      array[index + 1] = array[index + 1].toUpperCase();
    }

    if (item.localeCompare('-') !== 0) {
      return item;
    }
  };

  return str.split('')
            .filter((item, index, array) => filtering(item, index, array))
            .join('');
}
